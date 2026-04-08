const Article = require("../models/Article");

// CREATE ARTICLE
exports.createArticle = async (req, res) => {
  try {
    if (req.user.role !== "author") {
      return res.status(403).json({
        message: "Only authors can create articles"
      });
    }

    const article = await Article.create({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category || "Other",
      image: req.file ? req.file.path : null,
      author: req.user._id,
    });

    res.status(201).json(article);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL ARTICLES
exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find({ isDeleted: false })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE ARTICLE
exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate("author", "name email")
      .populate("likedBy", "name email");

    if (!article || article.isDeleted) {
      return res.status(404).json({ message: "Article not found" });
    }

    // Increment views
    article.views += 1;
    await article.save();

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE ARTICLE
exports.updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    // only owner or admin
    if (
      article.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    article.title = req.body.title || article.title;
    article.content = req.body.content || article.content;

    if (req.file) {
      article.image = req.file.path;
    }

    const updated = await article.save();

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE ARTICLE
exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (
      article.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    // Check if permanent delete is requested
    if (req.query.permanent === 'true') {
      // Permanent delete from database
      await Article.findByIdAndDelete(req.params.id);
      return res.json({ message: "Article permanently deleted" });
    }

    // Soft delete (move to trash)
    article.isDeleted = true;
    article.deletedAt = new Date();

    await article.save();

    res.json({ message: "Article moved to trash" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// RESTORE ARTICLE
exports.restoreArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (
      article.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    article.isDeleted = false;
    article.deletedAt = null;

    await article.save();

    res.json({ message: "Article restored" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SEARCH ARTICLES
exports.searchArticles = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === '') {
      return res.status(400).json({ message: "Search query cannot be empty" });
    }

    const regex = new RegExp(q, 'i'); // case-insensitive search
    const articles = await Article.find({
      isDeleted: false,
      $or: [
        { title: regex },
        { content: regex }
      ]
    })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET DELETED ARTICLES
exports.getDeletedArticles = async (req, res) => {
  try {
    console.log("USER ROLE:", req.user.role);

    let query = { isDeleted: true };

    if (req.user.role === "author") {
      query.author = req.user._id;
    }

    const articles = await Article.find(query)
      .populate("author", "name email");

    console.log("DELETED ARTICLES:", articles.length);

    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LIKE/UNLIKE ARTICLE
exports.toggleLike = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    const userId = req.user._id.toString();
    const alreadyLiked = article.likedBy.some(id => id.toString() === userId);

    if (alreadyLiked) {
      // Unlike
      article.likedBy = article.likedBy.filter(id => id.toString() !== userId);
      article.likes -= 1;
    } else {
      // Like
      article.likedBy.push(req.user._id);
      article.likes += 1;
    }

    await article.save();
    res.json({ 
      message: alreadyLiked ? "Article unliked" : "Article liked",
      likes: article.likes,
      isLiked: !alreadyLiked
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};