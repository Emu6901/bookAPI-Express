const mongoose = require("mongoose");
const BookSchema = mongoose.Schema(
    {
        bookId: {
            type: String,
            required: true,
        },
        bookName: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        copyrightYear: {
            type: Date,
            default: new Date().toISOString().slice(0, 10),
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
    },
    { timestamps: true }
);

module.exports = mongoose.model("Book", BookSchema);