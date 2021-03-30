const {Sequelize, Model,DataTypes} = require('sequelize');
const sequelize = require('../services/data-connection');
const bcrypt = require('bcrypt');

const User =  sequelize.define('User', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'User',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__User__3213E83FD2148BC1",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ],

    hooks: {
      beforeSave(instance, options) {
        return User.passwordEncrypt(instance).catch(err=>console.error(err));
      }
    },
  }

  );


User.tester = ()=>{
  console.log("tester");
  console.log(this)
}

/**
 * @this {Model}
 * **/
User.prototype.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err,isMatch)=>{
    if (err) return cb(err);
    cb(null,isMatch);
  })
}

/**
 * @param {Model} user
 * **/
User.passwordEncrypt =   function(user){
  return new Promise((resolve , reject)=>{
    bcrypt.genSalt(10,(err,salt)=>{
      if(err) reject(err);
      bcrypt.hash(user.password, salt,(err, hash)=>{
        if (err) reject(err);
        user.password = hash;
        resolve()
      })
    })
  })
}




module.exports = User;
