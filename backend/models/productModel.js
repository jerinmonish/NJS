const Sequelize = require('sequelize');
const db = require('../db/db');

const productModel = db.define('product', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cat_id: {
    type: Sequelize.INTEGER,
  },
  p_name: {
    type: Sequelize.STRING(30),
    unique: {
      args: true,
      msg: 'Product Name already Exists !'
    }
  },
  p_description: {
    type: Sequelize.TEXT
  },
  p_image: {
    type: Sequelize.TEXT
  },
  status: {
    type: Sequelize.STRING(10),
    allowNull: false,
    defaultValue: 'Active',
  },
  price: {
    type: Sequelize.DECIMAL(5, 2)
  },
  no_of_qty: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  created_on: {
    type: Sequelize.DATE,
  },
  updated_on: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  }
}, {
  tableName: 'product',
  timestamps: false
});

module.exports = productModel;