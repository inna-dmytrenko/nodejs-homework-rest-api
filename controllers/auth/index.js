const registerAuth = require('./registerAuth')
const loginAuth = require('./loginAuth')
const logoutAuth = require('./logoutAuth')
const currentUser = require('./currentUser')
const favoriteContacts = require('./favoriteContacts')
const { updateAvatar } = require('./avatarUser.js')
const verifyUser = require('./verifyUser')
const reVerifyUser = require('./reVerifyUser')

module.exports = {
  registerAuth,
  loginAuth,
  logoutAuth,
  currentUser,
  favoriteContacts,
  updateAvatar,
  verifyUser,
  reVerifyUser,
}
