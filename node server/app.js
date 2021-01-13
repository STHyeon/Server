const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
var path = require('path');

const config = require('./config/jwt');

dotenv.config();
const port = process.env.PORT || 8080;
// const mongo_url = 'mongodb://localhost/road';
const mongo_url = process.env.MONGODBCLOUD;

//usCreateIndex, useNewUrlParser 는 오류 방지용
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;
mongoose
    .connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connectioned'))
    .catch((e) => console.log(e));

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.set('jwt-secret', config.secretKey);

//router
app.use('/auth', require('./routes/auth'));
app.use('/post', require('./routes/post'));
app.use('/test', require('./routes/test'));

app.listen(port, () => console.log(`Server is running on port ${port}`));
