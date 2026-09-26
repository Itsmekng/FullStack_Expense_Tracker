const { Expenses } = require("../models");
const ApiError = require("../utils/ApiError");

const addExpense = async( req , res , next) => {
    try{
        const {Amount , Description , Category} = req.body;

        const expense = await Expenses.create({Amount,Description,Category})

        if(!expense){
            throw new ApiError(500,"Expense not add")
        }

        return res.success(expense,"Expense is added",201);

    }catch(err){
        next(err)
    }
}

const deleteExpense = async (req , res , next) => {
    try{

        const id = req.params.id;

        const expense = await Expenses.destroy({where:{
            id
        }});

        if(!expense){
            throw new ApiError(404,"Expense not found");
        }

        return res.success(null,"Expense is deleted",200);

    }catch(err){
        next(err)
    }
}

const getAllExpense = async(req , res , next) => {
    try{

        const expense = await Expenses.findAll();

        if(!expense[0]){
            throw new ApiError(404,"Expense not found");
        }

        return res.success(expense,"All Expense List",200);

    }catch(err){
        next(err)
    }
}

module.exports = {
    addExpense , deleteExpense , getAllExpense
}