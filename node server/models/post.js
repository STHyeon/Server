const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    id: { type: String },
    author: { type: String },
    content: { type: String },
    img: { type: String }
});

module.exports = mongoose.model("post", postSchema);
