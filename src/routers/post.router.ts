import { Router } from "express";
import { createPost, getAllPosts } from "../controllers/post.controller";
import { adminGuard, verifyToken } from "../middleware/jwt.middleware";

const router = Router()

router.post("/", verifyToken, adminGuard, createPost)
router.get("/", verifyToken, getAllPosts)

export default router