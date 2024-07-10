import { NextFunction, Request, Response, Router } from "express"
import { getAllUsers, register, login, me } from "../controllers/auth.controller";
import { verifyToken } from "../middleware/jwt.middleware";
const router = Router()

// localhost:5670/test/lagi/again?search=dimas&foo=bar
router.get("/users", (req: Request, res: Response, next: NextFunction) => {
    console.warn("check access")
    const getAccess = true
    if (getAccess) {
        console.warn("bisa mengakses data users")
        next()
    } else {
        res.status(404).send({
            message: "error"
        })
    }
}, (req: Request, res: Response, next: NextFunction) => {
    console.log("middleware selanjutnya ")
    next()
}, getAllUsers)
router.get("/me", verifyToken, me)
router.post("/register", register)
router.post("/login", login)


export default router
