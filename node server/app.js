const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
var path = require('path');

const config = require('./config/jwt');

const port = process.env.PORT || 8080;
const mongo_url = 'mongodb://localhost/road';
// const mongo_url = 'mongodb+srv://root:1234@cluster0.qcp56.mongodb.net/road?retryWrites=true&w=majority';

//usCreateIndex, useNewUrlParser 는 오류 방지용
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;
mongoose
    .connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then()
    .catch((e) => console.log(e));

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection succes');
});

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
