const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Class = sequelize.define(
    'Class',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        created_at: {
            type: DataTypes.DATE
        },

        updated_at: {
            type: DataTypes.DATE
        }
    },
    {
        tableName: 'classes',
        timestamps: false
    }
);

module.exports = Class;