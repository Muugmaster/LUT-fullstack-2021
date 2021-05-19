import { Router, Response, Request } from 'express'
import passport from 'passport'

import Todo from '../models/Todo'
import User from '../models/User'

const todosRouter = Router()

// Get ToDos
todosRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {
    // @TODO check for better implementation
    const todos = await Todo.find({ user: (req as any).user._id }).populate(
      'user',
      {
        username: 1,
      }
    )

    if (todos.length <= 0) {
      return res
        .status(404)
        .json({ success: false, message: 'No todos where found!' })
    }

    return res.status(200).json({ success: true, todos })
  }
)

// Get ToDo
todosRouter.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {
    const id = req.params.id
    // @TODO check for better implementation
    const todo = await Todo.findById(id)

    if (!todo) {
      return res
        .status(404)
        .json({ success: false, message: 'No todo where found!' })
    }

    return res.status(200).json({ success: true, todo })
  }
)

// Create ToDo
todosRouter.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {
    const { todo, confirm } = req.body

    if (!todo) {
      return res.status(403).json({
        success: false,
        message: 'Todo is needed',
      })
    }
    // @TODO check for better implementation
    const user = await User.findById((req as any).user!._id)

    const newTodo = new Todo({
      todo,
      confirm,
      user: user!._id,
    })

    const savedTodo = await newTodo.save()
    user!.todos = user!.todos.concat(savedTodo._id)
    await user!.save()
    return res.status(201).json({ success: true, todo: savedTodo.toJSON() })
  }
)

// Update todo
todosRouter.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {
    const { todo, confirm } = req.body
    const id = req.params.id
    // const user = await User.findById((req as any).user!._id)

    const updatedTodo = await Todo.findByIdAndUpdate(
      { _id: id },
      { todo, confirm },
      { new: true }
    )

    res.status(200).json({ success: true, updatedTodo })
  }
)

// Delete update
todosRouter.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {
    const id = req.params.id
    const user = await User.findById((req as any).user!._id)

    const deletedTodo = await Todo.deleteOne({ _id: id })

    user!.todos = user!.todos.filter((todo) => {
      console.log('todo', (todo as any)._id.toString())
      console.log('id', id)
      return (todo as any).toString() !== id
    })

    await user!.save()

    res.status(204).json({ success: true, deletedTodo })
  }
)

export default todosRouter
