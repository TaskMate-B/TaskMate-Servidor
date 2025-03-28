import { Request, Response } from "express";
import { User } from "../models/User.model";

export default class MemberController{
    static findUserByEmail = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email } = req.query;
            console.log(email);
            const user = await User.findOne({email}).select('_id name email');

            if (!user){
                res.status(404).send('No se encontró al usuario!');
                return;
            }

            res.json(user);
        } catch (error) {
            res.status(500).send('Hubo un error!');
        }
    }

    static addMemberByID = async (req: Request, res: Response): Promise<void> => {
        try {
            const { project, user } = req;
            const { members } = project;
            const { id } = user;

            if (members.some(member => member?.id.toString() === id)){
                res.status(409).send('El usuario ya está agregado en el proyecto!');
                return;
            }

            project.members = [...members, user];
            await project.save();

            res.send('Usuario agregado al proyecto correctamente!');
        } catch (error) {
            res.status(500).send('Hubo un error!');
        }
    }

    static getMembers = (req: Request, res: Response): void => {
        const { project: {members} } = req;
        res.json(members);
    }

    static deleteMemberByID = async (req: Request, res: Response): Promise<void> => {
        try {
            const { project, user: { id } } = req;
            const { members } = project;

            if (!members.some(member => member?.id.toString() === id)){
                res.status(409).send('No se encontró el usuario en el proyecto!');
                return;
            }

            project.members = members.filter(member => member?.id.toString() !== id);
            await project.save();

            res.send('Usuario eliminado del proyecto correctamente!');
        } catch (error) {
            res.status(500).send('Hubo un error!');
        }
    }
}