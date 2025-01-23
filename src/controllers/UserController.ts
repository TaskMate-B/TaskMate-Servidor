import { Request, Response } from "express";
import { User } from '../models/User.model';
import { encryptPassword } from "../utils/encryptPassword";
import { Token } from "../models/Token.model";
import { generarAuthToken } from '../utils/generateAuthToken';

export default class UserController {
    static createUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const { password }: { password: string } = req.body;
            const user = new User(req.body);

            user.password = await encryptPassword(password);

            const authToken = new Token({
                token: generarAuthToken(),
                user: user._id,
            })

            await Promise.allSettled([user.save(), authToken.save()]);
            res.status(201).send('Usuario creado exitosamente! Te hemos enviado un email para confirmar tu cuenta!');
        } catch (error) {
            res.status(500).send('Hubo un error!');
        }
    }
}