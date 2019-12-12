const router = require("express").Router();
const Auth = require("../models/auth");

router.post("/login", function(req, res) {
    Auth.findOne({ username: req.body.username }, (err, authExist) => {
        if (err) throw err;
        if (!authExist) {
            return res.status(401).json({
                error: "NOT USER"
            });
        }
        if (authExist.password !== req.body.password) {
            return res.status(401).json({
                error: "Password does not match"
            });
        }
        return res.json({ success: ture });
    });
});

module.exports = router;
