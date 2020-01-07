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
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
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
        img: file_name,
        origin: file_name,
        img_num: req.body.img_num,
        img_text: req.body.img_text
    });

    postCreate.save(err => {
        if (err) throw err;
        return res.json({ success: postCreate });
    });
});

router.post("/delete", function(req, res) {
    Post.deleteOne({ origin: req.body.imgId }, function(err, result) {
        if (err) throw err;
        if (!result) {
            return res.status(404).json({
                error: "데이터가 없음"
            });
        }

        //파일 삭제
        const imgPath = path.join(__dirname, "../public/", req.body.imgId);

        try {
            fs.unlinkSync(imgPath);
        } catch (err) {
            console.log(err);
        }

        return res.status(200).json({
            success: true
        });
    });
});

router.post("/modify", upload.single("img"), function(req, res) {
    Post.findOne({ _id: req.body.id }, (err, result) => {
        if (err) throw err;
        if (!result) {
            return res.status(404).json({
                error: "데이터가 없습니다."
            });
        }

        let data = req.body.img;
        data = data.replace(/data:image\/png;base64,/, "");
        const file_name = Date.now() + " - " + req.body.username + ".png";
        //base64 String, "파일 이름"
        decode_base64(data, file_name);

        const imgPath = path.join(__dirname, "../public/", result.origin);

        try {
            fs.unlinkSync(imgPath);
        } catch (err) {
            console.log(err);
        }

        result.content = req.body.content;
        result.img = file_name;
        result.origin = file_name;
        result.img_text = req.body.img_text;

        result.save(function(err) {
            if (err) throw err;
            return res.status(200).json({
                success: true
            });
        });
    });
});

router.post("/like", function(req, res) {
    if (req.body.userID < 1 || req.body.userID == null) {
        return res.status(403).json({
            error: "로그인이 필요합니다."
        });
    }

    Post.findOne({ _id: req.body.postID }, (err, result) => {
        if (err) throw err;

        if (!result) {
            return res.status(404).json({
                error: "데이터가 없습니다."
            });
        }

        if (result.likes.indexOf(req.body.userID) != -1) {
            result.likes.splice(result.likes.indexOf(req.body.userID), 1);
        } else {
            result.likes.push(req.body.userID);
        }

        result.save(function(err) {
            if (err) throw err;
            return res.status(200).json({
                success: true
            });
        });
    });
});

router.post("/comments", function(req, res) {
    if (req.body.userID < 1 || req.body.userID == null) {
        return res.status(403).json({
            error: "로그인이 필요합니다."
        });
    }

    if (req.body.comments_text < 1 || req.body.comments_text == null) {
        return res.status(404).json({
            error: "빈칸을 채워주세요."
        });
    }

    Post.findOne({ _id: req.body.postID }, (err, result) => {
        if (err) throw err;

        if (!result) {
            return res.status(404).json({
                error: "데이터가 없습니다."
            });
        }

        result.comments.push({
            writer: req.body.userID,
            comment: req.body.comments_text
        });

        result.save(function(err) {
            if (err) throw err;
            return res.status(200).json({
                success: true
            });
        });
    });
});

module.exports = router;
