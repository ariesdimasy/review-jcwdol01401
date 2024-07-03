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
exports.login = exports.register = exports.getAllUsers = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // SELECT * FROM users 
        const users = yield prisma.user.findMany();
        res.status(200).send({
            message: "success",
            data: users
        });
    }
    catch (err) {
        res.status(500).send({
            err: JSON.stringify(err)
        });
    }
});
exports.getAllUsers = getAllUsers;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const user = yield prisma.user.create({
            data: {
                name: name,
                email: email,
                password: password
            }
        });
        res.status(201).send({
            message: "success",
            data: user
        });
    }
    catch (err) {
        res.status(500).send({
            data: JSON.stringify(err)
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const login = yield prisma.user.findFirst({
            where: {
                email,
                password
            }
        });
        if (login) {
            return res.status(201).send({
                message: "success",
                data: login
            });
        }
        else {
            return res.status(404).send({
                message: "user not found",
            });
        }
    }
    catch (err) {
        res.status(500).send({
            data: JSON.stringify(err)
        });
    }
});
exports.login = login;
