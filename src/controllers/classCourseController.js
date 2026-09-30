const classCourseService = require('../services/classCourseService');

class ClassCourseController {

    async addCourseToClass(req, res) {
        try {
            const { classId, courseId } = req.params;

            if (!Number.isInteger(Number(classId))) {
                return res.status(400).json({
                    message: 'Invalid class ID'
                });
            }

            if (!Number.isInteger(Number(courseId))) {
                return res.status(400).json({
                    message: 'Invalid course ID'
                });
            }

            await classCourseService.addCourseToClass(
                classId,
                courseId
            );

            res.status(201).json({
                message: 'Course added to class successfully'
            });

        } catch (error) {
            console.error(error);

            if (error.name === 'SequelizeForeignKeyConstraintError') {
                return res.status(400).json({
                    message: 'Class or course does not exist'
                });
            }

            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).json({
                    message: 'Course is already assigned to this class'
                });
            }

            res.status(500).json({
                message: 'Failed to add course to class'
            });
        }
    }

    async getCoursesByClass(req, res) {
        try {
            const { classId } = req.params;

            if (!Number.isInteger(Number(classId))) {
                return res.status(400).json({
                    message: 'Invalid class ID'
                });
            }

            const courses = await classCourseService.getCoursesByClass(
                classId
            );

            if (courses === null) {
                return res.status(404).json({
                    message: 'Class not found'
                });
            }

            res.status(200).json(courses);

        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: 'Failed to retrieve class courses'
            });
        }
    }

    async removeCourseFromClass(req, res) {
        try {
            const { classId, courseId } = req.params;

            if (!Number.isInteger(Number(classId))) {
                return res.status(400).json({
                    message: 'Invalid class ID'
                });
            }

            if (!Number.isInteger(Number(courseId))) {
                return res.status(400).json({
                    message: 'Invalid course ID'
                });
            }

            const deletedRows =
                await classCourseService.removeCourseFromClass(
                    classId,
                    courseId
                );

            if (deletedRows === 0) {
                return res.status(404).json({
                    message: 'Course is not assigned to this class'
                });
            }

            res.status(200).json({
                message: 'Course removed from class successfully'
            });

        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: 'Failed to remove course from class'
            });
        }
    }
}

module.exports = new ClassCourseController();