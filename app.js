const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/api/contacts')
const authRouter = require('./routes/api/user')
// const avatarsRouter = require('./routes/api/avatars')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use('/api/contacts', contactsRouter)

app.use('/api/users', authRouter)

// app.use('/api/avatars', avatarsRouter)

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Not foundhhhh',
  })
})

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err
  res.status(status).json({ message })
})

module.exports = app
