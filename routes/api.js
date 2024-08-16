/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

let books = [];

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      const bookList = books.map(book => ({
        _id: book._id,
        title: book.title,
        commentcount: book.comments.length
      }));
      res.json(bookList);
    })
    
    .post(function (req, res){
      let title = req.body.title;
      //response will contain new book object including atleast _id and title
      if (!title) {
        return res.send('missing required field title');
      }
      const newBook = {
        _id: `${Date.now()}`, // simple unique ID using timestamp
        title: title,
        comments: []
      };
      books.push(newBook);
      res.json({ _id: newBook._id, title: newBook.title });
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
      books = [];
      res.send('complete delete successful');
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      const book = books.find(b => b._id === bookid);
      if (!book) {
        return res.send('no book exists');
      }
      res.json({ _id: book._id, title: book.title, comments: book.comments });
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
      if (!comment) {
        return res.send('missing required field comment');
      }
      const book = books.find(b => b._id === bookid);
      if (!book) {
        return res.send('no book exists');
      }
      book.comments.push(comment);
      res.json({ _id: book._id, title: book.title, comments: book.comments });
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      const index = books.findIndex(b => b._id === bookid);
      if (index === -1) {
        return res.send('no book exists');
      }
      books.splice(index, 1);
      res.send('delete successful');
    });
  
};
