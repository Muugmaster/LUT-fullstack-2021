import http from 'http'
import mongoose from 'mongoose'
const app = require('./app')
import config from './utils/config'

const server = http.createServer(app)

mongoose
  .connect(config.MONGODB_URL!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() =>
    server.listen(config.PORT, () => {
      console.log(`Server running on port: ${config.PORT}`)
    })
  )
  .catch((err) => console.log(err))
