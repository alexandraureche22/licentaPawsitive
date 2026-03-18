import models from '../../models/index.mjs'
import { Op } from 'sequelize'

const sendMessage = async (req, res, next) => {
  try {
    const message = await models.Message.create({
      text: req.body.text,
      fromUserId: req.user.id,
      toUserId: req.body.toUserId || null,
      isAdmin: req.user.type === 'admin'
    })
    res.status(201).json(message)
  } catch (err) {
    next(err)
  }
}

const getMyMessages = async (req, res, next) => {
  try {
    const messages = await models.Message.findAll({
      where: {
        [Op.or]: [
          { fromUserId: req.user.id },
          { toUserId: req.user.id }
        ]
      },
      order: [['createdAt', 'ASC']]
    })
    res.status(200).json(messages)
  } catch (err) {
    next(err)
  }
}

const getConversations = async (req, res, next) => {
  try {
    const messages = await models.Message.findAll({
      order: [['createdAt', 'ASC']]
    })

    const convos = {}
    messages.forEach(msg => {
      const userId = msg.isAdmin ? msg.toUserId : msg.fromUserId
      if (!userId) return
      if (!convos[userId]) {
        convos[userId] = { userId, messages: [], unread: 0 }
      }
      convos[userId].messages.push(msg)
      if (!msg.isAdmin && !msg.read) {
        convos[userId].unread++
      }
    })

    const userIds = Object.keys(convos).map(Number)
    const users = await models.User.findAll({
      where: { id: userIds },
      attributes: ['id', 'email', 'fullName']
    })

    const result = Object.values(convos).map(c => {
      const user = users.find(u => u.id === c.userId)
      return {
        ...c,
        userName: user ? user.fullName : 'Utilizator necunoscut',
        userEmail: user ? user.email : '',
        lastMessage: c.messages[c.messages.length - 1]
      }
    })

    result.sort((a, b) => new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt))
    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}

const replyToUser = async (req, res, next) => {
  try {
    const message = await models.Message.create({
      text: req.body.text,
      fromUserId: req.user.id,
      toUserId: parseInt(req.params.userId),
      isAdmin: true
    })

    await models.Message.update(
      { read: true },
      {
        where: {
          fromUserId: parseInt(req.params.userId),
          read: false
        }
      }
    )

    res.status(201).json(message)
  } catch (err) {
    next(err)
  }
}

const markRead = async (req, res, next) => {
  try {
    await models.Message.update(
      { read: true },
      {
        where: {
          toUserId: req.user.id,
          read: false
        }
      }
    )
    res.status(200).json({ message: 'Marked as read' })
  } catch (err) {
    next(err)
  }
}

export default {
  sendMessage,
  getMyMessages,
  getConversations,
  replyToUser,
  markRead
}