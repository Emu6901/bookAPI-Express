const express = require('express');
const router = express.Router();

const booksRoutes = require('./books')
router.use('/books', booksRoutes)
const userRouter = require('./users');
router.use('/users', userRouter);

module.exports = router;