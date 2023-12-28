"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const book_model_1 = require("../models/book.model");
const library_model_1 = require("../models/library.model");
const jwt = require('jsonwebtoken');
const libraryController = {
    postBooks(req, res, next) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
        }
        const bookId = req.body.bookId;
        const bookName = req.body.bookName;
        const imagePath = req.body.imagePath;
        const author = req.body.author;
        const gist = req.body.gist;
        const status = req.body.status;
        const quantity = req.body.quantity;
        const available = req.body.available;
        book_model_1.Book.findOne({ bookId: bookId }).then(bookExists => {
            if (bookExists) {
                const error = new Error('This book has already been added to the library');
                throw error;
            }
            const newBook = new book_model_1.Book({
                bookId: bookId,
                bookName: bookName,
                imagePath: imagePath,
                author: author,
                gist: gist,
                status: status,
                quantity: quantity,
                available: available
            });
            if (!available) {
                newBook.nextAvailableDate = req.body.nextAvailableDate;
            }
            return newBook.save().then(result => {
                res.status(201).json({ message: 'Book added to library!', BookId: result._id });
            });
        })
            .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    },
    getBook(req, res, next) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
        }
        const bookId = req.params.bookId;
        book_model_1.Book.findOne({ bookId: bookId }).then(bookData => {
            if (!bookData) {
                const error = new Error('Could not find book details for this id.');
                // error.statusCode = 404;
                throw error;
            }
            //   console.log(bookData, "yyyyy")
            res.status(200).json({ message: 'Book details fetched.', bookData: bookData });
        })
            .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    },
    getBooks(req, res, next) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
        }
        // const bookId = req.params.bookId;
        book_model_1.Book.find().then(bookData => {
            if (!bookData) {
                const error = new Error('Could not find book details for this id.');
                // error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ message: 'Book details fetched.', bookData: bookData });
        })
            .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    },
    borrowBook(req, res, next) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
        }
        // const userId = req.params.userId
        console.log("user inside for borrowing");
        const userId = req.body.userId;
        library_model_1.Library.find({ userId: userId }).then(booksBorrowed => {
            if (booksBorrowed.length === 5) {
                const error = new Error('You have already borrowed 5 books.');
                throw error;
            }
            const bookId = req.body.bookId;
            const returnDate = req.body.returnDate;
            const borrowNewBook = new library_model_1.Library({
                bookId: bookId,
                userId: userId,
                borrowedDate: new Date(),
                returnDate: returnDate
            });
            return borrowNewBook.save().then(result => {
                const returnDate = req.body.returnDate;
                book_model_1.Book.findOne({ bookId: bookId }).then(book => {
                    if (book != null) {
                        book.available = false;
                        book.nextAvailableDate = returnDate;
                        book.status = 'borrowed';
                        return book.save();
                    }
                });
                res.status(201).json({ message: 'Book borrowed successfully!', Book: result });
            });
        });
    },
    borrowedBooksData(req, res, next) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
        }
        const token = req.header('Authorization');
        const decodedToken = jwt.verify(token === null || token === void 0 ? void 0 : token.split(' ')[1], 'somesupersecretsecret');
        const userId = decodedToken['userId'];
        console.log("inside", userId);
        library_model_1.Library.find({ userId: userId }).then(books => {
            if (!books) {
                const error = new Error('Could not find book details for this id.');
            }
            // console.log(books)
            res.status(200).json({ message: 'Book details fetched.', bookData: books });
        }).catch(err => {
            res.status(200).json({ message: 'Book details fetched.', bookData: [] });
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    },
    returnBook(req, res, next) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
        }
        const userId = req.params.userId;
        const bookId = req.params.bookId;
        console.log("here");
        book_model_1.Book.findOne({ bookId: bookId }).then(result => {
            console.log(result === null || result === void 0 ? void 0 : result.id);
            // Book.findById(result?.id).then(res => console.log("res:", res));
            book_model_1.Book.findByIdAndDelete(result === null || result === void 0 ? void 0 : result._id).then(() => {
                library_model_1.Library.findOne({ bookId: bookId, userId: userId })
                    .then(borrowDetails => library_model_1.Library.findByIdAndDelete(borrowDetails === null || borrowDetails === void 0 ? void 0 : borrowDetails.id)
                    .then(() => console.log("successfully deleted")));
                const book = new book_model_1.Book({
                    id: result === null || result === void 0 ? void 0 : result.id,
                    bookId: result === null || result === void 0 ? void 0 : result.bookId,
                    bookName: result === null || result === void 0 ? void 0 : result.bookName,
                    imagePath: result === null || result === void 0 ? void 0 : result.imagePath,
                    author: result === null || result === void 0 ? void 0 : result.author,
                    gist: result === null || result === void 0 ? void 0 : result.gist,
                    status: 'available',
                    quantity: result === null || result === void 0 ? void 0 : result.quantity,
                    available: true
                });
                return book.save().then(() => {
                    // res.status(201).json({ message: 'Book updated in library!', BookId: result?._id });
                    // this.borrowedBooksData(req, res, next);
                    library_model_1.Library.find({ userId: userId }).then(books => {
                        if (!books) {
                            const error = new Error('Could not find book details for this id.');
                            res.status(200).json({ message: 'Book details fetched.', bookData: [] });
                        }
                        else {
                            res.status(200).json({ message: 'Book details fetched.', bookData: books });
                        }
                    });
                });
            });
        }).catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    }
};
exports.default = libraryController;
