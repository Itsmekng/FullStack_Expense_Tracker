const User = require("../models/user");
const ApiError = require("../utils/ApiError.js");

const addUser = async (req , res , next) => {

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

module.exports = {
    addUser
}