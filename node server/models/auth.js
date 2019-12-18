const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
    {
        id: { type: String },
        username: { type: String },
        password: { type: String, required: true }
    },
    {
        timestamps: true
    }
);
// document
module.exports = mongoose.model("member", authSchema);
