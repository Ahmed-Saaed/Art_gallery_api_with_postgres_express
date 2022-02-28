import express, { Request, Response } from 'express';
import {ArtPiece, gallery} from '../models/gallery'



// const Art = express.Router();
const store = new gallery();


const index = async(_req:Request , res:Response) => {
  const ArtPieces = await store.index()
  res.json(ArtPieces)
}


const galleryRoutes = (Art: express.Application) => {
  Art.get('/art', index)

  Art.get('/art/:id', (_req: Request, res: Response):void => {
    try {
        res.send('this is the SHOW route')
    } catch (err) {
        res.status(400)
        res.json(err)
    }
  })

  Art.post('/art', (req: Request, res: Response):void => {
    const Art: ArtPiece = {
      title: req.body.title,
      category: req.body.category,
      rate: req.body.rate
    }
    try {
      res.send('this is the CREATE route')
    } catch (err) {
      res.status(400)
      res.json(err)
    }
  })

  Art.put('/art/:id', (req: Request, res: Response):void => {
    const ArtPiece: ArtPiece = {
      id: req.params.id, 
      title: req.body.title,
      category: req.body.category,
      rate: req.body.rate
    }
    try {
      res.send('this is the EDIT route')
    } catch (err) {
      res.status(400)
      res.json(err)
    }
  })

  Art.delete('/art/:id', (_req: Request, res: Response) => {
    try {
        res.send('this is the DELETE route')
    } catch (err) {
        res.status(400)
        res.json(err)
    }
  })
}


export default galleryRoutes;