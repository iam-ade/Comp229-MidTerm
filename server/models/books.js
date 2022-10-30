//books.js, Oduneye Adekunle, 300564856, BookStoreApp

let mongoose = require('mongoose');

// create a model class
let Bookmodel = mongoose.Schema({
    name: String,
    price: Number,
    author: String,
    genre: String
},
{
  collection: "books"
});

module.exports = mongoose.model('Book', Bookmodel);
