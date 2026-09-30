const express = require('express');
const studentController = require('../controllers/studentController');

class StudentRoutes {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get('/', studentController.getAllStudents);

        this.router.get('/search', studentController.searchStudents);

        this.router.get('/:id', studentController.getStudentById);

        this.router.get('/:studentId/class', studentController.getClassByStudent);
        
        this.router.get('/:studentId/courses', studentController.getCoursesByStudent);

        this.router.post('/', studentController.createStudent);

        this.router.put('/:id', studentController.updateStudent);

        this.router.delete('/:id', studentController.deleteStudent);
    }
}

const studentRoutes = new StudentRoutes();
module.exports = studentRoutes.router;