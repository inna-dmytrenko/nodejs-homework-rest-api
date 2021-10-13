const { User } = require('../../models')

const logoutAuth = async (req, res) => {
  const { _id } = req.user
  await User.findByIdAndUpdate(_id, { token: null })
  res.json({
    status: 'success',
    code: 200,
    message: 'Success logout',
  })
}

module.exports = logoutAuth
