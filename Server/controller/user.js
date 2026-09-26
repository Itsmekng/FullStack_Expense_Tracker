const User = require("../models/user");
const ApiError = require("../utils/ApiError.js");

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

        await User.create({name,email,password});
        
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

        if(!(user.password == password)){
            throw new ApiError(401,"User not authorized");
        }

        res.success(null,"login success",200);

    }catch(err){
        next(err)
    }
}

module.exports = {
    createAccount, loginAccount
}