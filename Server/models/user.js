const { Sequelize , DataTypes } = require('sequelize');
const sequelize = require('../db_connection/db.js');
const jwt = require('jsonwebtoken');

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
    }
})

const createToken = (UserId,UserName) => {
    return jwt.sign({ UserId , UserName }, "64498117-7633-4624-b659-99493381a58d");
}

const compareToken = (token) => {
   return jwt.verify(token, '64498117-7633-4624-b659-99493381a58d');
}

module.exports = {User , createToken , compareToken };