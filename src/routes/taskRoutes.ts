import { Router } from "express";
import { body, param } from "express-validator";
import { verifyReqErrors } from "../middlewares/verifyReqErrors";
import TaskController from "../controllers/TaskController";
import { authenticateJWT } from "../middlewares/authenticateJWT";
import { verifyTaskExists } from "../middlewares/task/verifyTaskExists";
import { verifyProjectExists } from "../middlewares/project/verifyProjectExists";

const router = Router();

//Authenticates JWT

router.use(authenticateJWT);

// Creates a new Task

router.post('/create-task/:projectID',
    param('projectID')
        .isMongoId().withMessage('projectID no válido'),
    body('title')
        .isString().withMessage('title no válido')
        .notEmpty().withMessage('El title es obligatorio'),
    body('status')
        .isString().withMessage('status no válido')
        .notEmpty().withMessage('El status es obligatorio'),
    body('description')
        .isString().withMessage('description no válido')
        .notEmpty().withMessage('El description es obligatorio'),
    verifyReqErrors,
    verifyProjectExists,
    TaskController.createTask,
);

// Gets the Tasks

router.get('/get-tasks/:projectID',
    param('projectID')
        .isMongoId().withMessage('projectID no válido'),
    verifyReqErrors,
    verifyProjectExists,
    TaskController.getTasks,
);

// Gets a Task by ID

router.get('/get-task/:projectID/:taskID',
    param('projectID')
        .isMongoId().withMessage('projectID no válido'),
    param('taskID')
        .isMongoId().withMessage('taskID no válido'),
    verifyReqErrors,
    verifyProjectExists,
    verifyTaskExists,
    TaskController.getTaskByID,
);

// Updates a Task

router.put('/update-task/:projectID/:taskID',
    param('projectID')
        .isMongoId().withMessage('projectID no válido'),
    param('taskID')
        .isMongoId().withMessage('taskID no válido'),
    body('title')
        .isString().withMessage('title no válido')
        .notEmpty().withMessage('El title es obligatorio'),
    body('status')
        .isString().withMessage('status no válido')
        .notEmpty().withMessage('El status es obligatorio'),
    body('description')
        .isString().withMessage('description no válido')
        .notEmpty().withMessage('El description es obligatorio'),
    verifyReqErrors,
    verifyProjectExists,
    verifyTaskExists,
    TaskController.updateTask,
);

// Deletes a Task

router.delete('/delete-task/:projectID/:taskID',
    param('projectID')
        .isMongoId().withMessage('projectID no válido'),
    param('taskID')
        .isMongoId().withMessage('taskID no válido'),
    verifyReqErrors,
    verifyProjectExists,
    verifyTaskExists,
    TaskController.deleteTask,
);

export default router;