import models from '../../models/index.mjs'

const getAllNews = async (req, res, next) => {
  try {
    const data = await models.News.findAll({
      include: [{ model: models.User, attributes: ['id', 'fullName'] }],
      order: [['date', 'DESC']]
    })
    res.status(200).json(data)
  } catch (err) {
    next(err)
  }
}

const createNews = async (req, res, next) => {
  try {
    const news = await models.News.create({
      ...req.body,
      userId: req.user.id
    })
    res.status(201).json(news)
  } catch (err) {
    next(err)
  }
}

const updateNews = async (req, res, next) => {
  try {
    const news = await models.News.findByPk(req.params.id)
    if (news) {
      await news.update(req.body)
      res.status(200).json(news)
    } else {
      res.status(404).json({ message: 'Articolul nu a fost găsit' })
    }
  } catch (err) {
    next(err)
  }
}

const deleteNews = async (req, res, next) => {
  try {
    const news = await models.News.findByPk(req.params.id)
    if (news) {
      await news.destroy()
      res.status(204).end()
    } else {
      res.status(404).json({ message: 'Articolul nu a fost găsit' })
    }
  } catch (err) {
    next(err)
  }
}

export default {
  getAllNews,
  createNews,
  updateNews,
  deleteNews
}