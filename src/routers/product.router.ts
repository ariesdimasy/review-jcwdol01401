import { Router, Request, Response } from "express";
import { createProduct, getAllProducts } from "../controllers/product.controller";
import { adminGuard, verifyToken } from "../middleware/jwt.middleware";

const router = Router()

router.post("/", verifyToken, adminGuard, createProduct)
router.get("/", getAllProducts)
router.get("/", (req: Request, res: Response) => {
    res.send({
        message: "success",
        data: "hello world"
    })
})

export default router