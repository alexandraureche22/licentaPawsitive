import models from '../../models/index.mjs'

const createDonation = async (req, res, next) => {
  try {
    const donation = await models.Donation.create({
      ...req.body,
      userId: req.user ? req.user.id : null
    })
    res.status(201).json(donation)
  } catch (err) {
    next(err)
  }
}

const getAllDonations = async (req, res, next) => {
  try {
    const data = await models.Donation.findAll({
      include: [{ model: models.User, attributes: ['id', 'email', 'fullName'] }],
      order: [['createdAt', 'DESC']]
    })
    res.status(200).json(data)
  } catch (err) {
    next(err)
  }
}

const getMyDonations = async (req, res, next) => {
  try {
    const data = await models.Donation.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    })
    res.status(200).json(data)
  } catch (err) {
    next(err)
  }
}

export default {
  createDonation,
  getAllDonations,
  getMyDonations
}