const { Sequelize } = require('sequelize');

const connection = new Sequelize( 'expense_tracker','root','admin' , {
    host:'localhost',
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
