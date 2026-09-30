const teacherService = require('../services/teacherService');

class TeacherController {

    async getAllTeachers(req, res) {
        try {
            const teachers = await teacherService.getAllTeachers();

            res.status(200).json(teachers);
        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: 'Failed to retrieve teachers'
            });
        }
    }

    async getTeacherById(req, res) {
        try {
            const { id } = req.params;

            if (!Number.isInteger(Number(id))) {
                return res.status(400).json({
                    message: 'Invalid teacher ID'
                });
            }

            const teacher = await teacherService.getTeacherById(id);

            if (!teacher) {
                return res.status(404).json({
                    message: 'Teacher not found'
                });
            }

            res.status(200).json(teacher);

        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: 'Failed to retrieve teacher'
            });
        }
    }

    async createTeacher(req, res) {
        try {
            const { first_name, last_name, email } = req.body;

            if (!first_name || !last_name || !email) {
                return res.status(400).json({
                    message: 'First name, last name and email are required'
                });
            }

            if (!email.includes('@')) {
                return res.status(400).json({
                    message: 'Invalid email address'
                });
            }

            const teacher = await teacherService.createTeacher({
                first_name,
                last_name,
                email
            });

            res.status(201).json({
                message: 'Teacher created successfully',
                teacherId: teacher.id
            });

        } catch (error) {
            console.error(error);

            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).json({
                    message: 'Email already exists'
                });
            }

            res.status(500).json({
                message: 'Failed to create teacher'
            });
        }
    }

    async updateTeacher(req, res) {
        try {
            const { id } = req.params;
            const { first_name, last_name, email } = req.body;

            if (!Number.isInteger(Number(id))) {
                return res.status(400).json({
                    message: 'Invalid teacher ID'
                });
            }

            if (!first_name || !last_name || !email) {
                return res.status(400).json({
                    message: 'First name, last name and email are required'
                });
            }

            if (!email.includes('@')) {
                return res.status(400).json({
                    message: 'Invalid email address'
                });
            }

            const affectedRows = await teacherService.updateTeacher(
                id,
                first_name,
                last_name,
                email
            );

            if (affectedRows === 0) {
                return res.status(404).json({
                    message: 'Teacher not found'
                });
            }

            res.status(200).json({
                message: 'Teacher updated successfully'
            });

        } catch (error) {
            console.error(error);

            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).json({
                    message: 'Email already exists'
                });
            }

            res.status(500).json({
                message: 'Failed to update teacher'
            });
        }
    }

    async deleteTeacher(req, res) {
        try {
            const { id } = req.params;

            if (!Number.isInteger(Number(id))) {
                return res.status(400).json({
                    message: 'Invalid teacher ID'
                });
            }

            const deletedRows = await teacherService.deleteTeacher(id);

            if (deletedRows === 0) {
                return res.status(404).json({
                    message: 'Teacher not found'
                });
            }

            res.status(200).json({
                message: 'Teacher deleted successfully'
            });

        } catch (error) {
            console.error(error);

            if (error.name === 'SequelizeForeignKeyConstraintError') {
                return res.status(409).json({
                    message: 'Cannot delete teacher because courses are assigned to this teacher'
                });
            }

            res.status(500).json({
                message: 'Failed to delete teacher'
            });
        }
    }

    async getCoursesByTeacher(req, res) {
        try {
            const { teacherId } = req.params;

            if (!Number.isInteger(Number(teacherId))) {
                return res.status(400).json({
                    message: 'Invalid teacher ID'
                });
            }

            const courses = await teacherService.getCoursesByTeacher(
                teacherId
            );

            if (courses === null) {
                return res.status(404).json({
                    message: 'Teacher not found'
                });
            }

            res.status(200).json(courses);

        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: 'Failed to retrieve teacher courses'
            });
        }
    }

    async getStudentsByTeacher(req, res) {
        try {
            const { teacherId } = req.params;

            if (!Number.isInteger(Number(teacherId))) {
                return res.status(400).json({
                    message: 'Invalid teacher ID'
                });
            }

            const students = await teacherService.getStudentsByTeacher(
                teacherId
            );

            if (students === null) {
                return res.status(404).json({
                    message: 'Teacher not found'
                });
            }

            res.status(200).json(students);

        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: 'Failed to retrieve teacher students'
            });
        }
    }

    async searchTeachers(req, res) {
        try {
            const teachers = await teacherService.searchTeachers(
                req.query
            );

            res.status(200).json(teachers);

        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: 'Failed to search teachers'
            });
        }
    }
}

module.exports = new TeacherController();