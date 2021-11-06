const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require('body-parser');
const cors = require('cors');
const AppError = require('./utils/appError');
const fileupload = require('express-fileupload');
const multer = require("multer");
// const { cloudinary } = require('./utils/cloudinary');
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(fileupload({ useTempFiles: true }))
app.use(multer().array())

//Import ROUTES
const booksRoutes = require('./routes/books')
app.use('/books', booksRoutes)
const userRouter = require('./routes/users');
app.use('/users', userRouter);
//ROUTES
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use((err, req, res, next) => {
    res.status(500).send({
        Error: err.message,
    });
});

//Connect to db
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
    console.log('connect to db')
})

//Listening on
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Backend sever is running!");
})

