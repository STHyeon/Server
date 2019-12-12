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

module.exports = mongoose.model("Auth", authSchema);
