
const Connection = require('tedious').Connection;
const config = require('../config/data-connection').database;

const connection = new Connection(config);

function dataConnection(){
    console.log('data service loaded')

    // Setup event handler when the connection is established.
    connection.on('connect', function(err) {
        if(err) {
            console.log('Error: ', err)
        }
        // If no error, then good to go...
        executeStatement();
    });

// Initialize the connection.
    connection.connect();
}
module.exports = dataConnection;
