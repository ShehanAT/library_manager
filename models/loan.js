'use strict';
module.exports = (sequelize, DataTypes) => {
  var Loan = sequelize.define('Loan', {
    book_id: {
      type: DataTypes.INTEGER,
    },
    patron_id: DataTypes.INTEGER,
    loaned_on: {
      type: DataTypes.DATE,
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
      type:DataTypes.DATE,
      validate: {
        notEmpty: {
          msg:' Return By field cannot be empty'
        },
        isDate: {
          msg: 'Return By must be a valid date'
        }
      }
    },
    returned_on: DataTypes.DATE
  });
      Loan.associate= function(models) {
        models.Loan.belongsTo(models.Book, {foreignKey:'book_id'});
        models.Loan.belongsTo(models.Patron, {foreignKey:'patron_id'});
      }
  return Loan;
};