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
} = require("../controllers/articleController");

const { protect, authorOnly, adminOnly } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// CREATE
router.post("/", protect, authorOnly, upload.single("image"), createArticle);

// GET ALL
router.get("/", getArticles);

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

module.exports = router;