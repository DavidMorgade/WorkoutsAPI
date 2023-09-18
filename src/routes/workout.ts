import express from "express";

import { Response } from "express";

const router = express.Router();

router.get("/", (_, res: Response) => {
    res.json({
        msg: "OK GET - WORKOUT"
    })
});


export default router;