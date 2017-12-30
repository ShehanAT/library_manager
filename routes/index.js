const express = require('express');
const router = express.Router();
const Book = require('../models').Book;
const Patron = require('../models').Patron;
const Loan = require('../models').Loan;
const db = require('../models/index.js');
const moment = require('moment');
const today = moment(new Date()).format('YYYY-MM-DD');
/* GET home page. */
router.get('/', (req, res, next)=>
  res.render('home_page')
)
router.get('/book', function(req, res, next) {
  Book.findAll().then(function(book){

    res.render('index', {book:book});
  })
});
router.get('/book/new_book', function(req, res, next){
  res.render('new_book.jade',{book: Book.build()});
});
router.get('/book/overdue_book', (req, res, next)=> {
  Book.findAll({include: [{ 
    model: Loan,
    where: {
      returned_on:null,
      return_by:{
        $lt: Date.now()
      }
    }
  }]}).then((book)=>{
    console.log(book.length);
    res.render('overdue_book', {book:book});
  }).catch((err)=>{
    console.log(err);
  })
});
router.get('/book/checked_out', (req, res, next)=>{
  Book.findAll({include: [{ 
    model: Loan,
    where: {
      returned_on:null
    }
  }]}).then((book)=>{
    console.log(book.length);
    res.render('checked_out', {book:book});
  }).catch((err)=>{
    console.log(err);
  })
})
router.post('/', function(req, res, next){
  Book.create(req.body).then(function(book){
    res.redirect('/book');
  }).catch((err)=>{
    console.log(err.errors[0].message);
    res.render('new_book', {book: Book.build(), err:err.errors});
  })
  });

router.get('/book/:id', function(req, res, next){
  Book.findById(req.params.id, 
    {include: [{ model: Loan, include:[{ model: Patron }] }]}).then(function(book){
    res.render('show_book', {book:book, moment:moment});
  }).catch((err)=>{
    console.log(err);
  })
});
router.post('/book/:id', function(req, res, next){
  Book.findById(req.params.id).then(function(book){
    console.log(req.body);
    return book.update(req.body);
  }).then(function(book){
    res.redirect('/book');
  }).catch((err)=>{
    Book.findById(req.params.id, 
      {include: [{ model: Loan, include:[{ model: Patron }] }]}).then(function(book){
      res.render('show_book', {book:book, err:err.errors});
  })
})
})
router.get('/book/return/:id', (req, res, next)=>{
  Loan.findAll({where: {id: req.params.id}, include: [{ model: Patron}, {model: Book}]})
  .then(loans => {
    res.render('return_book', { loan:loans[0], today, moment:moment});

  })
  .catch(err => {
    console.log(err);
    response.sendStatus(500);
  });
})
router.post('/book/return/:id', (req, res ,next)=>{
  if(req.body.returned_on && req.body.returned_on.match(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/) && req.body.returned_on >= today){
    Book.findById(req.params.id, {include: [{ model: Loan}]}).then(function(book){
      console.log(req.params.id);
      Loan.update(req.body, {
        where: [{
          id: req.params.id
        }]
      })
      return book;
    }).then(function(book){
      res.redirect('/book');
    }).catch((err)=>{
      console.log(err);
    })
  }else{
    Book.findById(req.params.id,
      {include: [{ model: Loan, include:[{ model: Patron }] }]})
    .then(function(book){
      var err = 'Please enter a valid return date';
      res.render('return_book',{book:book, today: today, moment:moment, err:err});
    }).catch((err)=>{
      console.log(err);
    })
  }
  
})

module.exports = router;
