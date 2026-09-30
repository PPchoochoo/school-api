const express = require('express');
const teacherController = require('../controllers/teacherController');

class TeacherRoutes {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get('/', teacherController.getAllTeachers);

        this.router.get('/search', teacherController.searchTeachers);

        this.router.get('/:id', teacherController.getTeacherById);

        this.router.get('/:teacherId/courses', teacherController.getCoursesByTeacher);

        this.router.get('/:teacherId/students', teacherController.getStudentsByTeacher);

        this.router.post('/', teacherController.createTeacher);

        this.router.put('/:id', teacherController.updateTeacher);

        this.router.delete('/:id', teacherController.deleteTeacher);

    }
}

const teacherRoutes = new TeacherRoutes();
module.exports = teacherRoutes.router;