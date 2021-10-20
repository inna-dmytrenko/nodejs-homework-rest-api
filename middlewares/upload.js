const multer = require('multer')
const path = require('path')

const tempDir = path.join(__dirname, '../', 'temp')
// console.log(__dirname)
const uploadConfig = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, tempDir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
  limits: {
    fileSize: 10485760,
  },
})

const uploadMiddleware = multer({
  storage: uploadConfig,
}).single('avatar')

module.exports = uploadMiddleware
// const multer = require('multer')
// const path = require('path')

// const tempDir = path.join(__dirname, '../', 'temp')
// console.log(tempDir)
// const multerSetting = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, tempDir)
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname)
//   },
//   limits: {
//     fileSize: 2058,
//   },
// })

// const upload = multer({
//   storage: multerSetting,
// })

// module.exports = upload
