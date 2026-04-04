const express = require("express");
const router = express.Router();

const {
  addComment,
  getComments,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");

const { protect } = require("../middleware/authMiddleware");

// ADD COMMENT
router.post("/:articleId", protect, addComment);

// GET COMMENTS
router.get("/:articleId", getComments);

// UPDATE COMMENT
router.put("/:id", protect, updateComment);

// DELETE COMMENT
router.delete("/:id", protect, deleteComment);

module.exports = router;