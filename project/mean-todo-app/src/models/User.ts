import mongoose from 'mongoose'

export interface IUser extends Document {
  username: string
  email: string
  password: string
}

// User schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

UserSchema.set('toJSON', {
  transform: (_: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the password should not be revealed
    delete returnedObject.password
  },
})

const User = mongoose.model<IUser>('User', UserSchema)

export default User
