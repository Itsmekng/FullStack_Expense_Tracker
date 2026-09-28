const { User } = require('./user.js');
const Expenses = require('./expense.js')

// One to many relation
User.hasMany(Expenses);
Expenses.belongsTo(User)

module.exports = {
    User , Expenses
}