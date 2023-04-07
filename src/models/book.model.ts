import mongoose, { Date } from "mongoose";

interface BookAttrs {
    bookId : string,
    bookName: string,
    imagePath: string,
    author: string,
    gist: string,
    status: string,
    quantity: number,
    available: boolean,
    nextAvailableDate: Date
}


interface BookDoc extends mongoose.Document {
    bookId : string,
    bookName: string,
    imagePath: string,
    author: string,
    gist: string,
    status: string,
    quantity: number,
    available: boolean,
    nextAvailableDate: Date
}

const BookSchema = new mongoose.Schema({
    bookId :{ type : String,
              required: true
    },
    bookName: { type : String,
        required: true
},
    imagePath: { type : String,
        required: true
},
    author: { type : String,
        required: true
},
    gist: { type : String,
        required: true
},
    status: { type : String,
        required: true
},
    quantity: { type : Number,
        required: true
},
    available: { type : Boolean,
        required: true
},
    nextAvailableDate: { type : Date}
});

const Book = mongoose.model<BookDoc>('Book', BookSchema);

export {Book};
