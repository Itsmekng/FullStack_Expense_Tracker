const sendEmail = require("../services/brevo");

const forgetPassword = async (req , res , next) => {
    try{

        const { userEmail } = req.body;

        const htmlCode = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                <div>This email is to forget password of your expense tracker app</div>
            </body>
            </html>
        `

        await sendEmail({ to:userEmail, subject:"Forget Email", html:htmlCode });

        res.success(null,"Forget email is sent",200);

    }catch(err){
        next(err);
    }
}

module.exports = {
    forgetPassword
}