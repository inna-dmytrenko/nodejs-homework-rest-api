const registerAuth = require('./registerAuth')
const loginAuth = require('./loginAuth')
const logoutAuth = require('./logoutAuth')
const currentUser = require('./currentUser')
const favoriteContacts = require('./favoriteContacts')
const { updateAvatar } = require('./avatarUser.js')

module.exports = {
  registerAuth,
  loginAuth,
  logoutAuth,
  currentUser,
  favoriteContacts,
  updateAvatar,
}
