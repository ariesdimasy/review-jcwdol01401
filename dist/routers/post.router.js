"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = require("../controllers/post.controller");
const jwt_middleware_1 = require("../middleware/jwt.middleware");
const router = (0, express_1.Router)();
router.post("/", jwt_middleware_1.verifyToken, jwt_middleware_1.adminGuard, post_controller_1.createPost);
router.get("/", jwt_middleware_1.verifyToken, post_controller_1.getAllPosts);
exports.default = router;
