const express = require('express');
const router = express.Router();
const Book = require('../models/Book')
const bookController = require('./../controllers/bookController');
const authController = require('./../controllers/authController');

router
    .route('/')
    .get(bookController.getAllBooks)
    .post(
        authController.protect,
        // authController.restrictTo('admin', 'lead-guide'),
        bookController.createBook
    );

router
    .route('/:id')
    .get(bookController.getBook)
    .patch(
        // authController.protect,
        // authController.restrictTo('admin', 'lead-guide'),
        bookController.updateBook
    )
    .delete(
        // authController.protect,
        // authController.restrictTo('admin', 'lead-guide'),
        bookController.deleteBook
    );

module.exports = router;