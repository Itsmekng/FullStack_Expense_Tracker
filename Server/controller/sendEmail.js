const sendEmail = require("../services/brevo");
const forgetPasswordTemplate = require("../view/forgetEmail.js");
const { v4 } = require("uuid");
const ForgotPasswordRequest = require("../models/forgotPasswordRequests.js");
const { User } = require("../models/user.js");
const ApiError = require("../utils/ApiError.js");
const sequelize = require("../db_connection/db.js");

const forgetPassword = async (req , res , next) => {
    
    const t = await sequelize.transaction();

    try{

        const { userEmail } = req.body;

        const token = v4();

        const user = await User.findOne({
            email: userEmail
        },{transaction: t});

        if(!user){
            throw new ApiError(404,"User not found with this email !!!");
        };

        await ForgotPasswordRequest.create({ id:token , isactive:true , UserId: user.id },{transaction: t});

        const htmlCode = forgetPasswordTemplate(token);

        await sendEmail({ to:userEmail, subject:"Forget Email", html:htmlCode });

        await t.commit();

        res.success(null,"Forget email is sent",200);

    }catch(err){
        await t.rollback();
        next(err);
    }
}

module.exports = {
    forgetPassword
}