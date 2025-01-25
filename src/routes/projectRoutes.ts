import { Router } from "express";
import { body, param } from "express-validator";
import { verifyReqErrors } from "../middlewares/verifyReqErrors";
import ProjectController from "../controllers/ProjectController";
import { authenticateJWT } from "../middlewares/authenticateJWT";
import { verifyProjectExists } from "../middlewares/project/verifyProjectExists";

const router = Router();

//Authenticates JWT

router.use(authenticateJWT);

// Creates a new Project

router.post('/create-project',
    body('title')
        .isString().withMessage('title no válido')
        .notEmpty().withMessage('El title es obligatorio'),
    body('description')
        .isString().withMessage('description no válido')
        .notEmpty().withMessage('El description es obligatorio'),
    body('client')
        .isString().withMessage('client no válido')
        .notEmpty().withMessage('El client es obligatorio'),
    verifyReqErrors,
    ProjectController.createProject,
);

// Gets the projects

router.get('/get-projects', ProjectController.getProjects);

// Gets a project by ID

router.get('/get-project/:_id',
    param('_id')
        .isMongoId().withMessage('ID no válido'),
    verifyReqErrors,
    verifyProjectExists,
    ProjectController.getProjectByID
);

// Updates a project

router.put('/update-project/:_id',
    param('_id')
        .isMongoId().withMessage('ID no válido'),
    body('title')
        .isString().withMessage('title no válido')
        .notEmpty().withMessage('El title es obligatorio'),
    body('description')
        .isString().withMessage('description no válido')
        .notEmpty().withMessage('El description es obligatorio'),
    body('client')
        .isString().withMessage('client no válido')
        .notEmpty().withMessage('El client es obligatorio'),
    verifyReqErrors,
    verifyProjectExists,
    ProjectController.updateProject
);

// Deletes a project

router.patch('/delete-project/:_id',
    param('_id')
        .isMongoId().withMessage('ID no válido'),
    verifyReqErrors,
    verifyProjectExists,
    ProjectController.deleteProject
);

// Deletes a project

router.patch('/recover-project/:_id',
    param('_id')
        .isMongoId().withMessage('ID no válido'),
    verifyReqErrors,
    verifyProjectExists,
    ProjectController.recoverProject
);


export default router;