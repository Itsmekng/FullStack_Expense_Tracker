const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db_connection/db.js');
require('./models')

app.use(express.json());
app.use(cors());

const userRouter = require('./routes/user.js');
const expenseRouter = require('./routes/expense.js')
const responseHandler = require('./middleware/responseHandler.js');
const errorHandler = require('./middleware/errorHandler.js');
const premiumRouter = require('./routes/goPremium.js')

app.use(responseHandler);
app.use("/api/user",userRouter);
app.use('/api/expense',expenseRouter);
app.use('/api/premuim',premiumRouter);
app.use(errorHandler);

db.sync({force: true}).then(() =>{
    const port = 3000;
    app.listen(port , () =>{
        console.log("Server is listen in port:", port)
    });
}).catch((err) =>{
    console.log(err.message)
})
