const { Conflict } = require('http-errors')
const { nanoid } = require('nanoid')
const { sendEmail } = require('../../helpers')
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
  const verifyToken = nanoid()
  const newUser = new User({
    email,
    verifyToken,
  })
  // newUser = {email}
  newUser.setPassword(password)
  // newUser={email, password}
  await newUser.save()

  const emailUser = {
    to: email,
    subject: 'Подтверждения регистрации на сайте',
    html: `<a href="http://localhost:4040/api/users/verify/${verifyToken}" target="_blank">Подтвердить почту</a>`,
  }
  await sendEmail(emailUser)
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
