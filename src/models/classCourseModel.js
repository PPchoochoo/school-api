const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ClassCourse = sequelize.define(
    'ClassCourse',
    {
        class_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },

        course_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        }
    },
    {
        tableName: 'class_courses',
        timestamps: false
    }
);

module.exports = ClassCourse;