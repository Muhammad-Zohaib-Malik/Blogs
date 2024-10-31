import Blog from '../models/blog.model.js';
import User from '../models/user.model.js';
import { deleteImageFromCloudinary } from '../utils/deleteImage.js';
import { uploadImage } from '../utils/uploadImage.js';
import fs from 'fs'

export const createBlog = async (req, res) => {
  try {
    const creater = req.user;
    const { title, description, draft } = req.body;
    const image = req.file;

    // Check for each field and return a specific error message if any are missing
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    if (!description) {
      return res.status(400).json({ message: 'Description is required' });
    }
    if (!image) {
      return res.status(400).json({ message: 'Image is required' });
    }

    // Check if the user exists
    const findUser = await User.findById(creater);
    if (!findUser) {
      return res.status(500).json({ message: 'User not found' });
    }

    // Upload the image to Cloudinary (or your image hosting service)
    const { secure_url, public_id } = await uploadImage(image.path); // Ensure uploadImage function works 

    fs.unlinkSync(image.path)



    // Create new blog entry
    const newBlog = new Blog({
      title,
      description,
      draft,
      creater,
      image: secure_url,
      imageId: public_id
    });

    // Update user's blog list with the new blog ID
    await User.findByIdAndUpdate(
      creater,
      { $push: { blogs: newBlog._id } },
      { new: true }
    );

    // Save the new blog to the database
    await newBlog.save();

    // Send success response
    res.status(201).json({
      newBlog,
      message: 'Blog Created Successfully',
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ draft: false })
      .populate([
        { path: "creater", select: "-password" },
        { path: "likes", select: "email username" },
        { path: "comments", select: "" }
      ]);

    res.status(200).json({ message: "Blogs fetched successfully", blogs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getBlog = async (req, res) => {
  try {
    const blogId = req.params.id
    const blogs = await Blog.findById(blogId).populate({ path: "comments", populate: { path: "user", select: "username email" } })
    res.status(200).json({ message: "Blogs fetched successfully", blogs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateBlog = async (req, res) => {
  try {
    const creator = req.user;
    const blogId = req.params.id;
    const { title, description, draft } = req.body
    const image = req.file

    const blog = await Blog.findById(blogId);

    if (!blog) return res.status(404).json({ message: "Blog not found" });


    if (!(creator == blog.creater)) {
      return res.status(403).json({ message: "You are not authorized to update this blog" });
    }

    if (image) {
      await deleteImageFromCloudinary(blog.imageId);
      const { secure_url, public_id } = await uploadImage(image.path);
      blog.image = secure_url;
      blog.imageId = public_id;
      fs.unlinkSync(image.path);
    }

    blog.title = title || blog.title;
    blog.description = description || blog.description;
    blog.draft = draft || blog.draft;


    await blog.save();

    res.status(200).json({ message: "Blog Updated Successfully", blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteBlog = async (req, res) => {
  try {
    const creator = req.user;
    const blogId = req.params.id;

    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (!(creator == blog.creater)) {
      return res.status(403).json({ message: "You are not authorized to update this blog" });
    }

    await deleteImageFromCloudinary(blog.imageId)

    await Blog.findByIdAndDelete(blogId);
    await User.findByIdAndUpdate(creator, { $pull: { blogs: blogId } })
    if (!deletedBlog) return res.status(404).json({ message: 'Blog not found' });
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const likeAndDislikeBlog = async (req, res) => {
  try {
    const creator = req.user;
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const likedBlog = blog.likes.includes(creator)

    if (likedBlog) {
      // dislike
      await Blog.findByIdAndUpdate(blogId, { $pull: { likes: creator } })

      return res.status(200).json({ message: "Blog Disliked Successfully" })
    }
    else {
      //like

      await Blog.findByIdAndUpdate(blogId, { $push: { likes: creator } })

      return res.status(200).json({ message: "Blog Liked Successfully" })
    }

  } catch (error) {
    res.status(500).json({ message: error.message });

  }
}

