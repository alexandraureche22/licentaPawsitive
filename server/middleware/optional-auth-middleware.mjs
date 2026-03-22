import models from '../models/index.mjs'

export default async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const user = await models.User.findOne({
        where: { token: req.headers.authorization }
      })
      if (user) {
        req.user = user
      }
    }
    next()
  } catch (err) {
    next(err)
  }
}