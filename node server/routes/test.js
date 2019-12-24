const path = require("path");
const multer = require("multer");
const router = require("express").Router();

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: function(req, file, cb) {
        cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }
});

// const upload = multer({ dest: "uploads/", limits: { fileSize: 5 * 1024 * 1024 } });
router.post("/upload", upload.single("img"), (req, res) => {
    console.log(req.file);
    console.log(req);
    return res.json({
        success: true
    });
});

module.exports = router;
