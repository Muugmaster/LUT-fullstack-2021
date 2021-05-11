import express, { Response } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import passport from 'passport'
import passportConfig from './utils/passport'
const app = express()

// Routes
import userRouter from './controllers/users'
import todoRouter from './controllers/todos'

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())
passportConfig(passport)
app.use(morgan('tiny'))

app.use('/api/users', userRouter)
app.use('/api/todos', todoRouter)

app.get('/ping', (_, res: Response) => {
  res.send('<h2>pong</h2>')
})

module.exports = app
