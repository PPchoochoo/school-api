const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Course = sequelize.define(
    'Course',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: DataTypes.STRING(150),
            allowNull: false
        },

        teacher_id: {
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
        tableName: 'courses',
        timestamps: false
    }
);

module.exports = Course;