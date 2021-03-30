const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User')
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'aviram-secret';
module.exports = new JwtStrategy(opts,  function(jwt_payload, done) {
    return User.findOne({where: {email: jwt_payload.email}}).then((user)=>{
        if (user) {
            return done(null, user);
        }else{
            return done(null,false);
        }
    });

});
