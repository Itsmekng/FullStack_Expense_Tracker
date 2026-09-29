const { User } = require('./user.js');
const Expenses = require('./expense.js');
const PaymentDetails = require('./paymentDetails.js');

// One to many relation
User.hasMany(Expenses);
Expenses.belongsTo(User)

// one to one relation
User.hasOne(PaymentDetails);
PaymentDetails.belongsTo(User);

module.exports = {
    User , Expenses , PaymentDetails
}