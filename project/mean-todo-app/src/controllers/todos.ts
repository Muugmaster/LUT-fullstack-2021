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
    const { title, description, confirm } = req.body

    if (!title || !description) {
      return res.status(403).json({
        success: false,
        message: 'Title and description is needed',
      })
    }
    // @TODO check for better implementation
    const user = await User.findById((req as any).user!._id)

    const todo = new Todo({
      title,
      description,
      confirm,
      user: user!._id,
    })

    const savedTodo = await todo.save()
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
    const { title, description, confirm } = req.body
    const id = req.params.id
    // const user = await User.findById((req as any).user!._id)

    const updatedTodo = await Todo.findByIdAndUpdate(
      { _id: id },
      { title, description, confirm },
      { new: true }
    )

    res.status(200).json({ success: true, updatedTodo })
  }
)

// Delete update

export default todosRouter
