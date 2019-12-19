const router = require("express").Router();
const Post = require("../models/post");

router.get("/list", function(req, res) {
    Post.find({}, (err, list) => {
        if (err) throw err;
        return res.json({
            list: list
        });
    });
});

module.exports = router;
