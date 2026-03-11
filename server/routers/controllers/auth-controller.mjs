import bcrypt from 'bcrypt'
import models from '../../models/index.mjs'
import jwt from 'jsonwebtoken'

const login = async (req, res, next) => {
  try {
    const user = await models.User.findOne({
      where: { email: req.body.email }
    })
    if (user) {
      const isPasswordValid = await bcrypt.compare(req.body.password, user.passwordHash)
      if (isPasswordValid) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
        user.token = token
        await user.save()
        res.status(200).json({
          token,
          email: user.email,
          id: user.id,
          type: user.type,
          fullName: user.fullName
        })
      } else {
        res.status(401).json({ message: 'Email sau parolă invalidă' })
      }
    } else {
      res.status(401).json({ message: 'Email sau parolă invalidă' })
    }
  } catch (err) {
    next(err)
  }
}

const register = async (req, res, next) => {
  try {
    const existing = await models.User.findOne({
      where: { email: req.body.email }
    })
    if (existing) {
      return res.status(400).json({ message: 'Email-ul este deja înregistrat' })
    }
    const user = await models.User.create({
      email: req.body.email,
      passwordHash: await bcrypt.hash(req.body.password, 10),
      fullName: req.body.fullName,
      type: 'regular'
    })
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
    user.token = token
    await user.save()
    res.status(201).json({
      token,
      email: user.email,
      id: user.id,
      type: user.type,
      fullName: user.fullName
    })
  } catch (err) {
    next(err)
  }
}

const logout = async (req, res, next) => {
  try {
    const user = await models.User.findOne({
      where: { token: req.body.token }
    })
    if (user) {
      user.token = null
      await user.save()
      res.status(200).json({ message: 'Deconectat cu succes' })
    } else {
      res.status(401).json({ message: 'Token invalid' })
    }
  } catch (err) {
    next(err)
  }
}

export default { login, register, logout }
