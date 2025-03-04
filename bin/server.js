const mongoose = require('mongoose')
require('dotenv').config()

const app = require('../app')
// console.log(process.env)
// const PORT = process.env.PORT || 3000
const { DB_HOST, PORT = 4040 } = process.env

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log('Database connection successful')
    }),
  )
  .catch((error) => {
    console.log(error.message)
    process.exit(1)
  })
