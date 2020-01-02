const router = require("express").Router();
const Auth = require("../models/auth");

const jwt = require("jsonwebtoken");
const secrectObj = require("../config/jwt");

router.post("/login", function(req, res) {
    let token = jwt.sign(
        {
            username: req.body.username //토큰 내용
            // username: req.body.username //토큰 내용
        },
        secrectObj.secret, // 비밀키
        {
            expiresIn: "5m" // 유효 시간: 5분
        }
    );

    Auth.findOne({ username: req.body.username }, (err, authExist) => {
        if (err) throw err;
        if (!authExist) {
            return res.status(401).json({
                error: "사용자가 존재하지 않습니다."
            });
        }
        if (authExist.password !== req.body.password) {
            return res.status(401).json({
                error: "비밀번호가 일치하지 않습니다."
            });
        }

        return res.json({ username: authExist.username, token: token });
    });
});

router.post("/register", function(req, res) {
    if (req.body.username < 1 || req.body.password < 1 || req.body.password2 < 1) {
        return res.status(400).json({
            error: "빈칸을 채워주세요."
        });
    }

    // if (req.body.password.length < 7) {
    //     return res.status(400).json({
    //         error: "비밀번호가 짧습니다."
    //     });
    // }

    Auth.findOne({ username: req.body.username }, (err, exists) => {
        if (err) throw err;
        if (exists) {
            return res.status(409).json({
                error: "아이디가 이미 존재합니다."
            });
        }
        if (req.body.password !== req.body.password2) {
            return res.status(400).json({
                error: "비밀번호가 서로 일치하지 않습니다."
            });
        }

        let authCreate = new Auth({
            username: req.body.username,
            password: req.body.password
        });

        authCreate.save(err => {
            if (err) throw err;
            return res.json({ success: true });
        });
    });
});

module.exports = router;
