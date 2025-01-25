import jwt from 'jsonwebtoken';

type PayloadUser = {
    _id: string;
}


export const generateJWT = (payload: PayloadUser): string => {
    const token = jwt.sign(payload, process.env.JWT_KEY!, {
        expiresIn: '1d',
    });
    return token;
}