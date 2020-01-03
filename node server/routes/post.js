const router = require("express").Router();
const Post = require("../models/post");
const multer = require("multer");
const fs = require("fs");
var path = require("path");

function decode_base64(base64str, filename) {
    let buf = Buffer.from(base64str, "base64");

    fs.writeFile(path.join(__dirname, "../public/", filename), buf, function(error) {
        // console.log(buf);
        if (error) {
            throw error;
        } else {
            // console.log("File created from base64 string!");
            return true;
        }
    });
}

let upload = multer({
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

        for (const i in list) {
            const ai = path.join(__dirname, "../public/", list[i].img);
            let buf = fs.readFileSync(ai);
            let base64data = buf.toString("base64");
            list[i].img = "data:image/png;base64," + base64data;
        }

        return res.json({
            list: list
        });
    });
});

router.post("/post", upload.single("img"), function(req, res) {
    if (req.body.author < 1 || req.body.content < 1) {
        return res.status(400).json({
            error: "로그인이 되어 있지않거나 빈칸이 있습니다."
        });
    }

    let data = req.body.img;
    data = data.replace(/data:image\/png;base64,/, "");
    const file_name = Date.now() + " - " + req.body.username + ".png";
    //base64 String, "파일 이름"
    decode_base64(data, file_name);
    let postCreate = new Post({
        author: req.body.username,
        content: req.body.content,
        img: file_name
    });

    postCreate.save(err => {
        if (err) throw err;
        return res.json({ success: postCreate });
    });
});

module.exports = router;
