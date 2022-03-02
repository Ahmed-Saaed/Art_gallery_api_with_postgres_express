import express, { Request, Response } from 'express';
import {Order, Orders} from '../models/order';

const store = new Orders();

const orderRoutes = (app: express.Application) => {
  app.get('/orders', index)
  app.get('/orders/:id', show)
  app.post('/orders', create)
  // add product
  app.post('/orders/:id/products', addProduct)
}

const index = async(_req:Request , res:Response) => {
  const orders = await store.index()
  res.json(orders)
}

const show = async (req: Request, res: Response) => {
  const order = await store.show(req.params.id as string)
  res.json(order)
}

const create = async (req: Request, res: Response) => {
  try {
      const order: Order = {
        status: req.body.status,
        userId: req.body.userId
      }

        const newOrder = await store.create(order)
        res.json(newOrder)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const addProduct = async (req: Request, res: Response) => {
  const orderId: number = parseInt(req.params.id)
  const ArtId: number = parseInt(req.body.ArtId)
  const quantity: number = parseInt(req.body.quantity)

  try {
    const addedProduct = await store.addProduct(quantity, ArtId, orderId)
    res.json(addedProduct)
  } catch(err) {
    res.status(400)
    res.json(err)
  }
}


export default orderRoutes;