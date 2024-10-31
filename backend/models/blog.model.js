import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  draft: {
    type: Boolean,
    default: false
  },
  creater: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  imageId: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]

}, {
  timestamps: true
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;

