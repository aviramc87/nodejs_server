const express = require('express')
const router = express.Router();
const userCtrl = require('../controller/user-controller');
const passport = require('passport')

router.get('/', passport.authenticate('jwt', { session: false }),function(req,res){
    res.send(res.json({status: 'ok'}))
})
router.post('/register', userCtrl.registerUser);
router.post('/login', userCtrl.loginUser);


router.post('/profile', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        res.json({msg: `Hey ${req.user.email}`});
    }
);
module.exports = router;

