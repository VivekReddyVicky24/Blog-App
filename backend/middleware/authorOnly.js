const authorOnly = (req, res, next) => {
  if (req.user.role !== "author") {
    return res.status(403).json({ message: "Author access only" });
  }
  next();
};

module.exports = authorOnly;
