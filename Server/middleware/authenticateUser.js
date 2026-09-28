const { compareToken } = require("../models/user");


const authenticateUser = (req , res , next) =>{
    const token = req.get('Authorization');

    const userDetails = compareToken(token);

    req.userId = userDetails.UserId;
    
    next();

}

module.exports = authenticateUser;