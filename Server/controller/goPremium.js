const createOrder = require('../services/cashFree.js');
const { v4 } = require('uuid');
const ApiError = require('../utils/ApiError.js');
const PaymentDetails = require('../models/paymentDetails.js');
const { User } = require('../models/user.js');

const goPremium = async (req , res , next) =>{
    try{
        const { customerNumber } = req.body;
    
        const date = new Date();
        date.setHours(date.getHours() + 1);
        orderExpiry = date.toISOString();
    
        const orderId = v4();
    
        const customerId = req.userId.toString();
        
        const response = await createOrder(30.00,orderId,customerId,customerNumber,orderExpiry);

        if(!response){
            throw new ApiError(500,"Payment session is not created");
        }

        await PaymentDetails.create({Amount:30.00,customerNumber,orderId,paymentStatus:"Pending",UserId:req.userId});

        return res.success({"payment_session_id":response.data.payment_session_id , "order_id": orderId},"Payment session created",201);
        
    }catch(err){
        next(err);
    }
}

const paymentSuccess = async (req , res , next) =>{

    try{
        const { result , orderId } = req.body.paymentData;
    
        if(result.error){
            await PaymentDetails.update({paymentStatus:"Failed"} ,{
                where:{
                    orderId
                }
            })
            throw new ApiError(500,"something went wrong")
        }
    
        if(result.redirect){
            await PaymentDetails.update({paymentStatus:"Failed"} ,{
                where:{
                    orderId
                }
            })
    
            throw new ApiError(500,"Payment will be redirected")
        }
    
        if(result.paymentDetails){
            await PaymentDetails.update({paymentStatus:"Success"} ,{
                where:{
                    orderId
                }
            })
            res.success(null,"Success",200);
        }
    }catch(err){
        next(err);
    }
}

const checkPlan = async(req , res , next) => {

    try{
        const UserId = req.userId;
        
        const premiumPlan = await PaymentDetails.findAll({where:{
            UserId
        }});

        if(!premiumPlan[0]){
            throw new ApiError(404,"User has no premium plan")
        }
        
        return res.success(null,"User has premium plan",200);    

    }catch(err){
        next(err);
    }
}

const getAllExpenses = async (req , res , next) => {
    try{
        const data = await User.findAll({
            attributes:[ 'name' , 'totalExpense' ],
            order: [[ 'totalExpense','DESC']]
        })

        if(!data[0]){
            throw new ApiError(500,"No data found");
        }

        return res.success(data,"All Expense",200);

    }catch(err){
        next(err);
    }
}

module.exports = {
    goPremium , paymentSuccess , checkPlan , getAllExpenses
};