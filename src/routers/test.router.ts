import { Router, Request, Response } from "express";

const router = Router()

router.get("/", (req: Request, res: Response) => {
    return res.status(200).send({
        "jwt_key": process.env.JWT_SECRET_KEY,
        base_url: process.env.BASE_URL
    })
})

export default router

