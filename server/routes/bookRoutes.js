const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const upload = require('../middleware/uploadMiddleware');

// @route   GET /api/books
// @desc    Get all books
// @access  Public
router.get('/', async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   GET /api/books/:id
// @desc    Get single book
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   POST /api/books
// @desc    Create a new book
// @access  Public
router.post('/', upload.single('image'), async (req, res) => {
    const { title, author, publishedDate, publisher, description, price, genre } = req.body;
    let image = req.body.image;

    if (req.file) {
        image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    try {
        const newBook = new Book({
            title,
            author,
            publishedDate,
            publisher,
            description,
            price,
            genre,
            image
        });

        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// @route   PUT /api/books/:id
// @desc    Update a book
// @access  Public
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const updates = { ...req.body };
        if (req.file) {
            updates.image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        }

        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true }
        );
        if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
        res.json(updatedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// @route   DELETE /api/books/:id
// @desc    Delete a book
// @access  Public
router.delete('/:id', async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
        res.json({ message: 'Book deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
