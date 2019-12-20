const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
    id: { type: String },
    username: { type: String },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false },
    time: { type: Date, default: Date.now }
});

// authSchema.statics.create = function(username, password) {
//     const user = new this({
//         username,
//         password
//     });

//     return user.save();
// };

// document
module.exports = mongoose.model("member", authSchema);
