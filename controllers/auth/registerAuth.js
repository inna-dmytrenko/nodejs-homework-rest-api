const { Conflict } = require('http-errors')
// const bcript = require('bcryptjs')
const { User } = require('../../models')

const registerAuth = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  // console.log(user)
  if (user) {
    throw new Conflict('Email in use')
    // res.status(409).json({
    //     status: "error",
    //     code: 409,
    //     message: "Email in use"
    // });
    // return;
  }
  const newUser = new User({ email })
  // newUser = {email}
  newUser.setPassword(password)
  // newUser={email, password}
  await newUser.save()
  // const hashPassword = bcript.hashSync(password, bcript.genSaltSync(10))
  // const newUser = { email, password: hashPassword }
  // await User.create(newUser)

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Success register',
  })
}

module.exports = registerAuth
