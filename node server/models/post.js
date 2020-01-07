const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    id: { type: String },
    author: { type: String },
    content: { type: String },
    img: { type: String },
    origin: { type: String },
    img_num: { type: Number },
    img_text: { type: String },
    likes: [String]
});

module.exports = mongoose.model("post", postSchema);
