const Sequelize = require('sequelize');
const db = require('../db/db');

const cardModel = db.define('card', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  name_on_card: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  card_number: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  expiration_month: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  expiration_year: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  brand: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  stripe_card_id: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  stripe_fingerprint: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  stripe_customer_id: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  cvc_check: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  mobile_no: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  created_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  }
}, {
  // Other model options go here
  tableName: 'card',
  timestamps: false,
});

module.exports = cardModel;