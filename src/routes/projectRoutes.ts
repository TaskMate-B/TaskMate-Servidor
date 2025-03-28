import { Router } from "express";
import { body, param } from "express-validator";
import { verifyReqErrors } from "../middlewares/verifyReqErrors";
import ProjectController from "../controllers/ProjectController";
import { authenticateJWT } from "../middlewares/authenticateJWT";
import { verifyProjectExists } from "../middlewares/project/verifyProjectExists";
import MemberController from "../controllers/MemberController";
import { verifyUserExistsByID } from "../middlewares/member/verifyUserExistsByID";

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

router.get('/get-project/:projectID',
    param('projectID')
        .isMongoId().withMessage('ID no válido'),
    verifyReqErrors,
    verifyProjectExists,
    ProjectController.getProjectByID
);

// Updates a project

router.put('/update-project/:projectID',
    param('projectID')
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

router.patch('/delete-project/:projectID',
    param('projectID')
        .isMongoId().withMessage('ID no válido'),
    verifyReqErrors,
    verifyProjectExists,
    ProjectController.deleteProject
);

// Deletes a project

router.patch('/recover-project/:projectID',
    param('projectID')
        .isMongoId().withMessage('ID no válido'),
    verifyReqErrors,
    verifyProjectExists,
    ProjectController.recoverProject
);


// Member Routes

// Find a Member by Email

router.get('/find-user',
    MemberController.findUserByEmail
);


// Adds a Member by ID

router.post('/add-member/:projectID',
    body('id')
        .isMongoId().withMessage('ID no válido')
        .notEmpty().withMessage('El ID es obligatorio'),
    verifyReqErrors,
    verifyProjectExists,
    verifyUserExistsByID,
    MemberController.addMemberByID
);

// Gets the members of a project

router.get('/get-members/:projectID',
    verifyProjectExists,
    MemberController.getMembers
);

// Deletes a Member by ID

router.delete('/delete-member/:projectID',
    body('id')
        .isMongoId().withMessage('ID no válido')
        .notEmpty().withMessage('El ID es obligatorio'),
    verifyReqErrors,
    verifyProjectExists,
    verifyUserExistsByID,
    MemberController.deleteMemberByID
);

export default router;