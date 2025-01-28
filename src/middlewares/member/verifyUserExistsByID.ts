import { Request, Response, NextFunction } from "express";
import { IUser, User } from "../../models/User.model";

declare global{
    namespace Express{
        interface Request{
            user: IUser;
        }
    }
}

export const verifyUserExistsByID = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id }: Pick<IUser, 'id'> = req.body;
        const user = await User.findById(id);

        if (!user) {
            res.status(404).send('No se encontró al usuario!');
            return;
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(500).send('Hubo un error!');
    }
}