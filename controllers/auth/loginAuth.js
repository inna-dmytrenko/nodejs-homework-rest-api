const { NotFound, BadRequest } = require('http-errors')
// const bcript = require('bcryptjs')
// const jwt = require('jsonwebtoken')
const { User } = require('../../models')
// const { SECRET_KEY } = process.env

const loginAuth = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }, '_id email password')
  if (!user || !user.comparePassword(password)) {
    throw new BadRequest('Email or password is wrong')
  }
  //   if (!user) {
  //     throw new NotFound(`Email ${email} is wrong`)
  //     // res.status(404).json({
  //     //   status: 'error',
  //     //   code: 404,
  //     //   message: `Email ${email} is wrong`,
  //     // })
  //     // return
  //   }
  //   if (!user.comparePassword(password)) {
  //     throw new BadRequest('Invalid password')
  //   }
  //   if (!bcript.compareSync(password, user.password)) {
  //     throw new BadRequest('Invalid password')
  //     // res.status(400).json({
  //     //   status: 'error',
  //     //   code: 400,
  //     //   message: 'Invalid password',
  //     // })
  //     // return
  //   }
  //   const payload = {
  //     _id: user._id,
  //   }
  //   const token = jwt.sign(payload, SECRET_KEY)
  const token = user.createToken()
  await User.findByIdAndUpdate(user._id, { token })
  res.json({
    status: 'success',
    code: 200,
    data: {
      token,
    },
  })
}

module.exports = loginAuth
