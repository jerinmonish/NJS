const Sequelize = require('sequelize');
const db = require('../db/db');

const productPurchasedModel = db.define('product_purchased', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  c_id: {
    type: Sequelize.INTEGER,
  },
  p_id: {
    type: Sequelize.INTEGER,
  },
  u_id: {
    type: Sequelize.INTEGER,
  },
  booking_id: {
    type: Sequelize.STRING,
  },
  created_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  }
}, {
  // Other model options go here
  tableName: 'product_purchased',
  timestamps: false,
});

module.exports = productPurchasedModel;