import { Request, Response } from "express";
import { User } from '../models/User.model';
import { encryptPassword } from "../utils/encryptPassword";
import { Token } from "../models/Token.model";
import { generarAuthToken } from '../utils/generateAuthToken';
import { comparePassword } from "../utils/comparePassword";

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

    static login = async (req: Request, res: Response): Promise<void> => {
        try {
            //Verifies that the user exists
            const { email, password }: { email: string, password: string } = req.body;
            const user = await User.findOne({email});

            if ( !user ) {
                res.status(404).send('No se encontró al usuario con el email registrado!');
                return;
            }

            //Verifies that the user is verified
            const { verified }: { verified: boolean } = user;

            if ( !verified ) {
                const authToken = new Token({
                    token: generarAuthToken(),
                    user: user._id,
                })

                await authToken.save();
                res.status(409).send('Tu cuenta no está confirmada! Te hemos enviado un email para confirmar tu cuenta!');
                return;
            }

            //Verifies that the password is correct

            const compareResult = await comparePassword(password, user.password);

            if( !compareResult ) {
                res.status(401).send('El password es incorrecto!');
                return;
            }

            res.send('AQUI IRA JWT');

        } catch (error) {
            res.status(500).send('Hubo un error!');
        }
    }

    static confirmUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const authToken = req.authToken;
            const user = req.user;
            user.verified = true;
            await Promise.allSettled([user.save(), authToken.deleteOne()]);

            res.send('Tu cuenta ha sido confirmada!');
        } catch (error) {
            res.status(500).send('Hubo un error!');
        }
    }
}