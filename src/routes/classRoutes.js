const express = require('express');
const classController = require('../controllers/classController');

class ClassRoutes {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get('/', classController.getAllClasses);

        this.router.get('/search', classController.searchClasses);

        this.router.get('/:id', classController.getClassById);

        this.router.get('/:classId/students', classController.getStudentsByClass); 

        this.router.get('/:classId/teachers', classController.getTeachersByClass);

        this.router.post('/', classController.createClass);

        this.router.put('/:id', classController.updateClass);

        this.router.delete('/:id', classController.deleteClass);
    }
}

const classRoutes = new ClassRoutes();
module.exports = classRoutes.router;