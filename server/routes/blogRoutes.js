const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
router.post("/", protect, createBlog);
router.get("/", protect, getAllBlogs);
router.get("/:id", protect, getBlogById);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);

module.exports = router;