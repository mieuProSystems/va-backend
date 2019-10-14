const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userAuthenticationRoutes = require('./routes/user_authentication');
const userVerificationRoutes = require('./routes/user_verification');

//initiate configuration file
dotenv.config();

const app = express();

//connect to Database
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
mongoose.Promise = global.Promise;

//MiddleWare
app.use(bodyParser.json());
app.use(userAuthenticationRoutes);
app.use(userVerificationRoutes);

//Start Server
app.listen(process.env.PORT, function () {
    console.log("app is listening");
});

