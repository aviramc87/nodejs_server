let NODE_ENV = process.env.NODE_ENV || 'dev';
let HOST = process.env.HOST || 'localhost';
let PORT = process.env.PORT || 3000 ;

config = {};

config.server = {
    nodeEnv: NODE_ENV,
    host: HOST,
    port: PORT
}
config.jwt = {
    jwtSecret: 'aviram-secret'
}
module.exports = config;
