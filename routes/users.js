// const express = require('express');
// const router = express.Router();
// const Book = require('../models/Book')

// router.get('/', async (req, res) => {
//     try {
//         const books = await Book.find();
//         res.json(books);
//     } catch (error) {
//         res.json({ message: error })
//     }
// })

// router.post('/', async (req, res) => {
//     const book = new Book(req.body);
//     try {
//         const savedBook = await book.save();
//         res.status(200).json(savedBook);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// })

// router.get('/:id', async (req, res) => {
//     try {
//         const book = await Book.findById(req.params.id);
//         res.status(200).json(book);
//     } catch (error) {
//         res.status(500).json(error);
//     }

// })

// router.delete('/:id', async (req, res) => {
//     try {
//         const removedBook = await Book.findById(req.params.id);
//         if (removedBook.bookId === req.body.bookId) {
//             await removedBook.deleteOne();
//             res.status(200).json("The book has been deleted");
//         } else {
//             res.status(403).json("You can delete only book");
//         }
//     } catch (error) {
//         res.status(500).json(error);
//     }
// })

// router.patch('/:id', async (req, res) => {
//     try {
//         const updatedBook = await Book.updateOne(
//             { _id: req.params.id },
//             { $set: req.body  }
//         );
//         res.status(200).json("the book has been updated");
//     } catch (error) {
//         res.status(500).json(error);
//     }
// })

// module.exports = router;