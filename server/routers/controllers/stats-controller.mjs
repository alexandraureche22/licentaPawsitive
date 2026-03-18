import models from '../../models/index.mjs'
import { fn, col } from 'sequelize'

const getPublicStats = async (req, res, next) => {
  try {
    const totalAnimale = await models.Animal.count()
    const totalAdoptii = await models.AdoptionRequest.count({ where: { status: 'approved' } })
    const totalCereri = await models.AdoptionRequest.count()

    const donatiiResult = await models.Donation.findAll({
      attributes: [
        [fn('SUM', col('amount')), 'totalSum'],
        [fn('COUNT', col('id')), 'totalCount']
      ],
      raw: true
    })
    const totalDonații = donatiiResult[0]?.totalSum || 0
    const nrDonații = donatiiResult[0]?.totalCount || 0

    const topDonatori = await models.Donation.findAll({
      attributes: ['donorName', 'amount', 'message', 'createdAt'],
      order: [['amount', 'DESC']],
      limit: 10
    })

    const donatiiPeTip = await models.Donation.findAll({
      attributes: [
        'donationType',
        [fn('SUM', col('amount')), 'total'],
        [fn('COUNT', col('id')), 'count']
      ],
      group: ['donationType'],
      raw: true
    })

    const animalePeSpecie = await models.Animal.findAll({
      attributes: [
        'species',
        [fn('COUNT', col('id')), 'count']
      ],
      group: ['species'],
      raw: true
    })

    const animalePeOras = await models.Animal.findAll({
      attributes: [
        'city',
        [fn('COUNT', col('id')), 'count']
      ],
      group: ['city'],
      raw: true
    })

    res.status(200).json({
      totalAnimale,
      totalAdoptii,
      totalCereri,
      totalDonații,
      nrDonații,
      topDonatori,
      donatiiPeTip,
      animalePeSpecie,
      animalePeOras
    })
  } catch (err) {
    next(err)
  }
}

export default { getPublicStats }