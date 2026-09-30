const ClassCourse = require('../models/classCourseModel');
const studentService = require('../services/studentService');

class StudentController{
    async  getAllStudents(req, res) {
        try {
            const students = await studentService.getAllStudents();

            res.status(200).json(students);
        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: 'Failed to retrieve students'
            });
        }
    }

    async  getStudentById(req, res) {
        try {
            const { id } = req.params;

            // Validate ID
            if (!Number.isInteger(Number(id))) {
                return res.status(400).json({
                    message: 'Invalid student ID'
                });
            }

            const student = await studentService.getStudentById(id);

            if (!student) {
                return res.status(404).json({
                    message: 'Student not found'
                });
            }

            res.status(200).json(student);
        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: 'Failed to retrieve student'
            });
        }
    }

    async  createStudent(req, res) {
        try {
            const { first_name, last_name, email, class_id } = req.body;

            // Validation
            if (!first_name || !last_name || !email || !class_id) {
                return res.status(400).json({
                    message: 'First name, last name and email are required'
                });
            }

            if (!email.includes('@')) {
                return res.status(400).json({
                    message: 'Invalid email address'
                });
            }

            const student = await studentService.createStudent({
                first_name,
                last_name,
                email,
                class_id
            });

            res.status(201).json({
                message: 'Student created successfully',
                studentId: student.id
            });
        } catch (error) {
            console.error(error);

            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).json({
                    message: 'Email already exists'
                });
            }

            res.status(500).json({
                message: 'Failed to create student'
            });
        }
    }

    async  updateStudent(req, res) {
        try {
            const { id } = req.params;
            const { first_name, last_name, email, class_id} = req.body;

            // Validation
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

            if (!Number.isInteger(Number(id))) {
                return res.status(400).json({
                    message: 'Invalid student ID'
                });
            }

            const studentData = {
                first_name,
                last_name,
                email,
                class_id
            };

            const affectedRows = await studentService.updateStudent(
                id,
                studentData
            );

            if (affectedRows === 0) {
                return res.status(404).json({
                    message: 'Student not found'
                });
            }

            res.status(200).json({
                message: 'Student updated successfully'
            });
        } catch (error) {
            console.error(error);

            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).json({
                    message: 'Email already exists'
                });
            }

            res.status(500).json({
                message: 'Failed to update student'
            });
        }
    }

    async  deleteStudent(req, res) {
        try {
            const { id } = req.params;

            // Validate ID
            if (!Number.isInteger(Number(id))) {
                return res.status(400).json({
                    message: 'Invalid student ID'
                });
            }

            const deletedRows = await studentService.deleteStudent(id);

            if (deletedRows === 0) {
                return res.status(404).json({
                    message: 'Student not found'
                });
            }

            res.status(200).json({
                message: 'Student deleted successfully'
            });
        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: 'Failed to delete student'
            });
        }
    }

    async  getClassByStudent(req, res) {
        try {
            const { studentId } = req.params;

            if (!Number.isInteger(Number(studentId))) {
                return res.status(400).json({
                    message: 'Invalid student ID'
                });
            }

            const classData = await studentService.getClassByStudent(
                studentId
            );

            if (!classData) {
                return res.status(404).json({
                    message: 'Student or class not found'
                });
            }

            res.status(200).json(classData);
        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: 'Failed to retrieve student class'
            });
        }
    }

    async  getCoursesByStudent(req, res) {
        try {
            const { studentId } = req.params;

            if (!Number.isInteger(Number(studentId))) {
                return res.status(400).json({
                    message: 'Invalid student ID'
                });
            }

            const courses = await studentService.getCoursesByStudent(
                studentId
            );

            res.status(200).json(courses);
        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: 'Failed to retrieve student courses'
            });
        }
    }

    async  searchStudents(req, res) {
        try {
            const students = await studentService.searchStudents(req.query);

            res.status(200).json(students);
        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: 'Failed to search students'
            });
        }
    }
}

module.exports = new StudentController();