import { Router, Response, Request } from 'express'
import bcrypt from 'bcrypt'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import config from '../utils/config'

import User from '../models/User'

const usersRouter = Router()

// Register
usersRouter.post('/register', async (req: Request, res: Response) => {
  const { username, email, password } = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    email,
    password: passwordHash,
  })

  const savedUser = await user.save()

  return res.status(201).json({ success: true, user: savedUser })
})

// Authenticate
usersRouter.post('/authenticate', async (req: Request, res: Response) => {
  const { username, password } = req.body

  const user = await User.findOne({ username: username })
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password)

  if (!(user && passwordCorrect)) {
    return res
      .status(401)
      .json({ success: false, message: 'Invalid username or password' })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, config.SECRET!)

  res.status(200).json({ success: true, token, user: userForToken })
})

// Profile info
usersRouter.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {
    res.status(200).json({ user: req.user })
  }
)

//@TODO Update users

export default usersRouter
