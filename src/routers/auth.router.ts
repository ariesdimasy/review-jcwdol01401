import { NextFunction, Request, Response, Router } from "express"
import { getAllUsers, register, login } from "../controllers/auth.controller";

const router = Router()

// localhost:5670/test/lagi/again?search=dimas&foo=bar
router.get("/users", (req: Request, res: Response, next: NextFunction) => {
    console.log("check access")
    const getAccess = true
    if (getAccess) {
        console.log("bisa mengakses data users")
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
router.post("/register", register)
router.post("/login", login)

export default router
