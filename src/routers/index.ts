import { Router, Request, Response, NextFunction } from "express"
import authRouter from "./auth.router"
import postRouter from "./post.router"

const router = Router()

router.use("/auth", (req: Request, res: Response, next: NextFunction) => {
    console.log("middleware router utama ")
    next()
}, authRouter)
router.use("/post", postRouter)

export default router