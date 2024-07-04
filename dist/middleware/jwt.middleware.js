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
exports.adminGuard = exports.verifyToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        console.log("AUTHORIZATION HEADER => ", req.header("Authorization"));
        const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        console.log("token --> ", token);
        if (!token) {
            return res.status(401).send("Unauthorized");
        }
        const verifyUser = (0, jsonwebtoken_1.verify)(token, (_b = process === null || process === void 0 ? void 0 : process.env) === null || _b === void 0 ? void 0 : _b.JWT_SECRET_KEY);
        if (!verifyUser) {
            return res.status(401).send("Unauthorized");
        }
        req.user = verifyUser;
        next();
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            message: "error",
            error: err.message
        });
    }
});
exports.verifyToken = verifyToken;
const adminGuard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log("login sebagai => ", req.user);
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) != "admin") {
            return res.status(401).send("Unauthorized");
        }
        next();
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            message: "error",
            error: err.message
        });
    }
});
exports.adminGuard = adminGuard;
