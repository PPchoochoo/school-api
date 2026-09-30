const classService = require('../services/classService');

class ClassController {

    async getAllClasses(req, res) {
        try {
            const classes = await classService.getAllClasses();

            res.status(200).json(classes);

        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: 'Failed to retrieve classes'
            });
        }
    }

    async getClassById(req, res) {
        try {
            const { id } = req.params;

            if (!Number.isInteger(Number(id))) {
                return res.status(400).json({
                    message: 'Invalid class ID'
                });
            }

            const classData = await classService.getClassById(id);

            if (!classData) {
                return res.status(404).json({
                    message: 'Class not found'
                });
            }

            res.status(200).json(classData);

        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: 'Failed to retrieve class'
            });
        }
    }

    async createClass(req, res) {
        try {
            const { name } = req.body;

            if (!name) {
                return res.status(400).json({
                    message: 'Class name is required'
                });
            }

            const classData = await classService.createClass({
                name
            });

            res.status(201).json({
                message: 'Class created successfully',
                classId: classData.id
            });

        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: 'Failed to create class'
            });
        }
    }

    async updateClass(req, res) {
        try {
            const { id } = req.params;
            const { name } = req.body;

            if (!Number.isInteger(Number(id))) {
                return res.status(400).json({
                    message: 'Invalid class ID'
                });
            }

            if (!name) {
                return res.status(400).json({
                    message: 'Class name is required'
                });
            }

            const affectedRows = await classService.updateClass(
                id,
                name
            );

            if (affectedRows === 0) {
                return res.status(404).json({
                    message: 'Class not found'
                });
            }

            res.status(200).json({
                message: 'Class updated successfully'
            });

        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: 'Failed to update class'
            });
        }
    }

    async deleteClass(req, res) {
        try {
            const { id } = req.params;

            if (!Number.isInteger(Number(id))) {
                return res.status(400).json({
                    message: 'Invalid class ID'
                });
            }

            const deletedRows = await classService.deleteClass(id);

            if (deletedRows === 0) {
                return res.status(404).json({
                    message: 'Class not found'
                });
            }

            res.status(200).json({
                message: 'Class deleted successfully'
            });

        } catch (error) {
            console.error(error);

            if (error.name === 'SequelizeForeignKeyConstraintError') {
                return res.status(409).json({
                    message: 'Cannot delete class because students are assigned to this class'
                });
            }

            res.status(500).json({
                message: 'Failed to delete class'
            });
        }
    }

    async getStudentsByClass(req, res) {
        try {
            const { classId } = req.params;

            if (!Number.isInteger(Number(classId))) {
                return res.status(400).json({
                    message: 'Invalid class ID'
                });
            }

            const students = await classService.getStudentsByClass(
                classId
            );

            if (students === null) {
                return res.status(404).json({
                    message: 'Class not found'
                });
            }

            res.status(200).json(students);

        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: 'Failed to retrieve class students'
            });
        }
    }

    async getTeachersByClass(req, res) {
        try {
            const { classId } = req.params;

            if (!Number.isInteger(Number(classId))) {
                return res.status(400).json({
                    message: 'Invalid class ID'
                });
            }

            const teachers = await classService.getTeachersByClass(
                classId
            );

            if (teachers === null) {
                return res.status(404).json({
                    message: 'Class not found'
                });
            }

            res.status(200).json(teachers);

        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: 'Failed to retrieve class teachers'
            });
        }
    }

    async searchClasses(req, res) {
        try {
            const classes = await classService.searchClasses(
                req.query
            );

            res.status(200).json(classes);

        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: 'Failed to search classes'
            });
        }
    }
}

module.exports = new ClassController();