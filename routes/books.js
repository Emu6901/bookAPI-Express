const express = require('express');
const router = express.Router();
const Book = require('../models/Book')

router.get('/', async (req, res) => {
    try {
        //Filtering
        const queryObj = { ...req.query };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(e => delete queryObj[e]);
        //Advanced filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        let query = Book.find(JSON.parse(queryStr));
        //Field limiting
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            console.log(fields);
            query = query.select(fields);
        }
        else {
            query = query.select('-__v');
        }
        //Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        }
        else {
            query = query.sort('-createdAt')
        }
        //Pagination
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 100;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);

        if (req.query.page) {
            const numBooks = await Book.countDocuments();
            if (skip >= numBooks) throw new Error('This page does not exist.');
        }
        //Execute the query
        const books = await query;
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.post('/', async (req, res) => {
    const book = new Book(req.body);
    try {
        const savedBook = await book.save();
        res.status(200).json(savedBook);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json(error);
    }

})

router.delete('/:id', async (req, res) => {
    try {
        const removedBook = await Book.findById(req.params.id);
        if (removedBook.bookId === req.body.bookId) {
            await removedBook.deleteOne();
            res.status(200).json("The book has been deleted");
        } else {
            res.status(403).json("You can delete only book");
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const updatedBook = await Book.updateOne(
            { _id: req.params.id },
            { $set: req.body }
        );
        res.status(200).json("the book has been updated");
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;