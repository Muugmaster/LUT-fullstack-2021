import express, { Response } from 'express'
import cors from 'cors'
import passport from 'passport'
const app = express()

// Routes
import userRouter from './controllers/users'

app.use(cors())
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())

app.use('/api/users', userRouter)

app.get('/ping', (_, res: Response) => {
  res.send('<h2>pong</h2>')
})

module.exports = app
