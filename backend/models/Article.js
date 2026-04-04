const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    image: String,
    category: {
      type: String,
      enum: ["Technology", "Lifestyle", "Design", "Culture", "Science", "Other"],
      default: "Other",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);