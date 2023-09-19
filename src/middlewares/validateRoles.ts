import { Request, Response, NextFunction } from "express";
import { Role } from "../types/userEnums";
import { RoleType } from "../types/userTypes";

 // check if the request already has the user - Frontend alarm
export const requestValidator = (req: Request, res: Response) : Response | void => {
    if(!req.user) {
        return res.status(500).json({
            msg: "Verifying role before token validation"
        })
    };
}


const isAdminRole = (req: Request, res: Response, next: NextFunction) => {

   
    requestValidator(req, res);

    const {role, name} = req.user;
    // Check if role is not admin with Enum
    if(role !== Role.ADMIN_ROLE) {
        return res.status(401).json({
            msg: `${name} is not an admin - can't do this action`
        })
    }

    return next();
}
const hasRole = (...roles: RoleType[]) => {

    
    return (req: Request, res: Response, next: NextFunction) => {
        requestValidator(req, res);
    
        const userRol = req.user.role;
        if(!roles.includes(userRol)) {
            return res.status(401).json({
                msg: `The service needs one of this Rols ${roles}`
            })
        }

        return next();
    }

}

export {isAdminRole, hasRole};