import express from 'express';
import { check } from 'express-validator';

// sign in google and login
import { googleSignIn, login } from '../controllers/auth';
import { validateFields } from '../middlewares/validateFields';

const router = express.Router();

router.post("/login", [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], login);

router.post("/google", [
    check('id_token', 'id_token google is necessary').not().isEmpty(),
    validateFields
], googleSignIn);


export default router;