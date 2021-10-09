const express = require('express')

const router = express.Router()

const { joiSchema } = require('../../models/users')
const ctrl = require('../../controllers/auth/index')
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

router.post(
  '/signup',
  validation(joiSchema),
  controllerWrapper(ctrl.registerAuth),
)

router.post('/login', validation(joiSchema), controllerWrapper(ctrl.loginAuth))
// router.post('/signin')

router.get('/logout', authenticate, controllerWrapper(ctrl.logoutAuth))
// router.get('/signuot')

module.exports = router
