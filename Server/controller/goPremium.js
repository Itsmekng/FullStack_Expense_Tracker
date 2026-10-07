const createOrder = require('../services/cashFree.js');
const { v4 } = require('uuid');
const ApiError = require('../utils/ApiError.js');
const PaymentDetails = require('../models/paymentDetails.js');
const { User } = require('../models/user.js');
const Expenses = require('../models/expense.js');
const { Op } = require('sequelize');

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
            throw new ApiError(400,"Payment session is not created");
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
    
            throw new ApiError(303,"Payment will be redirected")
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
            UserId,
            paymentStatus:"Success"
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
        let data = await User.findAll({attributes: [ 'name' ,'totalExpense' ]});

        data = data.map((e) => [ e.name,e.totalExpense ])

        if(!data[0]){
            return res.status(404).json({
                data,
                recordsTotal:0,
                recordsFiltered:0
            })
        }

        return res.status(200).json({
            data,
            recordsTotal:data.length,
            recordsFiltered:data.length
        })

    }catch(err){
        next(err);
    }
}

const getMyExpense = async (req ,res ,next) => {
    try{
        const { length, start , from , to } = req.query;

        let data;
        let recordsTotal;

        if(from || to){
            data = await Expenses.findAll({
                where:{
                    createdAt:{
                        [Op.gte]: `${from} 00:00:00`,
                        [Op.lte]: `${to} 23:59:59`
                    },
                    UserId:req.userId
                },
                attributes:[ 'Amount','Category','Description','createdAt', 'Notes','id' ],
                limit:Number(length),
                offset:Number(start),
                order: [['createdAt', 'DESC']]
            });

            recordsTotal = await Expenses.count({
                where:{
                    UserId:req.userId,
                    createdAt:{
                        [Op.gte]: `${from} 00:00:00`,
                        [Op.lte]: `${to} 23:59:59`
                    }
                }
            });
        }else{
            data = await Expenses.findAll({
                where:{UserId:req.userId},
                attributes:[ 'Amount','Category','Description','createdAt','Notes','id' ],
                limit:Number(length),
                offset:Number(start),
                order: [['createdAt', 'DESC']]
            });

            recordsTotal = await Expenses.count({
                where:{
                    UserId:req.userId,
                }
            });
        }

    
        const result = data.map( expense => [
            expense.createdAt.toLocaleDateString('en-US'),
            expense.Category,
            expense.Description,
            expense.Amount,
            expense.Notes,
            `<button data-id="${expense.id}" onclick="deleteExpense(event)" class="btn btn-outline-danger">Delete</button>`
        ]);
    
        return res.status(200).json({
            data:result,
            recordsTotal:recordsTotal,
            recordsFiltered:recordsTotal
        });
    }catch(err){
        next(err);
    }
}

module.exports = {
    goPremium , paymentSuccess , checkPlan , getAllExpenses , getMyExpense
};