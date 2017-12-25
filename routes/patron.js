var express = require('express');
var router = express.Router();
const { Sequelize, Loan, Book, Patron } = require('../models');
/* GET users listing. */

  router.get('/', function(req, res, next){
    Patron.findAll().then(function(patron){
    res.render('all_patrons', {patron:patron});
}).catch((err)=>{
  console.log(err);
})
});

router.get('/new_patron', function(req, res, next){
  res.render('new_patron', {patron: Patron.build()}).catch((err)=>{
    console.log(err);
  })
})
router.post('/', function(req, res, next){
  Patron.create(req.body).then(function(patron){
    res.redirect('/patron');
  }).catch((err)=>{
    res.render('new_patron', {patron: Patron.build(), err:err.errors});
  })
})
router.get('/:id', function(req, res, next){
  Patron.findById(req.params.id, {
    include: [{ model: Loan,
     include: [{
       model: Book
     }]
    }]
  }).then(function(patron){
    console.log(patron.Loans.length);
    res.render('show_patron', {patron:patron});
  }).catch((err)=>{
    console.log(err);
  })
});
router.post('/:id', function(req, res, next){
  Patron.findById(req.params.id).then(function(patron){
    console.log(req.body);
    return patron.update(req.body);
  }).then(function(patron){
    res.redirect('/patron');
  }).catch((err)=>{
    Patron.findById(req.params.id, {
      include: [{ model: Loan,
       include: [{
         model: Book
       }]
      }]
  }).then((patron)=>{
    res.render('show_patron', {patron:patron, err:err.errors})
  })
})
})

module.exports = router
