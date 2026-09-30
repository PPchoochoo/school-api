const courseService = require('../services/courseService');

class CourseController {

    async getAllCourses(req, res) {
        try {
            const courses = await courseService.getAllCourses();

            res.status(200).json(courses);

        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: 'Failed to retrieve courses'
            });
        }
    }

    async getCourseById(req, res) {
        try {
            const { id } = req.params;

            if (!Number.isInteger(Number(id))) {
                return res.status(400).json({
                    message: 'Invalid course ID'
                });
            }

            const course = await courseService.getCourseById(id);

            if (!course) {
                return res.status(404).json({
                    message: 'Course not found'
                });
            }

            res.status(200).json(course);

        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: 'Failed to retrieve course'
            });
        }
    }

    async createCourse(req, res) {
        try {
            const { name, teacher_id } = req.body;

            if (!name || !teacher_id) {
                return res.status(400).json({
                    message: 'Course name and teacher ID are required'
                });
            }

            if (!Number.isInteger(Number(teacher_id))) {
                return res.status(400).json({
                    message: 'Invalid teacher ID'
                });
            }

            const course = await courseService.createCourse({
                name,
                teacher_id
            });

            res.status(201).json({
                message: 'Course created successfully',
                courseId: course.id
            });

        } catch (error) {
            console.error(error);

            if (error.name === 'SequelizeForeignKeyConstraintError') {
                return res.status(400).json({
                    message: 'Teacher does not exist'
                });
            }

            res.status(500).json({
                message: 'Failed to create course'
            });
        }
    }

    async updateCourse(req, res) {
        try {
            const { id } = req.params;
            const { name, teacher_id } = req.body;

            if (!Number.isInteger(Number(id))) {
                return res.status(400).json({
                    message: 'Invalid course ID'
                });
            }

            if (!name || !teacher_id) {
                return res.status(400).json({
                    message: 'Course name and teacher ID are required'
                });
            }

            if (!Number.isInteger(Number(teacher_id))) {
                return res.status(400).json({
                    message: 'Invalid teacher ID'
                });
            }

            const affectedRows = await courseService.updateCourse(
                id,
                name,
                teacher_id
            );

            if (affectedRows === 0) {
                return res.status(404).json({
                    message: 'Course not found'
                });
            }

            res.status(200).json({
                message: 'Course updated successfully'
            });

        } catch (error) {
            console.error(error);

            if (error.name === 'SequelizeForeignKeyConstraintError') {
                return res.status(400).json({
                    message: 'Teacher does not exist'
                });
            }

            res.status(500).json({
                message: 'Failed to update course'
            });
        }
    }

    async deleteCourse(req, res) {
        try {
            const { id } = req.params;

            if (!Number.isInteger(Number(id))) {
                return res.status(400).json({
                    message: 'Invalid course ID'
                });
            }

            const deletedRows = await courseService.deleteCourse(id);

            if (deletedRows === 0) {
                return res.status(404).json({
                    message: 'Course not found'
                });
            }

            res.status(200).json({
                message: 'Course deleted successfully'
            });

        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: 'Failed to delete course'
            });
        }
    }

    async getTeacherByCourse(req, res) {
        try {
            const { courseId } = req.params;

            if (!Number.isInteger(Number(courseId))) {
                return res.status(400).json({
                    message: 'Invalid course ID'
                });
            }

            const teacher = await courseService.getTeacherByCourse(
                courseId
            );

            if (!teacher) {
                return res.status(404).json({
                    message: 'Course or teacher not found'
                });
            }

            res.status(200).json(teacher);

        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: 'Failed to retrieve course teacher'
            });
        }
    }

    async getStudentsByCourse(req, res) {
        try {
            const { courseId } = req.params;

            if (!Number.isInteger(Number(courseId))) {
                return res.status(400).json({
                    message: 'Invalid course ID'
                });
            }

            const students = await courseService.getStudentsByCourse(
                courseId
            );

            if (students === null) {
                return res.status(404).json({
                    message: 'Course not found'
                });
            }

            res.status(200).json(students);

        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: 'Failed to retrieve course students'
            });
        }
    }

    async getClassesByCourse(req, res) {
        try {
            const { courseId } = req.params;

            if (!Number.isInteger(Number(courseId))) {
                return res.status(400).json({
                    message: 'Invalid course ID'
                });
            }

            const classes = await courseService.getClassesByCourse(
                courseId
            );

            if (classes === null) {
                return res.status(404).json({
                    message: 'Course not found'
                });
            }

            res.status(200).json(classes);

        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: 'Failed to retrieve course classes'
            });
        }
    }

    async searchCourses(req, res) {
        try {
            const courses = await courseService.searchCourses(
                req.query
            );

            res.status(200).json(courses);

        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: 'Failed to search courses'
            });
        }
    }
}

module.exports = new CourseController();