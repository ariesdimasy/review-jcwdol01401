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
const redis_config_1 = require("../config/redis.config");
const errorHandler_1 = require("../helpers/errorHandler");
const prisma = new client_1.PrismaClient();
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { title, body } = req.body;
        console.log(" body => ", req.body);
        const post = yield prisma.post.create({
            data: {
                title: title,
                body: body,
                user_id: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id
            }
        });
        return res.status(200).send({
            message: "success",
            data: post
        });
    }
    catch (err) {
        (0, errorHandler_1.logErrorHandler)(JSON.stringify(err));
        return res.status(500).send({
            message: "error",
            data: JSON.stringify(err)
        });
    }
});
exports.createPost = createPost;
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const redisData = yield redis_config_1.redisClient.get("posts");
        if (redisData) {
            return res.status(200).send({
                message: "from redis",
                data: JSON.parse(redisData)
            });
        }
        const posts = yield prisma.post.findMany({
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
        });
        yield redis_config_1.redisClient.setEx("posts", 5, JSON.stringify(posts));
        return res.status(200).send({
            message: "success from prisma",
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
