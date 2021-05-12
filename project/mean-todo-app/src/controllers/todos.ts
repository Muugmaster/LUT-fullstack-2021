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
      return res.json({ success: false, message: 'No todos where found!' })
    }

    return res.status(200).json({ success: true, todos })
  }
)

// Create ToDo
todosRouter.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {
    const { title, description } = req.body

    if (!title || !description) {
      return res.json({
        success: false,
        message: 'Title and description is needed',
      })
    }
    // @TODO check for better implementation
    const user = await User.findById((req as any).user!._id)

    const todo = new Todo({
      title,
      description,
      user: user!._id,
    })

    const savedTodo = await todo.save()
    user!.todos = user!.todos.concat(savedTodo._id)
    await user!.save()
    return res.status(200).json({ success: true, todo: savedTodo.toJSON() })
  }
)

export default todosRouter
