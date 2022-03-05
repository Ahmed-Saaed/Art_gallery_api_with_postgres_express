import express, { Request, Response } from 'express'

import { DashboardQueries } from '../models/services/dashboard'


const dashboardRoutes = (app: express.Application) => {
    app.get('/completed', completedOrder)
}

const dashboard = new DashboardQueries()

const completedOrder = async (_req: Request, res: Response) => {
  const orders = await dashboard.completedOrder()
  res.json(orders)
}


export default dashboardRoutes