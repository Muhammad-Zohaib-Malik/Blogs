import Blog from "../models/blog.model.js";
import Comment from "../models/comment.model.js";

export const addComment = async (req, res) => {
  try {
    const { comment } = req.body;
    const creator = req.user;
    const blogId = req.params.id;

    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (!comment) {
      return res.status(400).json({ message: "Comment is required" });
    }

    // Create the new comment
    const newComment = await Comment.create({
      comment,
      blog: blogId,
      user: creator,
    });

    // Push the new comment ID into the blog's comment array
    await Blog.findByIdAndUpdate(blogId, {
      $push: { comments: newComment._id },
    });

    res.status(201).json({ message: "Comment added successfully", newComment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const userId = req.user; // Ensure this is the user's ID
    const commentId = req.params.id;

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    // Check if the user is authorized to delete the comment
    if (
      comment.user.toString() !== userId &&
      comment.blog.creater.toString() !== userId
    ) {
      return res.status(403).json({ message: "You are not authorized" });
    }

    await Blog.findByIdAndUpdate(comment.blog._id, {
      $pull: { comments: commentId },
    });
    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editComment = async (req, res) => {
  try {
    const { updateComment } = req.body;
    const userId = req.user; // Ensure this is the user's ID
    const commentId = req.params.id;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if the user is authorized to edit the comment
    if (comment.user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this comment" });
    }

    // Update the comment with new content
    comment.comment = updateComment; // Update the comment content
    await comment.save(); // Save the updated comment

    res.status(200).json({ message: "Comment updated successfully", comment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const likeCommentAndDislikeComment = async (req, res) => {
  try {
    const userId = req.user; // Ensure this is the user's ID
    const commentId = req.params.id;

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    const alreadyLiked = comment.likes.includes(userId);

    if (alreadyLiked) {
      // Dislike the comment
      await Comment.findByIdAndUpdate(commentId, { $pull: { likes: userId } });
      return res.status(200).json({ message: "Comment disliked successfully" });
    } else {
      // Like the comment
      await Comment.findByIdAndUpdate(commentId, { $push: { likes: userId } });
      return res.status(201).json({ message: "Comment liked successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
