import { Request, Response, NextFunction } from "express";
import { IProject, Project } from "../../models/Project.model";

declare global{
    namespace Express{
        interface Request{
            project: IProject;
        }
    }
}

export const verifyProjectExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { projectID } = req.params;
        const verifiedUser = req.verifiedUser;
        const project = await Project.findById(projectID).or([{ manager: verifiedUser._id }])
            .populate('tasks')
            .populate({
                path: 'members',
                select: 'id name email'
            });

        if (!project) {
            res.status(404).send('No se encontró el proyecto!');
            return;
        }

        req.project = project;
        next();
    } catch (error) {
        res.status(500).send('Hubo un error!');
    }
}