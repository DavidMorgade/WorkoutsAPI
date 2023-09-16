import express from 'express';
// controllers 
import { deleteUsers, getUsers, patchUsers, postUsers, putUsers } from '../controllers/users';
// express validator
import { check } from 'express-validator';
// middlewares
import { validateFields } from '../middlewares/validateFields';
import validateJWT from '../middlewares/validateJWT';
// custom validation of role
import { validateEmail, validateRole, validateUserId } from '../helpers/dbValidators';
import { hasRole } from '../middlewares/validateRoles';
//Role Enum
import { Role } from '../types/userEnums';


const router = express.Router();

router.get("/", getUsers);

router.put("/:id", [
    check("id", "Id is not valid").isMongoId(),
    check("id").custom( validateUserId ),
    check('role').custom( validateRole ),
    validateFields
],putUsers);

router.post("/", [
    // express validator
    check('email', 'Email is not valid').isEmail(),
    check('email').custom( validateEmail ),
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({min: 6}),

    // We will use mongo to validate the role 

    // check('role', 'Role is not valid').isIn([Role.ADMIN_ROLE, Role.USER_ROLE, Role.PREMIUM_ROLE]),
    check('role').custom( validateRole ),
    validateFields
],  postUsers);

router.delete("/:id", [
    validateJWT,
    hasRole(Role.ADMIN_ROLE, Role.PREMIUM_ROLE, Role.USER_ROLE),
    check("id", "Id is not valid").isMongoId(),
    check("id").custom( validateUserId ),
    validateFields 
],deleteUsers);

router.patch("/", patchUsers);

export default router;