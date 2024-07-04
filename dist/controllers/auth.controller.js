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
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
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
        const existingUser = yield prisma.user.findFirst({
            where: {
                email: email
            }
        });
        if (existingUser) {
            //throw new Error("email has been used")
            return res.status(500).send({
                message: "failed",
                data: "email has been used"
            });
        }
        const salt = yield (0, bcrypt_1.genSalt)(10);
        const hashedPassword = yield (0, bcrypt_1.hash)(password, salt);
        const user = yield prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
            }
        });
        return res.status(201).send({
            message: "success",
            data: user
        });
    }
    catch (err) {
        return res.status(500).send({
            message: "failed",
            data: err
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield prisma.user.findFirst({
            where: {
                email
            }
        });
        if (!user) {
            return res.status(400).send({
                message: "failed",
                data: "invalid email or password"
            });
        }
        const isValidPassword = yield (0, bcrypt_1.compare)(password, user.password);
        if (!isValidPassword) {
            //
            if (user.attempt === 2) {
                const doSuspend = yield prisma.user.update({
                    data: {
                        attempt: user.attempt + 1,
                        suspend: true,
                    },
                    where: {
                        id: user.id
                    }
                });
                return res.status(400).send({
                    message: "failed",
                    data: "Your account are suspended"
                });
            }
            const doAttempt = yield prisma.user.update({
                data: {
                    attempt: user.attempt + 1
                },
                where: {
                    id: user.id
                }
            });
            return res.status(400).send({
                message: "failed",
                data: "invalid email or password"
            });
        }
        if (user.suspend == 1) {
            return res.status(400).send({
                message: "failed",
                data: "your account already suspended"
            });
        }
        const jwtPayload = { id: user.id, name: user.name, email: email, role: user === null || user === void 0 ? void 0 : user.role };
        const token = yield (0, jsonwebtoken_1.sign)(jwtPayload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        return res.status(200).send({
            message: "success",
            data: user,
            token: token
        });
    }
    catch (err) {
        res.status(500).send({
            data: JSON.stringify(err)
        });
    }
});
exports.login = login;
