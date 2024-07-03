import { Request, Response } from "express";
import {
    PrismaClient
} from "@prisma/client";
import { genSalt, hash, compare } from "bcrypt"
import { sign } from "jsonwebtoken";
import { configDotenv } from "dotenv";

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
            return res.status(400).send({
                message: "failed",
                data: "invalid email or password"
            })
        }

        const jwtPayload = { name: user.name, email: email, role: user?.role }
        const token = await sign(jwtPayload, "mySecretAcademia", { expiresIn: '1h' })

        return res.status(200).send({
            message: "success",
            data: user,
            token: token
        })

    } catch (err) {
        res.status(500).send({
            data: JSON.stringify(err)
        })
    }
}