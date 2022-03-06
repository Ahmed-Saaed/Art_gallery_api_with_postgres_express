import express, { Request, Response } from 'express';
import {Order, Orders} from '../models/order';
import verifyAuthToken from '../middlewares/verifyAuth';


const store = new Orders();

const orderRoutes = (app: express.Application) => {
  app.get('/orders', index)
  app.get('/orders/:id', show)
  app.post('/orders',verifyAuthToken, create)
  app.delete('/orders/:id',verifyAuthToken, destroy) 
  // add product
  app.post('/orders/:id/products',verifyAuthToken, addProduct)
}

const index = async(_req:Request , res:Response) => {
  try{
    const orders = await store.index()
    res.json(orders)
  }catch(err){
    res.status(400)
    res.json(err)
  }
}

const show = async (req: Request, res: Response) => {
  try{
    const order = await store.show(req.params.id)
    res.json(order)
  }catch(err){
    res.status(400)
    res.json(err)
  }
}

const create = async (req: Request, res: Response) => {

  const order: Order = {
    status: req.body.status,
    user_id: req.body.user_id
  }
  
  try {
    const newOrder = await store.create(order)
    res.json(newOrder)
  }catch(err) {
    res.status(400)
    res.json(err)
  }
}

const addProduct = async (req: Request, res: Response) => {
  const quantity: number = req.body.quantity
  const order_id: string = req.params.id
  const art_id: string = req.body.art_id

  try {
    const addedProduct = await store.addProduct(quantity, art_id, order_id)
    res.json(addedProduct)
  }catch(err){
    res.status(400)
    res.json(err)
  }
}

const destroy = async (req: Request, res: Response) => {
  try{
    const deleted = await store.delete(req.params.id as string)
    res.json(deleted)
  }catch(err){
    res.status(400)
    res.json(err)
  }
}


export default orderRoutes;