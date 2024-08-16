import express from "express";
import {
  test,
  createComment,
  getComments,
  getApproved,
  deleteComment, // Add the deleteComment method
  updateComment, // Add the updateComment method
} from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// Middleware to check if the user is an admin
const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
};

router.get("/test", test);
router.post("/create", createComment);
router.get("/getAll", verifyToken, verifyAdmin, getComments); // Restrict to admins
router.get("/getApproved", getApproved);
router.delete("/delete/:id", verifyToken, verifyAdmin, deleteComment); // Delete route
router.post("/update/:id", verifyToken, verifyAdmin, updateComment); // Update route

export default router;
