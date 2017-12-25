'use strict';
module.exports = (sequelize, DataTypes) => {
  var Patron = sequelize.define('Patron', {
  id:{
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg:' First Name field cannot be empty'
      }
    }
  }, 
  last_name: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: {
        msg:' Last Name field cannot be empty'
      }
    }
  },
  address: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: {
        msg:' Address field cannot be empty'
      }
    }
  },
  email: {
    type: DataTypes.INTEGER,
    validate: {
      notEmpty: {
        msg:' Email field cannot be empty'
      }
    }
  },
  library_id: {
    type: DataTypes.INTEGER,
    validate: {
      notEmpty: {
        msg:' Library Id  field cannot be empty'
      }
    }
  },
  zip_code: {
    type: DataTypes.INTEGER,
    validate: {
      notEmpty: {
        msg:'Zip Code field cannot be empty'
      }
    }
  }
});
      Patron.associate= function(models) {
        models.Patron.hasMany(models.Loan, {foreignKey:'patron_id'});
        models.Patron.hasOne(models.Book, {foreignKey:'id'})
        
        //models.Patron.belongsTo(models.Book, {foreignKey:'patron_id'});
      }
  return Patron;
};