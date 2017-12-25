var express = require('express');
var router = express.Router();
const { Sequelize, Loan, Book, Patron } = require('../models');
const moment = require('moment');
const today = new Date();
const sevenDays = moment(today.setDate(today.getDate() + 7)).format('YYYY-MM-DD');
const currentDate = moment(new Date()).format('YYYY-MM-DD');
/* GET users listing. */
router.get('/', function(req, res, next){
  Loan.findAll({
    include: [{ model: Book}, {model: Patron}]
  }).then(function(loan){
    res.render('all_loans', {loan: loan});
  });
})
router.get('/new_loan', function(req, res, next){
  Book.findAll({
    include: [{ model: Loan}]
  }).then((loan) => {
    return loan;
    })
    .then((loan)=>{
      Patron.findAll().then((patron)=> {
        res.render('new_loan', {loan:loan, patron:patron, currentDate, sevenDays});
      })
      
    });
})
router.get('/overdue_loan', (req, res, next)=>{
  Loan.findAll({where: {
    returned_on:null,
    return_by:{
      $lt: Date.now()
    }},
    include: [{ model: Book}, {model: Patron}]
  }).then((loan)=>{
    res.render('overdue_loan', {loan:loan})
  }).catch((err)=>{
    console.log(err);
  })
})
router.get('/checkedout_loan', (req, res, next)=>{
  Loan.findAll({where: {
    returned_on:null
  },
  include: [{ model: Book}, {model: Patron}]
}).then((loan)=>{
  res.render('checkedout_loan', {loan:loan})
}).catch((err)=>{
  console.log(err);
})
});

router.post('/', function(req, res, next){
  Loan.create(req.body).then(function(){
    res.redirect("/loan");
  }).catch((err)=>{
    console.log(err);
    Book.findAll({
      include: [{ model: Loan}]
    }).then((loan) => {
      return loan;
      })
      .then((loan)=>{
        Patron.findAll().then((patron)=> {
          res.render('new_loan', {loan:loan, patron:patron, currentDate, sevenDays, err:err.errors});
        })
  })
});
});


  

module.exports = router;
