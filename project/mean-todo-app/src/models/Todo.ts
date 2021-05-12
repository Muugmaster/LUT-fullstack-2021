import mongoose from 'mongoose'

export interface ITodo extends mongoose.Document {
  title: string
  description: string
  confirm: boolean
  user: mongoose.Schema.Types.ObjectId[]
}

// Todo schema
const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  confirm: {
    type: Boolean,
    default: false,
  },
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
})

TodoSchema.set('toJSON', {
  transform: (_: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Todo = mongoose.model<ITodo>('Todo', TodoSchema)

export default Todo
