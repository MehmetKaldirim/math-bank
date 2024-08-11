import express from "express";
import { test, createComment } from "../controllers/comment.controller.js";
//import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);
router.post("/create", createComment);
//router.get("/comments/:id", verifyToken, getCommentsByUserId);
//router.delete("/delete/:id", verifyToken, deleteComment);
//router.post("/update/:id", verifyToken, updateComment);
//router.get("/get/:id", getCommentById);
//router.get("/get", getComments);

export default router;
