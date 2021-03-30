const {DataTypes, Sequelize} = require("sequelize");
const _User = require("../models/User");
const dbconfig = require('../config/data-connection').database;
const User = require('../models/User')
const sequelize = require('../services/data-connection')

const syncSequelize = async ()=>{
    const models = initModels();
    await sequelize.sync();
    //const user = await models.User.create({firstName: 'aviram', lastName: 'cohen',email:'aaa@aaa', password: 'pass'});
    //user.testerproto();
    //console.log(`${user.firstName} ${user.lastName}`);
}


const initModels = ()=> {
    const User = _User;

    return {
        User
    };
}

module.exports = {syncSequelize, initModels};
