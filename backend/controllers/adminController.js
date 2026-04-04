const User = require("../models/User");
const Article = require("../models/Article");
const Comment = require("../models/Comment");

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ACTIVATE / DEACTIVATE USER
exports.toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.json({
      message: `User ${user.isActive ? "activated" : "deactivated"}`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE USER + CASCADE DELETE
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get all articles of user
    const articles = await Article.find({ author: userId });

    const articleIds = articles.map(a => a._id);

    // Delete comments on those articles
    await Comment.deleteMany({ article: { $in: articleIds } });

    // Delete user's own comments
    await Comment.deleteMany({ user: userId });

    // Delete articles
    await Article.deleteMany({ author: userId });

    // Delete user
    await user.deleteOne();

    res.json({ message: "User + articles + comments deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL ARTICLES (ADMIN VIEW)
exports.getAllArticlesAdmin = async (req, res) => {
  try {
    const articles = await Article.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE ANY ARTICLE (ADMIN)
exports.deleteAnyArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    article.isDeleted = true;
    article.deletedAt = new Date();

    await article.save();

    res.json({ message: "Article moved to trash by admin" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};