import { Router, Request, Response, NextFunction } from "express"
import authRouter from "./auth.router"
import postRouter from "./post.router"
import productRouter from "./product.router"
import testRouter from "./test.router"

const router = Router()

router.use("/auth", (req: Request, res: Response, next: NextFunction) => {
    console.log("middleware router utama ")
    next()
}, authRouter)
router.use("/post", postRouter)
router.use("/product", productRouter)
router.use("/test", testRouter)

export default router