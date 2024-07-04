import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const createPost = async (req: Request, res: Response) => {
    try {

        const { title, body, user_id } = req.body

        console.log(" body => ", req.body)

        const post = await prisma.post.create({
            data: {
                title: title,
                body: body,
                user_id: user_id
            }
        })

        return res.status(200).send({
            message: "success",
            data: post
        })

    } catch (err) {
        return res.status(500).send({
            message: "error",
            data: JSON.stringify(err)
        })
    }
}

export const getAllPosts = async (req: Request, res: Response) => {
    try {

        const posts = await prisma.post.findMany()

        return res.status(200).send({
            message: "success",
            data: posts
        })

    } catch (err) {
        return res.status(500).send({
            message: "error",
            data: JSON.stringify(err)
        })
    }
}