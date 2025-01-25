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
        const { _id } = req.params;
        const verifiedUser = req.verifiedUser;
        const project = await Project.findById(_id).or([{ manager: verifiedUser._id }]);

        if (!project) {
            res.status(404).send('No se encontró el projecto!');
            return;
        }

        req.project = project;
        next();
    } catch (error) {
        res.status(500).send('Hubo un error!');
    }
}