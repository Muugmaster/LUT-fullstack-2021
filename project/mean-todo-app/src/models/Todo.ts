import mongoose from 'mongoose'

export interface ITodo extends Document {
  name: string
  description: string
  confirm: boolean
}

// Todo schema
const TodoSchema = new mongoose.Schema({
  name: {
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
