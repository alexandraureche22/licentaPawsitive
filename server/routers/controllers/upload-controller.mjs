import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'))
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname.replace(/\s/g, '-')
    cb(null, uniqueName)
  }
})

const upload = multer({ storage })

const uploadImage = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) return next(err)
    if (!req.file) return res.status(400).json({ message: 'Nu a fost trimisă nicio imagine' })
    const imageUrl = `/uploads/${req.file.filename}`
    res.status(200).json({ imageUrl })
  })
}

export default { uploadImage }