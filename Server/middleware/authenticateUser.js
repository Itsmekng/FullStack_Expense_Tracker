const { compareToken } = require("../models/user");


const authenticateUser = (req , res , next) =>{
    try{

        const token = req.get('Authorization');
        
        const userDetails = compareToken(token);
        
        req.userId = userDetails.UserId;
        
        next();
    }catch(err){
        console.log(err)
    }

}

module.exports = authenticateUser;