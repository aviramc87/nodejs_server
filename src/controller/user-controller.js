const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/init-models').initModels().User;

exports.registerUser = async (req,res)=>{
    if(!req.body.email || !req.body.password){
        return res.status(400).json({msg: 'You need to send email and password'})
    }
    await User.findOne({where:{email: req.body.email}}).then(async (user)=>{
        if(user){
            return res.status(400).json({'msg': "The user allredy exists"});
        }else{
            try {
                //const newUser = await User.create({firstName: 'first', lastName: 'last',email: req.body.email , password: req.body.password});
                const newUser = await User.create(req.body);
                console.log(`new user created: ${newUser.email}`);
                return res.status(201).json(newUser);

            }catch (err){
                return res.status(400).json({msg: err});
            }
        }
    }).catch(err=>{
        return res.status(400).json({msg: err});
    })
};
exports.loginUser = (req,res)=>{
    if(!req.body.email || !req.body.password){
        return res.status(400).json({msg: 'You need to send email and password'})
    }
    User.findOne({where: {email: req.body.email}}).then(async (user)=>{
        if(!user){
            return res.status(400).json({'msg': "The user not exists"});
        }else{
            user.comparePassword(req.body.password,(err,isMatch)=>{
                if(err) return res.status(400).json({msg: err});
                if(isMatch)
                    return res.status(200)
                        .json({token: createToken(req.body)});
                else
                    return res.status(400).json({msg: 'The email and password don\'t match'});

            })
        }
    }).catch(err=>{
        return res.status(400).json({msg: err});
    })
};

function createToken(data){
    return jwt.sign({id: data.id, email: data.email},config.jwt.jwtSecret,{
        expiresIn: 300
    })
}
