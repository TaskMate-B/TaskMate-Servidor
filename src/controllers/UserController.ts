import { Request, Response } from "express";
import { User } from '../models/User.model';
import { encryptPassword } from "../utils/encryptPassword";

export default class UserController {
    static createUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const { password }: { password: string } = req.body;
            const user = new User(req.body);

            user.password = await encryptPassword(password);
            await user.save();
            res.status(201).send('Usuario creado exitosamente!');
        } catch (error) {
            res.status(500).send('Hubo un error!');
        }
    }
}