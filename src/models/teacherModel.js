const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Teacher = sequelize.define(
    'Teacher',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        first_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        last_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        email: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true
        },

        created_at: {
            type: DataTypes.DATE
        },

        updated_at: {
            type: DataTypes.DATE
        }
    },
    {
        tableName: 'teachers',
        timestamps: false
    }
);

module.exports = Teacher;