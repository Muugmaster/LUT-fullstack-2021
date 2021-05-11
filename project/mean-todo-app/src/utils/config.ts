import dotenv from 'dotenv'

dotenv.config()

// Server port
let PORT = process.env.PORT

// MongoDB url
let MONGODB_URL = process.env.MONGODB_URL

// Secret for jwtoken
let SECRET = process.env.SECRET

export default { PORT, MONGODB_URL, SECRET }
