import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { redisClient } from "../config/redis.config"
import { logErrorHandler } from "../helpers/errorHandler"

const prisma = new PrismaClient()
redisClient.connect()

export const createPost = async (req: Request, res: Response) => {
    try {

        const { title, body } = req.body

        console.log(" body => ", req.body)

        const post = await prisma.post.create({
            data: {
                title: title,
                body: body,
                user_id: req?.user?.id
            }
        })

        return res.status(200).send({
            message: "success",
            data: post
        })

    } catch (err) {
        logErrorHandler(JSON.stringify(err))
        return res.status(500).send({
            message: "error",
            data: JSON.stringify(err)
        })
    }
}

export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const redisData = await redisClient.get("posts")

        if (redisData) {
            return res.status(200).send({
                message: "from redis",
                data: JSON.parse(redisData)
            })
        }

        const posts = await prisma.post.findMany({
            include: {
                User: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true
                    }
                }
            }
        })

        await redisClient.setEx("posts", 60, JSON.stringify(posts))

        return res.status(200).send({
            message: "success from prisma",
            data: posts
        })

    } catch (err) {
        return res.status(500).send({
            message: "error",
            data: JSON.stringify(err)
        })
    }
}