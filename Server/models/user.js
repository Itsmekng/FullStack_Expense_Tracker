const { Sequelize , DataTypes } = require('sequelize');
const sequelize = require('../db_connection/db.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = sequelize.define("User" , {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique:true,
        autoIncrement:true,
        primaryKey:true
    },

    email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    totalExpense:{
        type:DataTypes.INTEGER,
        defaultValue:0
    }
})

const createToken = (UserId,UserName) => {
    return jwt.sign({ UserId , UserName }, process.env.JWTTOKEN);
}

const compareToken = (token) => {
   return jwt.verify(token, process.env.JWTTOKEN);
}

module.exports = {User , createToken , compareToken };