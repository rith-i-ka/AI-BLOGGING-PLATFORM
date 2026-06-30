const Blog = require("../models/Blog");

const createBlog = async (req, res) => {
  try {
const { title, category, image, content } = req.body;
    const blog = await Blog.create({
  title,
  category,
  image,
  content,
  author: req.user.id,
});

    res.status(201).json({
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "name email");

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", "name email");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    // Check if the logged-in user is the author
    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

   blog.title = req.body.title || blog.title;
blog.category = req.body.category || blog.category;
blog.image = req.body.image || blog.image;
blog.content = req.body.content || blog.content;

    await blog.save();

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    // Check if the logged-in user is the author
    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await blog.deleteOne();

    res.status(200).json({
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};