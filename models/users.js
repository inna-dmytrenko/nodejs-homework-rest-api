const { Schema, model } = require('mongoose')
const Joi = require('joi')
const bcript = require('bcryptjs')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, {
          d: 'retro',
          protocol: 'http',
          format: 'qr',
          s: '250',
        })
      },
    },
  },
  { versionKey: false, timestamps: true },
)

userSchema.methods.setPassword = function (password) {
  this.password = bcript.hashSync(password, bcript.genSaltSync(10))
}
userSchema.methods.comparePassword = function (password) {
  return bcript.compareSync(password, this.password)
}

const { SECRET_KEY } = process.env
userSchema.methods.createToken = function () {
  const payload = {
    _id: this._id,
  }
  return jwt.sign(payload, SECRET_KEY)
}
const joiSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string(),
  owner: Joi.string().min(1),
  avatarURL: Joi.string(),
})
const User = model('user', userSchema)
module.exports = { joiSchema, User }
