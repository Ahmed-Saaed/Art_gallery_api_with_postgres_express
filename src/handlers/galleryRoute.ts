import express, { Request, Response } from 'express';
import {ArtPiece, gallery} from '../models/gallery';
import verifyAuthToken from '../middlewares/verifyAuth';



// const Art = express.Router();
const store = new gallery();


const galleryRoutes = (Art: express.Application) => {
  Art.get('/art', index)
  Art.get('/art/:id', show)
  Art.get('/art/:category', filter)
  Art.post('/art', create)
  Art.delete('/art/:id', verifyAuthToken, destroy)
  Art.put('/art/:id', verifyAuthToken, update)
}


const index = async(_req:Request , res:Response) => {
  try{
    const ArtPieces = await store.index()
    res.json(ArtPieces)
  }catch(err){
    res.status(400)
    res.json(err)
  }
}

const show = async (req: Request, res: Response) => {
  try{
    const ArtPiece = await store.show(parseInt(req.params.id))
    res.json(ArtPiece)
  }catch(err){
    res.status(400)
    res.json(err)
  }
}
const filter = async (req: Request, res: Response) => {
  try{
    const ArtPiece = await store.filter(req.params.category)
    res.json(ArtPiece)
  }catch(err){
    res.status(400)
    res.json(err)
  }
}

const create = async (req: Request, res: Response) => {
  try {
      const ArtPiece: ArtPiece = {
        title: req.body.title,
        artist: req.body.artist,
        category: req.body.category,
        price: req.body.price
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
        id: req.params.id,
        title: req.body.title,
        artist: req.body.artist,
        category: req.body.category,
        price: req.body.price
      }

        const updatedArtPiece = await store.update(ArtPiece)
        res.json(updatedArtPiece)
    } catch(err) {
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


export default galleryRoutes;