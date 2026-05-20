import bcrypt from 'bcrypt'
import models from '../../models/index.mjs'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

const sendWelcomeEmail = async (email, fullName) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return

    const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  logger: true,
  debug: true
})

    await transporter.sendMail({
      from: `"AdoptăCuDrag" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Bun venit pe AdoptăCuDrag! 🐾',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #c2185b;">🐾 AdoptăCuDrag</h1>
          </div>
          <h2>Bun venit, ${fullName}!</h2>
          <p>Contul tău a fost creat cu succes. Acum poți:</p>
          <ul>
            <li>🐶 Adopta animale care au nevoie de un cămin</li>
            <li>❤️ Adăuga animale la favorite</li>
            <li>💬 Contacta echipa noastră prin chat</li>
            <li>🎯 Completa quiz-ul de compatibilitate</li>
          </ul>
          <div style="text-align: center; margin: 30px 0;">
            <a href="http://localhost:5173" style="background: #c2185b; color: white; padding: 12px 30px; border-radius: 50px; text-decoration: none; font-weight: bold;">
              Accesează platforma
            </a>
          </div>
          <p style="color: #888; font-size: 0.875rem;">Dacă nu ai creat tu acest cont, ignoră acest email.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #aaa; font-size: 0.75rem; text-align: center;">© 2026 AdoptăCuDrag · contact@adoptacudrag.ro</p>
        </div>
      `
    })
  } catch (err) {
    console.warn('Email nu a putut fi trimis:', err.message)
  }
}

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

    // Trimite email de bun venit
    await sendWelcomeEmail(user.email, user.fullName)

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