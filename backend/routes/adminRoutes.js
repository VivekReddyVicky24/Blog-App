const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  toggleUserStatus,
  deleteUser,
  getAllArticlesAdmin,
  deleteAnyArticle,
} = require("../controllers/adminController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// USERS
router.get("/users", protect, adminOnly, getAllUsers);
router.put("/users/:id", protect, adminOnly, toggleUserStatus);
router.delete("/users/:id", protect, adminOnly, deleteUser);

// ARTICLES
router.get("/articles", protect, adminOnly, getAllArticlesAdmin);
router.delete("/articles/:id", protect, adminOnly, deleteAnyArticle);

module.exports = router;