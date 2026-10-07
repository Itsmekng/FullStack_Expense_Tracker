const path = require('path');
const forgetEmailForm = require('../view/forgetEmailForm');
const { ForgotPasswordRequest, User } = require('../models');
const { ApiError } = require('@google/genai');
const bcrypt = require('bcrypt');
const sequelize = require('../db_connection/db.js');

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
            throw new ApiError(401,"Invalidate older tokens");
        }

        const template = forgetEmailForm(id);

        return res.status(200).send(template);

    }catch(err){
        next(err);
    }
}

const newpassword = async(req , res , next) => {
    const t = await sequelize.transaction();
    try{

        const { id , new_Password } = req.body;

        const forgetPassword = await ForgotPasswordRequest.findOne({where:{
            id,
            isactive:true
        }},{transaction: t});

        forgetPassword.isactive = false;
        
        const hash = await bcrypt.hash( new_Password , 10);

        await User.update( {password: hash}, {where:{
            id: forgetPassword.UserId
        }},{transaction: t});

        await forgetPassword.save();

        await t.commit();

        res.redirect("http://127.0.0.1:5500/Client/Authenticate/signIn.html")

    }catch(err){
        await t.rollback();
        next(err)
    }
}



module.exports = {
    resetpassword , newpassword
}