const User = require("../models/user");

const addUser = async (req , res) => {

    try{
        const {name , email , password} = req.body;

        const existingUser = await User.findAll({
            where:{
                email: email
            }
        })
        console.log(existingUser);
        if(existingUser[0]){
            res.status(409).json({
                error:"User is already Existed",
                status:false
            })
        }

        await User.create({name,email,password});
        
        res.status(201).json({
            message:"User is created",
            status:true
        })
    }catch(err){
        res.status(500).json({
            error:err.message,
            status:false
        })
    }
}

module.exports = {
    addUser
}