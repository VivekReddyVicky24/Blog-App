const express = require("express");
const router = express.Router();

const {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  restoreArticle,
  getDeletedArticles,
  searchArticles,
  toggleLike,
  getFeaturedArticles,
} = require("../controllers/articleController");

const { protect, adminOnly } = require("../middleware/authMiddleware");
const authorOnly = require("../middleware/authorOnly");
const upload = require("../middleware/uploadMiddleware");

// CREATE
router.post("/", protect, authorOnly, upload.single("image"), createArticle);

// GET ALL
router.get("/", getArticles);

// GET FEATURED (PUBLIC - for landing page)
router.get("/featured/top", getFeaturedArticles);

// SEARCH
router.get("/search/query", searchArticles);

// GET DELETED
router.get("/deleted", protect, getDeletedArticles);

// GET ONE
router.get("/:id", getArticleById);

// UPDATE
router.put("/:id", protect, authorOnly, upload.single("image"), updateArticle);

// DELETE
router.delete("/:id", protect, authorOnly, deleteArticle);

// RESTORE
router.put("/restore/:id", protect, authorOnly, restoreArticle);

// LIKE/UNLIKE
router.post("/:id/like", protect, toggleLike);

module.exports = router;