import { Request, Response } from "express";
import { Project } from '../models/Project.model';

export default class ProjectController {
    static createProject = async (req: Request, res: Response): Promise<void> => {
        try {
            const verifiedUser = req.verifiedUser;
            const { title, client, description }: { title: string, client: string, description: string } = req.body;

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

    static getProjects = async (req: Request, res: Response): Promise<void> => {
        try {
            const verifiedUser = req.verifiedUser;
            const projects = await Project.find().or([{ manager: verifiedUser._id }]);

            res.json(projects);
        } catch (error) {
            res.status(500).send('Hubo un error');
        }
    }

    static getProjectByID = async (req: Request, res: Response): Promise<void> => {
        try {
            const project = req.project;
            res.json(project);
        } catch (error) {
            res.status(500).send('Hubo un error');
        }
    }

    static updateProject = async (req: Request, res: Response): Promise<void> => {
        try {
            const project = req.project;
            await project.updateOne(req.body);
            await project.save();

            res.send('Projecto actualizado correctamente!');
        } catch (error) {
            res.status(500).send('Hubo un error');
        }
    }

    static deleteProject = async (req: Request, res: Response): Promise<void> => {
        try {
            const project = req.project;
            project.status = false
            await project.save();

            res.send('Projecto eliminado correctamente!');
        } catch (error) {
            res.status(500).send('Hubo un error');
        }
    }

    static recoverProject = async (req: Request, res: Response): Promise<void> => {
        try {
            const project = req.project;
            project.status = true
            await project.save();

            res.send('Projecto recuperado correctamente!');
        } catch (error) {
            res.status(500).send('Hubo un error');
        }
    }
}