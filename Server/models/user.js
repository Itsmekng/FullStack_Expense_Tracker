const { Sequelize , DataTypes } = require('sequelize');
const sequelize = require('../db_connection/db.js');

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

module.exports = User;