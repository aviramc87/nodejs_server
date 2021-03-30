
const Connection = require('tedious').Connection;
const dbconfig = require('../config/data-connection').database;
const {Sequelize} = require('sequelize');
/*
const connection = new Connection(config);

const dataConnection = () => {
    console.log('data service loaded')

    // Setup event handler when the connection is established.
    connection.on('connect', function(err) {
        if(err) {
            console.log('Error: ', err)
        }
        // If no error, then good to go..
    });

// Initialize the connection.
    connection.connect();
}
*/

const sequelize = new Sequelize(dbconfig.options.database,dbconfig.authentication.options.userName,dbconfig.authentication.options.password,{
    host: dbconfig.server,
    dialect: 'mssql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    dialectOptions: {
        encrypt: true
    }
});




module.exports = sequelize;
