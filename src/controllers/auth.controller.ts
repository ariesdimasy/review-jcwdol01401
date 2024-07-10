import { Request, Response } from "express";
import {
    PrismaClient
} from "@prisma/client";
import { genSalt, hash, compare } from "bcrypt"
import { sign } from "jsonwebtoken";
import { logErrorHandler } from "../helpers/errorHandler";

const prisma = new PrismaClient()

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        // SELECT * FROM users 
        const users = await prisma.user.findMany()

        res.status(200).send({
            message: "success",
            data: users
        })

    } catch (err) {
        res.status(500).send({
            err: JSON.stringify(err)
        })
    }
}

export const register = async (req: Request, res: Response) => {
    try {

        const { name, email, password } = req.body

        const existingUser = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if (existingUser) {
            //throw new Error("email has been used")
            return res.status(500).send({
                message: "failed",
                data: "email has been used"
            })
        }

        const salt = await genSalt(10)
        const hashedPassword = await hash(password, salt)

        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
            }
        })

        return res.status(201).send({
            message: "success",
            data: user
        })

    } catch (err: any) {
        return res.status(500).send({
            message: "failed",
            data: err
        })
    }
}

export const login = async (req: Request, res: Response) => {
    try {

        const { email, password } = req.body

        const user = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if (!user) {
            return res.status(400).send({
                message: "failed",
                data: "invalid email or password"
            })
        }

        const isValidPassword = await compare(password, user.password)

        if (!isValidPassword) {

            //
            if (user.attempt === 2) {
                const doSuspend = await prisma.user.update({
                    data: {
                        attempt: user.attempt + 1,
                        suspend: true,
                    },
                    where: {
                        id: user.id
                    }
                })

                return res.status(400).send({
                    message: "failed",
                    data: "Your account are suspended"
                })
            }

            const doAttempt = await prisma.user.update({
                data: {
                    attempt: user.attempt + 1
                },
                where: {
                    id: user.id
                }
            })

            return res.status(400).send({
                message: "failed",
                data: "invalid email or password"
            })
        }

        if (user.suspend == 1) {
            return res.status(400).send({
                message: "failed",
                data: "your account already suspended"
            })
        }

        const jwtPayload = { id: user.id, name: user.name, email: email, role: user?.role }
        const token = await sign(jwtPayload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })

        return res.status(200).send({
            message: "success",
            data: user,
            token: token
        })

    } catch (err) {
        logErrorHandler(JSON.stringify(err))
        res.status(500).send({
            data: JSON.stringify(err)
        })
    }
}

export async function me(req: Request, res: Response) {
    return res.status(200).send({
        message: 'success',
        data: req.user
    })
}