import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { Book } from "../models/book.model";
import { Library } from "../models/library.model";
const jwt = require('jsonwebtoken');

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
    
    getBook(req : Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array())
        }
        const bookId = req.params.bookId;
        Book.findOne({bookId:bookId}).then(bookData => {
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
        })
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
        // const userId = req.params.userId
        console.log("user inside for borrowing")
        const userId = req.body.userId;
        Library.find({userId:userId}).then(booksBorrowed =>{
        if(booksBorrowed.length === 5){
            const error = new Error('You have already borrowed 5 books.');
            throw error;
        }
        const bookId = req.body.bookId;
        const returnDate = req.body.returnDate;
        const borrowNewBook= new Library({
            bookId : bookId,
            userId: userId,
            borrowedDate: new Date(),
            returnDate: returnDate   
        });

        return borrowNewBook.save().then(result => {
            const returnDate = req.body.returnDate;
            Book.findOne({bookId: bookId}).then(book => {
                if(book != null){
                    book.available = false;
                    book.nextAvailableDate = returnDate;
                    book.status = 'borrowed';
                    return book.save();

                }
            })
            res.status(201).json({ message: 'Book borrowed successfully!', Book: result });

        })  
    })
    },

    borrowedBooksData(req : Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array())
        }
        const token = req.header('Authorization');
        const decodedToken = jwt.verify(token?.split(' ')[1], 'somesupersecretsecret');
        const userId = decodedToken['userId'];
        
        console.log("inside", userId);
        Library.find({userId:userId}).then(books => {
            if(!books){
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
        })
    },

    returnBook(req : Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array())
        }
        const userId = req.params.userId;
        const bookId = req.params.bookId;
        console.log("here");
        Book.findOne({bookId:bookId}).then(result=>{
            console.log(result?.id)
            // Book.findById(result?.id).then(res => console.log("res:", res));
            Book.findByIdAndDelete(result?._id).then(() => {
                Library.findOne({bookId : bookId, userId:userId})
                        .then(borrowDetails => Library.findByIdAndDelete(borrowDetails?.id)
                                                .then(() => console.log("successfully deleted")));
                const book =new Book({
                    id: result?.id,
                    bookId : result?.bookId,
                    bookName : result?.bookName, 
                    imagePath : result?.imagePath, 
                    author : result?.author, 
                    gist : result?.gist, 
                    status : 'available', 
                    quantity : result?.quantity, 
                    available : true});
                    
                    return book.save().then(() => {
                    // res.status(201).json({ message: 'Book updated in library!', BookId: result?._id });
                    // this.borrowedBooksData(req, res, next);
                    Library.find({userId:userId}).then(books => {
                        if(!books){
                            const error = new Error('Could not find book details for this id.');
                            res.status(200).json({ message: 'Book details fetched.', bookData: [] });

                        }
                        else{
                        res.status(200).json({ message: 'Book details fetched.', bookData: books });
                        }
                    })
                 })
            
            })
        }).catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
        });
    }
}

export default libraryController;
