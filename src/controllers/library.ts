import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { Book } from "../models/book.model";
import { Library } from "../models/library.model";

const libraryController = {
    postBooks(req : Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array())
        }
        const bookId = req.body.bookId;
        const bookName = req.body.bookName;
        const imagePath = req.body.imagePath;
        const author = req.body.author;
        const gist = req.body.gist;
        const status = req.body.status;
        const quantity = req.body.quantity;
        const available = req.body.available;

        Book.findOne({bookId:bookId}).then(bookExists => {
            if(bookExists){
                const error = new Error('This book has already been added to the library');
                throw error;
            }
            const newBook = new Book({
                bookId : bookId,
                bookName: bookName,
                imagePath: imagePath,
                author: author,
                gist: gist,
                status: status,
                quantity: quantity,
                available: available
            });

            if(!available){
                newBook.nextAvailableDate = req.body.nextAvailableDate;
            }

            return newBook.save().then(result => {
                res.status(201).json({ message: 'Book added to library!', BookId: result._id });
            })
        })
        .catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
        });
    },
    
    getBooks(req : Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array())
        }
        // const bookId = req.params.bookId;
        Book.find().then(bookData => {
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
        })
    },

    borrowBook(req : Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array())
        }
        const userId = req.params.userId
        Library.find({userId:userId}).then(booksBorrowed =>{
        if(booksBorrowed.length === 5){
            const error = new Error('You have already borrowed 5 books.');
            throw error;
        }
        const bookId = req.body.bookId;
        const userId = req.body.userId;
        const returnDate = req.body.returnDate;
        const borrowNewBook= new Library({
            bookId : bookId,
            userId: userId,
            borrowedDate: new Date(),
            returnDate: returnDate   
        });

        return borrowNewBook.save().then(result => {
            res.status(201).json({ message: 'Book borrowed successfully!', Book: result });
        })  
    })
    }
}

export default libraryController;
