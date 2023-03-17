const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async');  
const Book = require('../models/Book');

// desc - get all books 
// @route - GET /api/v1/books 

exports.getBooks = asyncHandler(async (req,res,next) => {
        const books = await Book.find();
        res.status(200).json({success: true, count: books.length ,data: books});
    
});

// desc - get book by id 
// @route - GET /api/v1/books/:id

exports.getBook = asyncHandler(async (req,res,next) => {
        const book = await Book.findById(req.params.id);
        if(! book){
            return next(new ErrorResponse(`Book not found with the id of ${req.params.id}`, 404));
        }
        res.status(200).json({success: true, data: book});
    
});
// desc - Create a book
// @route - POST /api/v1/books

exports.createBook = asyncHandler(async (req,res,next) => {
        const book = await Book.create(req.body);

        res.status(201).json({
            success: true,
            data: book
      });
    
});
// desc - update a book by id
// @route - PUT /api/v1/books/:id

exports.updateBook = asyncHandler(async (req, res, next) => {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
            runValidators: true
         });
        
        if(!book){
            return next(new ErrorResponse(`Book not found with the id of ${req.params.id}`, 404));
        }
        res.status(200).json({success: true, data: book}); 
});
// desc - Delete a book
// @route - DELETE /api/v1/books

exports.deleteBook = asyncHandler(async (req, res, next) => {
        const book = await Book.findByIdAndDelete(req.params.id);
        
        if(!book){
            return next(new ErrorResponse(`Book not found with the id of ${req.params.id}`, 404));
        }
        res.status(200).json({success: true, data: book});
});