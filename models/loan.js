'use strict';
module.exports = (sequelize, DataTypes) => {
  var Loan = sequelize.define('Loan', {
    book_id: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'A book id is required.'
        }
      }
    },
    patron_id: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'A patron id is required.'
        }
      }
    },
    loaned_on: {
      type: DataTypes.DATEONLY,
      validate: {
        notEmpty: {
          msg:' Loaned On field cannot be empty'
        },
        isDate: {
          msg: 'Loaned On must be a valid date'
        }
      }
    },
    return_by: {
      type:DataTypes.DATEONLY,
      validate: {// validating form submission dates
        notEmpty: {
          msg:' Return By field cannot be empty'//hello world 
        },
        isDate: {
          msg: 'Return By must be a valid date'
        },
        isAfter: {
          args: Date('now'),
          msg: 'Return By Date Has to be after today'
        }
      }
    },
    returned_on: DataTypes.DATEONLY
  });
      Loan.associate= function(models) {
        models.Loan.belongsTo(models.Book, {foreignKey:'book_id'});
        models.Loan.belongsTo(models.Patron, {foreignKey:'patron_id'});
      }
  return Loan;
};