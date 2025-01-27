import { Request, Response } from "express";
import { Task } from "../models/Task.model";

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

            const project = req.project;

            project.tasks = [...project.tasks, task];
            await Promise.allSettled([task.save(), project.save()]);

            res.status(201).send('Tarea creada correctamente!');
        } catch (error) {
            res.status(500).send('Hubo un error!');
        }
    }

    static getTasks = (req: Request, res: Response): void => {
        const { tasks } = req.project;
        res.json(tasks);
    }

    static getTaskByID = async (req: Request, res: Response): Promise<void> => {
        try {
            const task = req.task;
            res.json(task);
        } catch (error) {
            res.status(500).send('Hubo un error!');
        }
    }

    static updateTask = async (req: Request, res: Response): Promise<void> => {
        try {
            const task = req.task;
            await task.updateOne(req.body);
            await task.save();

            res.send('Tarea actualizada correctamente!');
        } catch (error) {
            res.status(500).send('Hubo un error!');
        }
    }

    static deleteTask = async (req: Request, res: Response): Promise<void> => {
        try {
            const task = req.task;
            await task.deleteOne();

            res.send('Tarea eliminada correctamente!');
        } catch (error) {
            res.status(500).send('Hubo un error!');
        }
    }
}