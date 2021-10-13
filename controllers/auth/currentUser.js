const { User } = require('../../models')

const currentUser = async (req, res) => {
  const [{ _id: id, email, subscription }] = await User.find(req.user)
  res.json({
    status: 'success',
    code: 200,
    result: {
      id,
      email,
      subscription,
    },
  })
}
module.exports = currentUser
