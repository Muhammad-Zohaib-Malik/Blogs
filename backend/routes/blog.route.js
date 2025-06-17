import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlog,
  likeAndDislikeBlog,
  updateBlog,
} from "../controllers/blog.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  addComment,
  deleteComment,
  editComment,
  likeCommentAndDislikeComment,
} from "../controllers/comment.controller.js";
import { upload } from "../utils/multer.js";

const router = express.Router();

router.post("/blogs", verifyToken, upload.single("image"), createBlog);
router.get("/blogs", getAllBlogs);
router.get("/blogs/:id", getBlog);

router.patch("/blogs/:id", verifyToken, updateBlog);
router.delete("/blogs/:id", verifyToken, deleteBlog);
router.post("/blogs/likeAndDislike/:id", verifyToken, likeAndDislikeBlog);
router.post("/blogs/comment/:id", verifyToken, addComment);
router.delete("/blogs/comment/:id", verifyToken, deleteComment); //commentId
router.patch("/blogs/edit-comment/:id", verifyToken, editComment); //commentId
router.post("/comments/:id/like", likeCommentAndDislikeComment);

export default router;
