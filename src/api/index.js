const express = require('express')
const router = express.Router();

router.get('/', function(req,res){
    res.send(res.json({status: 'ok'}))
})

module.exports = router;
