import models from '../../models/index.mjs'

const createAdoptionRequest = async (req, res, next) => {
  try {
    const animal = await models.Animal.findByPk(req.body.animalId)
    if (!animal) {
      return res.status(404).json({ message: 'Animalul nu a fost găsit' })
    }
    const request = await models.AdoptionRequest.create({
      ...req.body,
      userId: req.user.id,
      animalId: req.body.animalId
    })
    res.status(201).json(request)
  } catch (err) {
    next(err)
  }
}

const getMyAdoptionRequests = async (req, res, next) => {
  try {
    const data = await models.AdoptionRequest.findAll({
      where: { userId: req.user.id },
      include: [{ model: models.Animal }]
    })
    res.status(200).json(data)
  } catch (err) {
    next(err)
  }
}

const getAllAdoptionRequests = async (req, res, next) => {
  try {
    const data = await models.AdoptionRequest.findAll({
      include: [
        { model: models.Animal },
        { model: models.User, attributes: ['id', 'email', 'fullName'] }
      ]
    })
    res.status(200).json(data)
  } catch (err) {
    next(err)
  }
}

const updateAdoptionRequestStatus = async (req, res, next) => {
  try {
    const request = await models.AdoptionRequest.findByPk(req.params.id)
    if (!request) {
      return res.status(404).json({ message: 'Cererea nu a fost găsită' })
    }

    await request.update({ status: req.body.status })

    if (req.body.status === 'approved') {
      const animal = await models.Animal.findByPk(request.animalId)
      if (animal) {
        await animal.update({ adopted: true })
      }
    }

    res.status(200).json(request)
  } catch (err) {
    next(err)
  }
}

const cancelAdoptionRequest = async (req, res, next) => {
  try {
    const request = await models.AdoptionRequest.findByPk(req.params.id)
    if (!request) {
      return res.status(404).json({ message: 'Cererea nu a fost găsită' })
    }
    if (request.userId !== req.user.id) {
      return res.status(403).json({ message: 'Nu ai dreptul să anulezi această cerere' })
    }
    if (request.status !== 'pending') {
      return res.status(400).json({ message: 'Doar cererile în așteptare pot fi anulate' })
    }
    await request.destroy()
    res.status(200).json({ message: 'Cererea a fost anulată' })
  } catch (err) {
    next(err)
  }
}

export default {
  createAdoptionRequest,
  getMyAdoptionRequests,
  getAllAdoptionRequests,
  updateAdoptionRequestStatus,
  cancelAdoptionRequest
}