import  Express ,{Request ,Response} from "express";
import jwt, { Secret } from "jsonwebtoken";



const verifyAuthToken = (req: Request, res: Response, next:Function):void => {
  try {
      const authorizationHeader:string|undefined = req.headers.authorization
        // @ts-ignore
      const token = authorizationHeader.split(' ')[1]
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET as Secret)

      next()
  } catch (error) {
      res.status(401)
  }
}

export default verifyAuthToken;