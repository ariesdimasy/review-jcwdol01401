"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = getAllProducts;
exports.createProduct = createProduct;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getAllProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const products = yield prisma.product.findMany();
            return res.status(200).send({
                message: "success",
                data: products
            });
        }
        catch (err) {
            return res.status(500).send({
                message: "error",
                data: JSON.stringify(err)
            });
        }
    });
}
function createProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, description, price, stock, category_id, user_id } = req.body;
            const product = yield prisma.product.create({
                data: {
                    name,
                    description,
                    price: Number(price),
                    stock: Number(stock),
                    image: "",
                    category_id: Number(category_id),
                    user_id: Number(category_id)
                }
            });
            return res.status(200).send({
                message: "success",
                data: product
            });
        }
        catch (err) {
            return res.status(500).send({
                message: "error",
                data: JSON.stringify(err)
            });
        }
    });
}
