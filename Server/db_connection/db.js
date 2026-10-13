require('dotenv').config();
const { Sequelize } = require('sequelize');

const connection = new Sequelize( process.env.DB_NAME,process.env.DB_USER_NAME,process.env.DB_PASSWORD , {
    host:process.env.DB_URL,
    dialect:'mysql'
});

( async() => { 
    try{
        await connection.authenticate();
        console.log("Database is connect !!!")
    }catch(err){
        console.log(err.message);
        process.exit(1);
    }
})()

module.exports = connection;
