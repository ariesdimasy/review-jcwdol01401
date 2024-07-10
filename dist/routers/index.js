"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_router_1 = __importDefault(require("./auth.router"));
const post_router_1 = __importDefault(require("./post.router"));
const product_router_1 = __importDefault(require("./product.router"));
const test_router_1 = __importDefault(require("./test.router"));
const router = (0, express_1.Router)();
router.use("/auth", (req, res, next) => {
    console.log("middleware router utama ");
    next();
}, auth_router_1.default);
router.use("/post", post_router_1.default);
router.use("/product", product_router_1.default);
router.use("/test", test_router_1.default);
exports.default = router;
