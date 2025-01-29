import { Request, Response, NextFunction } from "express";
import { IUser } from "../../models/User.model";

type ConfirmPasswordField = {
    confirm_password: IUser['password'];
}

export const verifyPasswords = (req: Request, res: Response, next: NextFunction): void => {
    const { password, confirm_password }: Pick<IUser, 'password'> & ConfirmPasswordField = req.body;

    if (password.length < 8) {
        res.status(409).send('El password debe tener mínimo 8 caracteres');
        return;
    }

    if (password !== confirm_password) {
        res.status(409).send('Los passwords no son iguales');
        return;
    }

    next();
}