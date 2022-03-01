import express, { Request, Response } from 'express';
import { User , Users } from '../models/user';
import jwt,{Secret} from "jsonwebtoken";


const store = new Users();


const userRoutes = (app: express.Application) => {
  app.get('/users', index)
  app.get('/users/{:id}', show)
  app.post('/users', create)
  app.delete('/users' ,destroy)
  app.post('/users/authenticate', authenticate)
}



// the methods
const index = async (_req: Request, res: Response) => {
  const users = await store.index()
  res.json(users)
}

const show = async (_req: Request, res: Response) => {
  const user = await store.show(_req.body.id)
  res.json(user)
}

const create = async (req: Request, res: Response) => {
  const user: User = {
      username: req.body.username,
      password: req.body.password,
  }
  try {
      const newUser = await store.create(user)
      var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as Secret);
      res.json(token)
  } catch(err) {
      res.status(400)
        // @ts-ignore
      res.json(err + user)
  }
}

const destroy = async (_req: Request, res: Response) => {
  const deleted = await store.delete(_req.body.id)
  res.json(deleted)
}

const authenticate = async (_req: Request, res: Response) => {
  const user: User = {
    username: _req.body.username,
    password: _req.body.password,
  }
  try {
    const u = await store.authenticate(user.username, user.password)
    var token = jwt.sign({ user: u }, process.env.TOKEN_SECRET as Secret);
    res.json(token)
  } catch(err) {
      res.status(401)
        // @ts-ignore
      res.json(err + user)
  }
  }


export default userRoutes
