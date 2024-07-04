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
exports.getAllPosts = exports.createPost = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, body, user_id } = req.body;
        console.log(" body => ", req.body);
        const post = yield prisma.post.create({
            data: {
                title: title,
                body: body,
                user_id: user_id
            }
        });
        return res.status(200).send({
            message: "success",
            data: post
        });
    }
    catch (err) {
        return res.status(500).send({
            message: "error",
            data: JSON.stringify(err)
        });
    }
});
exports.createPost = createPost;
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield prisma.post.findMany();
        return res.status(200).send({
            message: "success",
            data: posts
        });
    }
    catch (err) {
        return res.status(500).send({
            message: "error",
            data: JSON.stringify(err)
        });
    }
});
exports.getAllPosts = getAllPosts;
