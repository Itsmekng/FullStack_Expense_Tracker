const { Sequelize , DataTypes } = require('sequelize');
const sequelize = require('../db_connection/db.js');

const PaymentDetails = sequelize.define("paymentDetails" ,{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    Amount:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    customerNumber:{
        type:DataTypes.STRING,
        allowNull:false
    },
    orderId:{
        type:DataTypes.STRING
    },
    paymentStatus:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

module.exports = PaymentDetails;