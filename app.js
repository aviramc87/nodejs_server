const config = require('./src/config/config')
const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const methodOverride = require('method-override')
const cors = require('cors')
const app = express()
const {initModels,syncSequelize} = require('./src/services/data')
const sequelize = require('./src/services/data-connection')
const User = require('./src/models/User')
const routes = require('./src/routes/routes')
const passport = require('passport')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(methodOverride())
app.use(cors())

app.use('/api/',routes);

app.use(passport.initialize());
const passportMiddleware = require('./src/middleware/passport')
passport.use(passportMiddleware);
/*
const res = (async ()=> {
    await syncSequelize();
    const models = initModels();
    return  new Promise(async (res,rej) => {
        const user = await models.User.findOne();
        user.comparePassword('pass',(err, isMatch)=>{
            if(err)
            {
                console.log(err);
                rej(user);
            };
            //console.log(`password matched: ${isMatch}`)
            res(user);
        });
    });

})()
res
    .then( (res)=> {
        //console.log(res.password)
    });
//res.then(resss=> console.log(resss))
*/

syncSequelize().then(()=>{
    app.listen(config.server.port,config.server.host,()=>{
        console.log(`app listening on http://${config.server.host}:${config.server.port}`)

    })
});



