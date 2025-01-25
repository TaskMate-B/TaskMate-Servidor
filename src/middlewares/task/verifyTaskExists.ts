import { Request, Response, NextFunction } from "express";
import { ITask, Task } from "../../models/Task.model";

declare global{
    namespace Express{
        interface Request{
            task: ITask;
        }
    }
}

export const verifyTaskExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { projectID, taskID } = req.params;
        const task = await Task.findById(taskID).or([{ project: projectID }]);

        if (!task) {
            res.status(404).send('No se encontró la tarea!');
            return;
        }

        req.task = task;
        next();
    } catch (error) {
        console.log(error);
    }
}