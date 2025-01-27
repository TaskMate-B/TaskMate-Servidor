import { Request, Response, NextFunction } from "express";
import { ITask } from "../../models/Task.model";

declare global {
    namespace Express {
        interface Request {
            task: ITask;
        }
    }
}

export const verifyTaskExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { taskID } = req.params;
        const project = req.project;
        const task = project.tasks.find(task => task?.id.toString() === taskID);

        if (!task) {
            res.status(404).send('No se encontró la tarea!');
            return;
        }

        req.task = (task) as ITask;
        next();
    } catch (error) {
        res.status(500).send('Hubo un error!');
    }
}