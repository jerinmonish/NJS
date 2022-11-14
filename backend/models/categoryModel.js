const Sequelize = require('sequelize');
const db = require('../db/db');

const categoryModel = db.define('category', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cat_name: {
        type: Sequelize.STRING,
        allowNull: false,
        // unique: true
        unique: {
            args: true,
            msg: 'Category Name already Exists !'
        }
    },
    cat_image: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Active',
    },
    created_at: {
        type: Sequelize.DATE,
    },
    updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    }
}, {
    // Other model options go here
    tableName: 'category',
    timestamps: false,
});

module.exports = categoryModel;