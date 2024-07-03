import { Router } from "express"
import { getAllUsers, register, login } from "../controllers/auth.controller";

const router = Router()

// localhost:5670/test/lagi/again?search=dimas&foo=bar
router.get("/users", getAllUsers)
router.post("/register", register)
router.post("/login", login)

export default router
