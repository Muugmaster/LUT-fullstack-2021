const express = require('express')
const path = require('path')
const cors = require('cors')
const passport = require('passport')
const mongoose = require('mongoose')
const config = require('./utils/config')

const usersRoute = require('./routes/users')

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())
require('./utils/passport')(passport)

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.send('Invalid endpoint')
})

app.use('/users', usersRoute)

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`)
    })
  )
  .catch((error) => console.log(error))
