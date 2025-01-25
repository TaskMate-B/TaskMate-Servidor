import { Request, Response } from "express";
import { Task } from "../models/Task.model";
import { Project } from "../models/Project.model";

export default class TaskController{
    static createTask = async (req: Request, res: Response): Promise<void> => {
        try {
            const { projectID } = req.params;
            const { title, status, description }: { title: string, status: string, description: string } = req.body;
            
            const task = new Task({
                title,
                status,
                description,
                project: projectID
            })

            const project = await Project.findById(projectID);

            if (!project) {
                res.status(404).send('No se encontró el proyecto para guardar la tarea!');
                return;
            }

            project.tasks.push(task);
            await Promise.allSettled([task.save(), project.save()]);
            res.status(201).send('Tarea creada correctamente!');
        } catch (error) {
            res.status(500).send('Hubo un error!');
        }
    }

    static getTasks = async (req: Request, res: Response): Promise<void> => {
        try {
            const { projectID } = req.params;
            const tasks = await Task.find().or([{project: projectID}]);
            res.json(tasks);
        } catch (error) {
            res.status(500).send('Hubo un error!');
        }
    }
}