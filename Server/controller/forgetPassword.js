const path = require('path');
const forgetEmailForm = require('../view/forgetEmailForm');
const { ForgotPasswordRequest, User } = require('../models');
const { ApiError } = require('@google/genai');
const bcrypt = require('bcrypt');

const resetpassword = async (req, res, next) => {
    try{

        const id = req.params.id;

        const checkActive = await ForgotPasswordRequest.findOne({
            where:{
                id,
                isactive:true
            }
         })

        if(!checkActive){
            throw new ApiError(404,"Invalidate older tokens");
        }

        const template = forgetEmailForm(id);

        res.send(template);

    }catch(err){
        next(err);
    }
}

const newpassword = async(req , res , next) => {
    try{

        const { id , new_Password } = req.body;

        const forgetPassword = await ForgotPasswordRequest.findOne({where:{
            id,
            isactive:true
        }})

        forgetPassword.isactive = false;
        
        const hash = await bcrypt.hash( new_Password , 10);

        await User.update( {password: hash}, {where:{
            id: forgetPassword.UserId
        }})

        await forgetPassword.save();

        res.redirect("http://127.0.0.1:5500/Client/Authenticate/signIn.html")

    }catch(err){
        next(err)
    }
}



module.exports = {
    resetpassword , newpassword
}