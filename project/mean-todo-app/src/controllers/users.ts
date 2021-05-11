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

  return res.json({ success: true, user: savedUser })
})

export default usersRouter
