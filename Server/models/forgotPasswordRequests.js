const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db_connection/db.js');

const ForgotPasswordRequest = sequelize.define('ForgotPasswordRequest', {
    id:{
        type:DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    isactive:{
        type:DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = ForgotPasswordRequest;