const Sequelize = require('sequelize');
const db = require('../db/db');

const cartModel = db.define('product_cart', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  uid: {
    type: Sequelize.INTEGER,
  },
  pid: {
    type: Sequelize.INTEGER,
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
  amount: {
    type: Sequelize.DECIMAL(5, 2),
  },
  indi_amount: {
    type: Sequelize.DECIMAL(5, 2),
  },
  cart_added_at: {
    type: Sequelize.DATE,
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'InCart',
  },
  payment_method: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  updated_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  }
}, {
  // Other model options go here
  tableName: 'product_cart',
  timestamps: false,
});

module.exports = cartModel;