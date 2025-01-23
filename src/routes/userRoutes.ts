import { Router } from "express";
import { body } from "express-validator";
import { verifyReqErrors } from "../middlewares/verifyReqErrors";
import UserController from "../controllers/UserController";
import { verifyPasswords } from "../middlewares/user/verifyPasswords";
import { verifyRegisteredEmail } from '../middlewares/user/verifyRegisteredEmail';

const router = Router();

//Creates a new User

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

export default router;