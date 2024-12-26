const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {success, failure} =  require('../utils/message');
const moment = require("moment");
const randomIntGenerator = require("../utils/generate-random-int");


exports.register_new_user = async (req, res) => {
    try{
        const checkUser= await User.findOne({email: req.body.email});
        if(checkUser){
           res.json(failure("User Already Exists"));
        }
        else{
            const fullname = req.body.fullname;
            const email = req.body.email;
            const password = req.body.password;
            const salt = await bcrypt.genSalt(10);
            const hash= await bcrypt.hash(password, salt);
            const avatarUrl=`https://ui-avatars.com/api/?background=random&name=${fullname}`;
            const newUser = new User({
                fullname: fullname,
                email: email,
                password: hash,
                profile: avatarUrl
            });
            await newUser.save();
            res.json(success("User Registered Successfully"));
            
        }
    }
    catch(err){
        console.log(err);

        res.json(failure("Something went wrong"));
    }
    res.end();


};

exports.login_user = async (req, res) => { 
    try{
        const user = await User.findOne({email: req.body.email});
        if(user){
            const validPass = await bcrypt.compare(req.body.password, user.password);
            if(validPass){
                const accessToken = jwt.sign({_id: user._id}, process.env.TOKEN_KEY);
                res.json({message:"Login Successful", data:user, success:true, accessToken: accessToken});
            }
            else{
                res.json(failure("Invalid Email or Password"));
            }
        }
        else{
            res.json(failure("Invalid Email or Password"));
        }
    }   
    catch(err){
        console.log(err);
        res.json(failure("Something went wrong"));
    }
    res.end();
}   

exports.get_user_profile = async (req, res) => {
    try{
        const user = await User.findById(req.user._id).select("resetCode");  //already verified user
        if(user){
            res.json(success("User Fetched", user));
        }
        else{
            res.json(failure("User Not Found"));
        }
    }
    catch(err){
        console.log(err);
        res.json(failure("Something went wrong"));
    }
    res.end();
}
