const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const db = require('./db_connection/db.js');
require('dotenv').config();
require('./models');


app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

const userRouter = require('./routes/user.js');
const expenseRouter = require('./routes/expense.js');
const responseHandler = require('./middleware/responseHandler.js');
const errorHandler = require('./middleware/errorHandler.js');
const premiumRouter = require('./routes/goPremium.js');
const sendEmailROuter = require('./routes/sendEmail.js');
const passwordRouter = require('./routes/forgotPassword.js');

app.use(responseHandler);
app.use("/api/user",userRouter);
app.use('/api/expense',expenseRouter);
app.use('/api/premuim',premiumRouter);
app.use('/api/sendemail',sendEmailROuter);
app.use('/api/password' ,passwordRouter);
app.use(errorHandler);

db.sync().then(() =>{
    app.listen(process.env.PORT , () =>{
        console.log("Server is listen in port:", process.env.PORT)
    });
}).catch((err) =>{
    console.log(err.message)
})
