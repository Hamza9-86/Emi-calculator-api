const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnect');

const EMI = sequelize.define('EMI', {
  loan_amount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  interest_rate: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  loan_tenure_months: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  emi: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  prepayment_amount: {
    type: DataTypes.DECIMAL,
    defaultValue: null,
  },
  remaining_balance: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
});

sequelize.sync()
  .then(() => console.log('Database & tables created!'))
  .catch(err => console.log('Error syncing database:', err));

module.exports = EMI;
