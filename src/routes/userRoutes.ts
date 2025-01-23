import { Router } from "express";
import { body } from "express-validator";
import { verifyReqErrors } from "../middlewares/verifyReqErrors";
import UserController from "../controllers/UserController";
import { verifyPasswords } from "../middlewares/user/verifyPasswords";
import { verifyRegisteredEmail } from '../middlewares/user/verifyRegisteredEmail';
import { verifyAuthTokenExists } from "../middlewares/user/verifyAuthTokenExists";

const router = Router();

// Creates a new User

router.post('/create-user',
    body('name')
        .isString().withMessage('name no válido')
        .notEmpty().withMessage('El name es obligatorio'),
    body('email')
        .isEmail().withMessage('email no válido')
        .notEmpty().withMessage('El email es obligatorio'),
    body('password')
        .isString().withMessage('password no válido')
        .notEmpty().withMessage('El password es obligatorio'),
    body('confirm_password')
        .isString().withMessage('confirm_password no válido')
        .notEmpty().withMessage('El confirm_password es obligatorio'),
    verifyReqErrors,
    verifyRegisteredEmail,
    verifyPasswords,
    UserController.createUser
);

// Login

router.post('/login',
    body('email')
        .isEmail().withMessage('email no válido')
        .notEmpty().withMessage('El email es obligatorio'),
    body('password')
        .isString().withMessage('password no válido')
        .notEmpty().withMessage('El password es obligatorio'),
    verifyReqErrors,
    UserController.login
);

// Confirms the account

router.post('/confirm-user',
    body('token')
        .isString().withMessage('token no válido')
        .notEmpty().withMessage('El token es obligatorio'),
    verifyReqErrors,
    verifyAuthTokenExists,
    UserController.confirmUser
);


export default router;