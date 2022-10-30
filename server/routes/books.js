// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find((err, books) => {
    if (err) 
    {
      return console.error(err);
    }
    else 
    {
      res.render('books/index', {title: 'Books', Books: books});
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/details', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     res.render('books/details', {title: 'Add Book'})

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/details', (req, res, next) => {

    /*****************
     * ADDED CODE HERE *
     *****************/
     let newBook = book({
      "name": req.body.name,
      "price": req.body.price,
      "author": req.body.author,
      "genre": req.body.genre,
  });

  book.create(newBook, (err, Book) =>{
    if(err)
    {
        console.log(err);
        res.end(err);
    }
    else
    {
        // refresh the book list
        res.redirect('/books');
    }
  })
});

// GET the Book Details page in order to edit an existing Book
router.get('/edit/:id', (req, res, next) => {

    /*****************
     * ADDED CODE HERE *
     *****************/
     let id = req.params.id;

     book.findById(id, (err, bookToEdit) =>{
         if(err)
         {
             console.log(err);
             res.end(err);
         }
         else
         {
             // show the edit view
             res.render('books/edit', {title: 'Edit Book', books: bookToEdit})
         }
     }); 

});

// POST - process the information passed from the details form and update the document
router.post('/edit/:id', (req, res, next) => {


    /*****************
     * ADDED CODE HERE *
     *****************/
     let id = req.params.id

     let updatedBook = book({
      "_id": id,
      "name": req.body.name,
      "price": req.body.price,
      "author": req.body.author,
      "genre": req.body.genre
      // "price": req.body.price
     });
 
     book.updateOne({_id: id}, updatedBook, (err) => {
         if(err)
         {
             console.log(err);
             res.end(err);
         }
         else
         {
             // refresh the book list
             res.redirect('/books');
         }
     })

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
    /*****************
     * ADDED CODE HERE *
     *****************/
     let id = req.params.id;

     book.remove({_id: id}, (err) => {
         if(err)
         {
             console.log(err);
             res.end(err);
         }
         else
         {
             // refresh the book list
             res.redirect('/books');
         }
 
     });

});
//books.js, Oduneye Adekunle, 300564856, BookStoreApp

module.exports = router;
