const { Sequelize , DataTypes } = require('sequelize');
const sequelize  =require('../db_connection/db.js');

const Expenses = sequelize.define("Expenses" , {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    Amount:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    Description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Category:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Notes:{
        type:DataTypes.STRING
    }
});

module.exports = Expenses;