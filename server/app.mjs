import express from 'express'
import routers from './routers/index.mjs'
import middleware from './middleware/index.mjs'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

const corsOptions = {
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  optionsSuccessStatus: 200
}

// initial middleware
app.use(cors(corsOptions))
app.use(express.json())

// servește imaginile uploadate
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// routers
app.use('/auth', routers.auth)
app.use('/api', routers.api)

// error middleware
app.use(middleware.genericError)

export default app