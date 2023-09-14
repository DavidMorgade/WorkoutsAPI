import { Request, Response, NextFunction } from "express";
import { Role } from "../types/userEnums";



const isAdminRole = (req: Request, res: Response, next: NextFunction) => {

    // check if the request already has the user - Frontend alarm
    if(!req.user) {
        return res.status(500).json({
            msg: "Verifying role before token validation"
        })
    }
    const {role, name} = req.user;
    // Check if role is not admin with Enum
    if(role !== Role.ADMIN_ROLE) {
        return res.status(401).json({
            msg: `${name} is not an admin - can't do this action`
        })
    }

    return next();
}


export default isAdminRole;