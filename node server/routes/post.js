const router = require("express").Router();
const Post = require("../models/post");
const multer = require("multer");
// const upload = multer({ dest: "uploads/", limits: { fileSize: 5 * 1024 * 1024 } });
let storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "uploads/");
    },
    filename: function(req, file, callback) {
        callback(null, file.originalname);
    }
});

let upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ) {
            callback(null, true);
        } else {
            return callback(new Error("only.png, .jpg, .jpeg"));
        }
    }
});

router.get("/list", function(req, res) {
    Post.find({}, (err, list) => {
        if (err) throw err;
        return res.json({
            list: list
        });
    });
});

router.post("/post", upload.single("img"), function(req, res) {
    // if (req.body.author < 1 || req.body.content < 1) {
    //     return res.status(400).json({
    //         error: "빈칸이 있습니다."
    //     });
    // }
    const url = req.protocol + "://" + req.get("host");

    let postCreate = new Post({
        // author: req.body.username,
        // content: req.body.content,
        img: url + "/uploads/" + req.body.C_img
    });
    console.log(postCreate.img);

    postCreate.save(err => {
        if (err) throw err;
        return res.json({ success: postCreate });
    });
});

module.exports = router;
