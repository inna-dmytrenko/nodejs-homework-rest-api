const { NotFound } = require('http-errors')

const { User } = require('../../models')

const verifyUser = async (req, res) => {
  const { verifyToken } = req.params
  console.log(req.params)
  const user = await User.findOne({ verifyToken })
  if (!user) {
    throw new NotFound('Verify error')
  }
  await User.findByIdAndUpdate(user._id, { verifyToken: null, verify: true })
  res.json({
    status: 'success',
    code: 200,
    message: 'Verification successful',
  })
}

module.exports = verifyUser
