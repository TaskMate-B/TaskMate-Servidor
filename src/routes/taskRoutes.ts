import { Router } from "express";
import { body, param } from "express-validator";
import { verifyReqErrors } from "../middlewares/verifyReqErrors";
import TaskController from "../controllers/TaskController";
import { authenticateJWT } from "../middlewares/authenticateJWT";
import { verifyTaskExists } from "../middlewares/task/verifyTaskExists";

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
    TaskController.createTask,
);

// Gets the Tasks

router.get('/get-tasks/:projectID',
    param('projectID')
        .isMongoId().withMessage('projectID no válido'),
    verifyReqErrors,
    TaskController.getTasks,
);

// Gets a Task by ID

router.get('/get-task/:projectID/:taskID',
    param('projectID')
        .isMongoId().withMessage('projectID no válido'),
    param('taskID')
        .isMongoId().withMessage('taskID no válido'),
    verifyReqErrors,
    verifyTaskExists,
    TaskController.getTaskByID,
);

export default router;