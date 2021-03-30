const {Sequelize,DataTypes} = require('sequelize');
const {sequelize} = require('../services/data-connection')

sequelize.define('test',{
    first_name: {
        type: DataTypes.String,
        allowNull: true
    }
})
