import { Request, Response } from "express";
import { IProject, Project } from '../models/Project.model';

export default class ProjectController {
    static createProject = async (req: Request, res: Response): Promise<void> => {
        try {
            const { verifiedUser: { id } } = req;
            const { title, client, description }: IProject = req.body;

            const project = new Project({
                title,
                client,
                description,
                manager: id,
            });

            await project.save();

            res.status(201).send('Proyecto creado exitosamente!');
        } catch (error) {
            res.status(500).send('Hubo un error');
        }
    }

    static getProjects = async (req: Request, res: Response): Promise<void> => {
        try {
            const { verifiedUser: { id } } = req;
            const projects = await Project.find().or([{ manager: id }]).populate('tasks');

            res.json(projects);
        } catch (error) {
            res.status(500).send('Hubo un error');
        }
    }

    static getProjectByID = (req: Request, res: Response): void => {
        const { project } = req;
        res.json(project);
    }

    static updateProject = async (req: Request, res: Response): Promise<void> => {
        try {
            const { project } = req;
            await project.updateOne(req.body);
            await project.save();

            res.send('Proyecto actualizado correctamente!');
        } catch (error) {
            res.status(500).send('Hubo un error');
        }
    }

    static deleteProject = async (req: Request, res: Response): Promise<void> => {
        try {
            const { project } = req;
            project.status = false
            await project.save();

            res.send('Proyecto eliminado correctamente!');
        } catch (error) {
            res.status(500).send('Hubo un error');
        }
    }

    static recoverProject = async (req: Request, res: Response): Promise<void> => {
        try {
            const { project } = req;
            project.status = true
            await project.save();

            res.send('Proyecto recuperado correctamente!');
        } catch (error) {
            res.status(500).send('Hubo un error');
        }
    }
}