import express, { Request, Response } from 'express';
import {ArtPiece, gallery} from '../models/gallery';
import verifyAuthToken from '../middlewares/verifyAuth';



// const Art = express.Router();
const store = new gallery();


const galleryRoutes = (Art: express.Application) => {
  Art.get('/art', index)
  Art.get('/art/:id', show)
  Art.post('/art', verifyAuthToken, create)
  Art.delete('/art/:id', verifyAuthToken, destroy)
  Art.put('/art/:id', verifyAuthToken, update)
}


const index = async(_req:Request , res:Response) => {
  const ArtPieces = await store.index()
  res.json(ArtPieces)
}

const show = async (req: Request, res: Response) => {
  const ArtPiece = await store.show(req.params.id as string)
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

const update = async (req: Request, res: Response) => {
  try {
      const ArtPiece: ArtPiece = {
        id: parseInt(req.params.id),
        title: req.body.title,
        category: req.body.category,
        rate: req.body.rate
      }

        const updatedArtPiece = await store.update(ArtPiece)
        res.json(updatedArtPiece)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.params.id as string)
    res.json(deleted)
}





export default galleryRoutes;