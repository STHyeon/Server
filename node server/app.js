const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const port = process.env.PORT || 8080;
const mongo_url = "mongodb://localhost/road";
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.listen(port, () => console.log(port));

//router
// app.use("/auth", require("./routes/auth"));
// app.use("/post", require("./routes/post"));
app.use("/test", require("./routes/test"));
app.use(express.static("uploads"));

//usCreateIndex, useNewUrlParser 는 오류 방지용
mongoose.set("useCreateIndex", true);
mongoose.Promise = global.Promise;
mongoose
    .connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("success"))
    .catch(e => console.log(e));
