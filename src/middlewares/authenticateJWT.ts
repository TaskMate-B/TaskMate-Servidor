import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import { User, IUser } from '../models/User.model';

declare global{
    namespace Express{
        interface Request{
            verifiedUser: IUser;
        }
    }
}

export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization;
    
    if (!bearer){
        res.status(401).send('No estás autenticado!');
        return;
    }

    console.log('AQUI');

    const [ , token ] = bearer.split(' ');
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY!);
        console.log(decoded);
        if (typeof decoded === 'object' && decoded.id) {
            const verifiedUser = await User.findById(decoded.id).select('_id name email');

            if (!verifiedUser){
                res.status(401).send('No estás autenticado!');
                return;
            }
            req.verifiedUser = verifiedUser;
            next();
        }
    } catch (error) {
        res.status(401).send('No estás autenticado!');
    }
}