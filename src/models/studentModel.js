const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Student = sequelize.define(
    'Student',
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

        class_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        created_at: {
            type: DataTypes.DATE
        },

        updated_at: {
            type: DataTypes.DATE
        }
    },
    {
        tableName: 'students',
        timestamps: false
    }
);

module.exports = Student;