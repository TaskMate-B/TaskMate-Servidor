import { Request, Response } from "express";
import { Project } from '../models/Project.model';

export default class ProjectController{
    static createProject = async (req: Request, res: Response): Promise<void> => {
        try {
            const { title, client, description }: { title: string, client: string, description: string } = req.body;
            const verifiedUser = req.verifiedUser;

            const project = new Project({
                title,
                client,
                description,
                manager: verifiedUser._id,
            });
            
            await project.save();

            res.status(201).send('Projecto creado exitosamente!');
        } catch (error) {
            res.status(500).send('Hubo un error');
        }
    }
}