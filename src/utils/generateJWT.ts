import jwt from 'jsonwebtoken';
import { IUser } from '../models/User.model';

type PayloadUser = Pick<IUser, "name" | "email"> & {
    _id: string;
}


export const generateJWT = (payload: PayloadUser): string => {
    const token = jwt.sign(payload, process.env.JWT_KEY!);
    return token;
}