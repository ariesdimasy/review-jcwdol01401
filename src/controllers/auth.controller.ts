import { Request, Response } from "express";
import {
    PrismaClient
} from "@prisma/client";

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

        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: password
            }
        })

        res.status(201).send({
            message: "success",
            data: user
        })

    } catch (err) {
        res.status(500).send({
            data: JSON.stringify(err)
        })
    }
}

export const login = async (req: Request, res: Response) => {
    try {

        const { email, password } = req.body

        const login = await prisma.user.findFirst({
            where: {
                email,
                password
            }
        })

        if (login) {
            return res.status(201).send({
                message: "success",
                data: login
            })
        } else {
            return res.status(404).send({
                message: "user not found",
            })
        }


    } catch (err) {
        res.status(500).send({
            data: JSON.stringify(err)
        })
    }
}