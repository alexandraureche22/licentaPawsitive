import express from 'express'
import controllers from './controllers/index.mjs'
import middleware from '../middleware/index.mjs'

const apiRouter = express.Router()

// --- Animale (publice - nu au nevoie de auth) ---
apiRouter.get('/animals', controllers.animal.getAllAnimals)
apiRouter.get('/animals/:id', controllers.animal.getOneAnimal)

// --- Animale (admin - CRUD complet) ---
apiRouter.post('/animals', middleware.auth, middleware.admin, controllers.animal.createAnimal)
apiRouter.put('/animals/:id', middleware.auth, middleware.admin, controllers.animal.updateAnimal)
apiRouter.delete('/animals/:id', middleware.auth, middleware.admin, controllers.animal.deleteAnimal)
apiRouter.post('/animals/:id/health-records', middleware.auth, middleware.admin, controllers.animal.addHealthRecord)

// --- Cereri de adoptie ---
apiRouter.post('/adoption-requests', middleware.auth, controllers.adoption.createAdoptionRequest)
apiRouter.get('/adoption-requests/mine', middleware.auth, controllers.adoption.getMyAdoptionRequests)
apiRouter.get('/adoption-requests', middleware.auth, middleware.admin, controllers.adoption.getAllAdoptionRequests)
apiRouter.put('/adoption-requests/:id/status', middleware.auth, middleware.admin, controllers.adoption.updateAdoptionRequestStatus)

// --- Donatii ---
apiRouter.post('/donations', controllers.donation.createDonation)
apiRouter.get('/donations', middleware.auth, middleware.admin, controllers.donation.getAllDonations)
// --- Statistici publice ---
apiRouter.get('/stats', controllers.stats.getPublicStats)

// --- Mesaje ---
apiRouter.post('/messages', middleware.auth, controllers.message.sendMessage)
apiRouter.get('/messages/mine', middleware.auth, controllers.message.getMyMessages)
apiRouter.put('/messages/read', middleware.auth, controllers.message.markRead)
apiRouter.get('/messages/conversations', middleware.auth, middleware.admin, controllers.message.getConversations)
apiRouter.post('/messages/reply/:userId', middleware.auth, middleware.admin, controllers.message.replyToUser)
export default apiRouter
