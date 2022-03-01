import express, { Request, Response } from 'express';
import {ArtPiece, gallery} from '../models/gallery'



// const Art = express.Router();
const store = new gallery();


const index = async(_req:Request , res:Response) => {
  const ArtPieces = await store.index()
  res.json(ArtPieces)
}

const show = async (req: Request, res: Response) => {
  const ArtPiece = await store.show(req. query.id as string)
  res.json(ArtPiece)
}

const create = async (req: Request, res: Response) => {
  try {
      const ArtPiece: ArtPiece = {
        title: req.body.title,
        category: req.body.category,
        rate: req.body.rate
      }

        const newArtPiece = await store.create(ArtPiece)
        res.json(newArtPiece)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.query.id as string)
    res.json(deleted)
}


const galleryRoutes = (Art: express.Application) => {
  Art.get('/art/all', index)
  Art.get('/art?id=', show)
  Art.post('/art', create)
  Art.delete('/art?id=', destroy)
}


export default galleryRoutes;