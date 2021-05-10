const router = require('express').Router()
const bcrypt = require('bcrypt')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const User = require('../models/User')

// Register
router.post('/register', async (req, res) => {
  const { name, email, username, password } = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    name,
    email,
    username,
    password: passwordHash,
  })

  const savedUser = await user.save()

  res.json({ success: true, savedUser })
})

// Authenticate
router.post('/authenticate', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username: username })
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      success: false,
      error: 'invalid username or password',
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, config.SECRET)

  res.status(200).json({ success: true, token, user: userForToken })
})

// Profile
router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ user: req.user })
  }
)

module.exports = router
