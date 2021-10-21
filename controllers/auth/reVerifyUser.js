const { User } = require('../../models')
const { BadRequest, NotFound } = require('http-errors')
const { sendEmail } = require('../../helpers')

const reVerifyUser = async (req, res, next) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (user) {
      const { email, verify, verifyToken } = user

      if (!verify) {
        const emailUser = {
          to: email,
          subject: 'Подтверждения регистрации на сайте',
          html: `<a href="http://localhost:4040/api/users/verify/${verifyToken}" target="_blank">Подтвердить почту</a>`,
        }
        await sendEmail(emailUser)
        res.status(200).json({
          status: 'success',
          code: 200,
          message: 'Verification email sent',
        })
      }
      throw new BadRequest('Verification has already been passed')
    }
    throw new NotFound('missing required field email')
  } catch (error) {
    next(error)
  }
}
module.exports = reVerifyUser
