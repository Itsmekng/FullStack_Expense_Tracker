const {User , createToken } = require("../models/user");
const ApiError = require("../utils/ApiError.js");
const bcrypt = require('bcrypt');

// For creating users
const createAccount = async (req , res , next) => {
    try{
        const {name , email , password} = req.body;

        const existingUser = await User.findAll({
            where:{
                email: email
            }
        })

        if(existingUser[0]){
            throw new ApiError(409,"User already exist");
        }

        const hash = await bcrypt.hash( password , 10)

        const user = await User.create({name,email,password:hash});

        return res.success(createToken(user.id , user.name),"User is created",201);

    }catch(err){
        next(err);
    }
}

// user login
const loginAccount = async (req , res , next) =>{
    try{

        const { email , password } = req.body;

        let user = await User.findOne({where:{ email: email }});

        if(!user){
            throw new ApiError(404,"User not found");
        }

        const result = await bcrypt.compare(password , user.password)

        if(result == true){
            return res.success(createToken(user.id , user.name),"login success",200);
        }else{
            return next(new ApiError(401,"User not authorized"));
        }

    }catch(err){
        next(err)
    }
}

module.exports = {
    createAccount, loginAccount
}