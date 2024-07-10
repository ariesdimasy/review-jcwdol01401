import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function getAllProducts(req: Request, res: Response) {
    try {

        const products = await prisma.product.findMany()

        return res.status(200).send({
            message: "success",
            data: products
        })

    } catch (err) {
        return res.status(500).send({
            message: "error",
            data: JSON.stringify(err)
        })
    }
}

export async function createProduct(req: Request, res: Response) {
    try {

        const { name, description, price, stock, category_id, user_id } = req.body

        const product = await prisma.product.create({
            data: {
                name,
                description,
                price: Number(price),
                stock: Number(stock),
                image: "",
                category_id: Number(category_id),
                user_id: Number(category_id)
            }
        })

        return res.status(200).send({
            message: "success",
            data: product
        })

    } catch (err) {
        return res.status(500).send({
            message: "error",
            data: JSON.stringify(err)
        })
    }
}