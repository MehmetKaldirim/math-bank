import Comment from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
  res.json({
    message: "Api route is working!",
  });
};

export const createComment = async (req, res, next) => {
  const { username, title, comment, avatar } = req.body;
  const newComment = new Comment({ username, title, comment, avatar });
  try {
    await newComment.save();
    res.status(201).json("Comment created successfully!");
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(errorHandler(404, "Comment not found!"));
  }

  if (req.user.id !== comment.userRef) {
    return next(errorHandler(401, "You can only delete your own comments!"));
  }

  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json("Comment has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return next(errorHandler(404, "Comment not found!"));
  }
  if (req.user.id !== comment.userRef) {
    return next(errorHandler(401, "You can only update your own comments!"));
  }

  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (error) {
    next(error);
  }
};

export const getCommentById = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return next(errorHandler(404, "Comment not found!"));
    }
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

export const getComments = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 3;
    const startIndex = parseInt(req.query.startIndex) || 0;

    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    const comments = await Comment.find({})
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};
