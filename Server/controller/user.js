const User = require("../models/user");
const ApiError = require("../utils/ApiError.js");
const bcrypt = require('bcrypt')

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

        bcrypt.hash( password , 10, async function (err , hash){

            if(err){
                return next(new ApiError(500,err.message));
            }

            await User.create({name,email,password:hash});
        });

        return res.success(null,"User is created",201);

    }catch(err){
        next(err);
    }
}

const loginAccount = async (req , res , next) =>{
    try{

        const { email , password } = req.body;

        let user = await User.findOne({where:{ email: email }});

        if(!user){
            throw new ApiError(404,"User not found");
        }

        bcrypt.compare(password , user.password , function (err , result){
            if(err){
                return next(new ApiError(500,err.message));
            }

            if(result == true){
                return res.success(null,"login success",200);
            }else{
                return next(new ApiError(401,"User not authorized"));
            }
        })

    }catch(err){
        next(err)
    }
}

module.exports = {
    createAccount, loginAccount
}