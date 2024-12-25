const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {success, failure} =  require('../utils/message');


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
            const avatarUrl=`https"//ui-avatars.com/api/?background=random&name=${fullname}`;
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