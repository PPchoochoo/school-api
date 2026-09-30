const { Op } = require('sequelize');

const Course = require('../models/courseModel');
const Teacher = require('../models/teacherModel');
const Class = require('../models/classModel');
const Student = require('../models/studentModel');

class CourseService {

    async getAllCourses() {
        return await Course.findAll();
    }

    async getCourseById(id) {
        return await Course.findByPk(id);
    }

    async createCourse(courseData) {
        return await Course.create(courseData);
    }

    async updateCourse(id, name, teacherId) {
        const [affectedRows] = await Course.update(
            {
                name: name,
                teacher_id: teacherId
            },
            {
                where: { id: id }
            }
        );

        return affectedRows;
    }

    async deleteCourse(id) {
        return await Course.destroy({
            where: { id: id }
        });
    }

    async getTeacherByCourse(courseId) {
        const course = await Course.findByPk(courseId, {
            include: Teacher
        });

        if (!course) {
            return null;
        }

        return course.Teacher;
    }

    async getStudentsByCourse(courseId) {
        const course = await Course.findByPk(courseId, {
            include: {
                model: Class,
                include: Student
            }
        });

        if (!course) {
            return null;
        }

        const students = [];

        for (const classData of course.Classes) {
            for (const student of classData.Students) {
                students.push(student);
            }
        }

        return [
            ...new Map(
                students.map(student => [student.id, student])
            ).values()
        ];
    }

    async getClassesByCourse(courseId) {
        const course = await Course.findByPk(courseId, {
            include: Class
        });

        if (!course) {
            return null;
        }

        return course.Classes;
    }

    async searchCourses(filters) {
        const where = {};

        if (filters.name) {
            where.name = {
                [Op.like]: `%${filters.name}%`
            };
        }

        if (filters.teacher_id) {
            where.teacher_id = filters.teacher_id;
        }

        return await Course.findAll({
            where: where
        });
    }
}

module.exports = new CourseService();