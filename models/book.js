'use strict';
module.exports = (sequelize, DataTypes) => {
  var Book = sequelize.define('Book', {
  id:{
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  title: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: {
        msg:' Title field cannot be empty'
      }
    }
  }, 
  author: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: {
        msg:'Author field cannot be empty'
      }
    }
  },
  genre: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: {
        msg:'Genre field cannot be empty'
      }
    }
  },
  first_published: {
    type: DataTypes.INTEGER
  }
  });
    Book.associate = function(models){
      models.Book.hasMany(models.Loan, {foreignKey:'book_id'});
      //models.Book.hasOne(models.Patron, {foreignKey:'id'})
    }
  return Book;
}