const ClassCourse = require('../models/classCourseModel');
const Class = require('../models/classModel');
const Course = require('../models/courseModel');

class ClassCourseService {

    async addCourseToClass(classId, courseId) {
        return await ClassCourse.create({
            class_id: classId,
            course_id: courseId
        });
    }

    async getCoursesByClass(classId) {
        const classData = await Class.findByPk(classId, {
            include: Course
        });

        if (!classData) {
            return null;
        }

        return classData.Courses;
    }

    async removeCourseFromClass(classId, courseId) {
        return await ClassCourse.destroy({
            where: {
                class_id: classId,
                course_id: courseId
            }
        });
    }
}

module.exports = new ClassCourseService();