const { Op } = require('sequelize');

const Student = require('../models/studentModel');
const Class = require('../models/classModel');
const Course = require('../models/courseModel');

class StudentService {

    async getAllStudents() {
        return await Student.findAll();
    }

    async getStudentById(id) {
        return await Student.findByPk(id);
    }

    async createStudent(studentData) {
        return await Student.create(studentData);
    }

    async updateStudent(id, studentData) {
        const [affectedRows] = await Student.update(
            studentData,
            {
                where: { id: id }
            }
        );

        return affectedRows;
    }

    async deleteStudent(id) {
        return await Student.destroy({
            where: { id: id }
        });
    }

    async getClassByStudent(studentId) {
        const student = await Student.findByPk(studentId, {
            include: {
                model: Class
            }
        });

        if (!student) {
            return null;
        }

        return student.Class;
    }

    async getCoursesByStudent(studentId) {
        const student = await Student.findByPk(studentId, {
            include: {
                model: Class,
                include: Course
            }
        });

        if (!student) {
            return null;
        }

        return student.Class
            ? student.Class.Courses
            : [];
    }

    async searchStudents(filters) {
        const where = {};

        if (filters.name) {
            where[Op.or] = [
                {
                    first_name: {
                        [Op.like]: `%${filters.name}%`
                    }
                },
                {
                    last_name: {
                        [Op.like]: `%${filters.name}%`
                    }
                }
            ];
        }

        if (filters.email) {
            where.email = {
                [Op.like]: `%${filters.email}%`
            };
        }

        if (filters.class_id) {
            where.class_id = filters.class_id;
        }

        return await Student.findAll({
            where: where,
            // attributes: ["fullname", "email"]
        });
    }
}

module.exports = new StudentService();