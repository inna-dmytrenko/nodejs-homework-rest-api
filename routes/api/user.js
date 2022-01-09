const express = require('express')
// const fs = require('fs/promises')
// const singler = require('multer')
// const multer = require('multer')

const router = express.Router()

const { joiSchema } = require('../../models/users')
const ctrl = require('../../controllers/auth/index')
const { updateAvatar } = require('../../controllers/auth')

const { uploadMiddleware } = require('../../middlewares')
// console.log(uploadMiddleware)

const {
  controllerWrapper,
  validation,
  authenticate,
} = require('../../middlewares')

//
// 1. Регестрация нового польователя.
// 2. Аутентификация (логин) зарегистрированного пользователя.
// 3. Авторизация аутентифицированного (зашедшего на сайт) пользователя.
// 4. Выход (Logout).
//
// const multer = require('multer')
// const path = require('path')

// const tempDir = path.join(__dirname, '../../', 'temp')

// console.log(tempDir)
// const uploadConfig = multer.diskStorage({
//   destination: (req, file, cd) => {
//     cd(null, tempDir)
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname)
//   },
//   limits: {
//     fileSize: 10485760,
//   },
// })

// const uploadMiddleware = multer({
//   storage: uploadConfig,
// })

router.post(
  '/signup',
  validation(joiSchema),
  controllerWrapper(ctrl.registerAuth),
)

router.post('/login', validation(joiSchema), controllerWrapper(ctrl.loginAuth))
// router.post('/signin')

router.get('/logout', authenticate, controllerWrapper(ctrl.logoutAuth))
// router.get('/signuot')
router.get(
  '/current',
  authenticate,
  validation(joiSchema),
  controllerWrapper(ctrl.currentUser),
)
// router.get('/signuot')

router.get('/contacts', authenticate, controllerWrapper(ctrl.favoriteContacts))

router.patch('/avatars', authenticate, uploadMiddleware, updateAvatar)

module.exports = router
// module.exports = router
