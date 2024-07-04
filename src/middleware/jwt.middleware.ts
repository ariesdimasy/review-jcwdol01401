import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

type User = {
    email: string;
    name: string;
    role?: string;
}

declare namespace Express {
    export interface Request {
        user?: User
    }
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {

        console.log("AUTHORIZATION HEADER => ", req.header("Authorization"))

        const token = req.header("Authorization")?.replace("Bearer ", "")

        console.log("token --> ", token)

        if (!token) {
            return res.status(401).send("Unauthorized")
        }

        const verifyUser = verify(token, process?.env?.JWT_SECRET_KEY)
        if (!verifyUser) {
            return res.status(401).send("Unauthorized")
        }

        req.user = verifyUser as User

        next()
    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "error",
            error: (err as Error).message
        })
    }
}

export const adminGuard = async (req: Request, res: Response, next: NextFunction) => {
    try {

        console.log("login sebagai => ", req.user)

        if (req.user?.role != "admin") {
            return res.status(401).send("Unauthorized")
        }

        next()
    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "error",
            error: (err as Error).message
        })
    }
}