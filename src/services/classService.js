const { Op } = require('sequelize');

const Class = require('../models/classModel');
const Student = require('../models/studentModel');
const Course = require('../models/courseModel');
const Teacher = require('../models/teacherModel');

class ClassService {

    async getAllClasses() {
        return await Class.findAll();
    }

    async getClassById(id) {
        return await Class.findByPk(id);
    }

    async createClass(classData) {
        return await Class.create(classData);
    }

    async updateClass(id, name) {
        const [affectedRows] = await Class.update(
            {
                name: name
            },
            {
                where: { id: id }
            }
        );

        return affectedRows;
    }

    async deleteClass(id) {
        return await Class.destroy({
            where: { id: id }
        });
    }

    async getStudentsByClass(classId) {
        const classData = await Class.findByPk(classId, {
            include: Student
        });

        if (!classData) {
            return null;
        }

        return classData.Students;
    }

    async getTeachersByClass(classId) {
        const classData = await Class.findByPk(classId, {
            include: {
                model: Course,
                include: Teacher
            }
        });

        if (!classData) {
            return null;
        }

        const teachers = [];

        for (const course of classData.Courses) {
            if (course.Teacher) {
                teachers.push(course.Teacher);
            }
        }

        return [
            ...new Map(
                teachers.map(teacher => [teacher.id, teacher])
            ).values()
        ];
    }

    async searchClasses(filters) {
        const where = {};

        if (filters.name) {
            where.name = {
                [Op.like]: `%${filters.name}%`
            };
        }

        return await Class.findAll({
            where: where
        });
    }
}

module.exports = new ClassService();