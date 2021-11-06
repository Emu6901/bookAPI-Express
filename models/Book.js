const mongoose = require("mongoose");
const BookSchema = mongoose.Schema(
    {
        bookId: {
            type: String,
            required: true,
            unique: true,
        },
        bookName: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        available: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        img: {
            type: String,
            default: "",
        },
        star: {
            type: Number,
            required: true,
        },
        numberOfPages: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            default: "",
        },
    }
);

module.exports = mongoose.model("Book", BookSchema);