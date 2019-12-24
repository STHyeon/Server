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

router.post("/post", function(req, res) {
    if (req.body.param.author < 1 || req.body.param.content < 1) {
        return res.status(400).json({
            error: "빈칸이 있습니다."
        });
    }

    let postCreate = new Post({
        author: req.body.param.username,
        content: req.body.param.content
    });

    postCreate.save(err => {
        if (err) throw err;
        return res.json({ success: true });
    });
});

module.exports = router;
