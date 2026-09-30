const Teacher = require('../models/teacherModel');
const Course = require('../models/courseModel');
const Class = require('../models/classModel');
const Student = require('../models/studentModel');

class TeacherService {

    async getAllTeachers() {
        return await Teacher.findAll();
    }

    async getTeacherById(id) {
        return await Teacher.findByPk(id);
    }

    async createTeacher(teacherData) {
        return await Teacher.create(teacherData);
    }

    async updateTeacher(id, firstName, lastName, email) {
        const [affectedRows] = await Teacher.update(
            {
                first_name: firstName,
                last_name: lastName,
                email: email
            },
            {
                where: { id: id }
            }
        );

        return affectedRows;
    }

    async deleteTeacher(id) {
        return await Teacher.destroy({
            where: { id: id }
        });
    }

    async getCoursesByTeacher(teacherId) {
        const teacher = await Teacher.findByPk(teacherId, {
            include: Course
        });

        if (!teacher) {
            return null;
        }

        return teacher.Courses;
    }

    async getStudentsByTeacher(teacherId) {
        const teacher = await Teacher.findByPk(teacherId, {
            include: {
                model: Course,
                required: true,
                include: {
                    model: Class,
                    required: true,
                    include: Student
                }
            }
        });

        if (!teacher) {
            return null;
        }

        const students = [];

        for (const course of teacher.Courses) {
            for (const classData of course.Classes) {
                for (const student of classData.Students) {
                    students.push(student);
                }
            }
        }

        // Remove duplicates
        return [
            ...new Map(
                students.map(student => [student.id, student])
            ).values()
        ];
    }

    async searchTeachers(filters) {
        const { Op } = require('sequelize');

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

        return await Teacher.findAll({
            where: where
        });
    }
}

module.exports = new TeacherService();