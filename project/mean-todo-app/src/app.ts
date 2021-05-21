import express, { Response, Request } from 'express'
import path from 'path'
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
app.use(express.static(__dirname + '/client'))

app.use('/api/users', userRouter)
app.use('/api/todos', todoRouter)

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

module.exports = app
