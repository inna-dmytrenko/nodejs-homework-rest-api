const registerAuth = require('./registerAuth')
const loginAuth = require('./loginAuth')
const logoutAuth = require('./logoutAuth')
const currentUser = require('./currentUser')
const favoriteContacts = require('./favoriteContacts')

module.exports = {
  registerAuth,
  loginAuth,
  logoutAuth,
  currentUser,
  favoriteContacts,
}
