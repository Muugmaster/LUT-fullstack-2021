require('dotenv').config()

// Server port
let PORT = process.env.PORT

// DB configs
let MONGODB_URI = process.env.MONGODB_URI

// JWT
let SECRET = process.env.SECRET

module.exports = { PORT, MONGODB_URI, SECRET }
