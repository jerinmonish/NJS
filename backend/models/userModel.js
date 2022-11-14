const Sequelize = require('sequelize');
const db = require('../db/db');

const userModel = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  first_name: {
    type: Sequelize.STRING(20),
  },
  last_name: {
    type: Sequelize.STRING(20),
  },
  email: {
    type: Sequelize.STRING(150),
    unique: {
      args: true,
      msg: 'Email already Exists !'
    }
  },
  password: {
    type: Sequelize.STRING(500),
  },
  user_role: {
    type: Sequelize.STRING(10),
    defaultValue: 'USER',
  },
  profile_pic: {
    type: Sequelize.STRING(70),
    allowNull: true,
  },
  mobile: {
    type: Sequelize.STRING(30),
    allowNull: true,
  },
  address: {
    type: Sequelize.STRING(1000),
    allowNull: true,
  },
  location: {
    type: Sequelize.STRING(500),
    allowNull: true,
  },
  country: {
    type: Sequelize.INTEGER(),
    allowNull: true,
  },
  city: {
    type: Sequelize.INTEGER(),
    allowNull: true,
  },
  state: {
    type: Sequelize.INTEGER(),
    allowNull: true,
  },
  pincode: {
    type: Sequelize.INTEGER(),
    allowNull: true,
  },
  status: {
    type: Sequelize.STRING(10),
    allowNull: false,
    defaultValue: 'Active',
  },
  wishlist: {
    type: Sequelize.TEXT(),
    allowNull: true,
  },
  created_on: {
    type: Sequelize.DATE,
  },
  updated_on: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  }
}, {
  tableName: 'user',
  timestamps: false
});

module.exports = userModel;