import express from 'express';
import { check } from 'express-validator';


import { login } from '../controllers/auth';
import { validateFields } from '../middlewares/validateFields';

const router = express.Router();

router.post("/login", [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], login);


export default router;