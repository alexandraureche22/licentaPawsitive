import models from '../../models/index.mjs'
import { Op } from 'sequelize'

const getAllAnimals = async (req, res, next) => {
  try {
    const query = {}
    const filterQuery = {}

    // filtrare dupa species
    if (req.query.species && req.query.species !== 'Toate') {
      query.where = { ...query.where, species: req.query.species }
      filterQuery.where = { ...filterQuery.where, species: req.query.species }
    }

    // search dupa name, breed sau city
    if (req.query.search) {
      const searchCondition = {
        [Op.or]: [
          { name: { [Op.like]: `%${req.query.search}%` } },
          { breed: { [Op.like]: `%${req.query.search}%` } },
          { city: { [Op.like]: `%${req.query.search}%` } }
        ]
      }
      query.where = { ...query.where, ...searchCondition }
      filterQuery.where = { ...filterQuery.where, ...searchCondition }
    }

    // paginare
    if (req.query.pageSize && req.query.pageNumber) {
      query.limit = parseInt(req.query.pageSize)
      query.offset = parseInt(req.query.pageSize) * parseInt(req.query.pageNumber)
    }

    // sortare
    if (req.query.sortField && req.query.sortOrder) {
      query.order = [[req.query.sortField, req.query.sortOrder]]
    }

    const count = await models.Animal.count(filterQuery)
    const data = await models.Animal.findAll({
      ...query,
      include: [{ model: models.HealthRecord }]
    })

    res.status(200).json({ data, count })
  } catch (err) {
    next(err)
  }
}

const getOneAnimal = async (req, res, next) => {
  try {
    const animal = await models.Animal.findByPk(req.params.id, {
      include: [{ model: models.HealthRecord }]
    })
    if (animal) {
      res.status(200).json(animal)
    } else {
      res.status(404).json({ message: 'Animalul nu a fost găsit' })
    }
  } catch (err) {
    next(err)
  }
}

const createAnimal = async (req, res, next) => {
  try {
    const animal = await models.Animal.create(req.body)
    res.status(201).json(animal)
  } catch (err) {
    next(err)
  }
}

const updateAnimal = async (req, res, next) => {
  try {
    const animal = await models.Animal.findByPk(req.params.id)
    if (animal) {
      await animal.update(req.body)
      res.status(200).json(animal)
    } else {
      res.status(404).json({ message: 'Animalul nu a fost găsit' })
    }
  } catch (err) {
    next(err)
  }
}

const deleteAnimal = async (req, res, next) => {
  try {
    const animal = await models.Animal.findByPk(req.params.id)
    if (animal) {
      await animal.destroy()
      res.status(204).end()
    } else {
      res.status(404).json({ message: 'Animalul nu a fost găsit' })
    }
  } catch (err) {
    next(err)
  }
}

// health records
const addHealthRecord = async (req, res, next) => {
  try {
    const animal = await models.Animal.findByPk(req.params.id)
    if (!animal) {
      return res.status(404).json({ message: 'Animalul nu a fost găsit' })
    }
    const record = await models.HealthRecord.create({
      ...req.body,
      animalId: req.params.id
    })
    res.status(201).json(record)
  } catch (err) {
    next(err)
  }
}

export default {
  getAllAnimals,
  getOneAnimal,
  createAnimal,
  updateAnimal,
  deleteAnimal,
  addHealthRecord
}
