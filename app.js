const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

//Import ROUTES
const booksRoutes = require('./routes/books')
app.use('/books', booksRoutes)

//ROUTES
app.get('/', (req, res) => {
    res.send('Hello')
})

//Connect to db
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
    console.log('connect to db')
})

//Listening on
app.listen(process.env.PORT || 5000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

