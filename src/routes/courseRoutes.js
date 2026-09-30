const express = require('express');
const courseController = require('../controllers/courseController');

class CourseRoutes {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get('/', courseController.getAllCourses);

        this.router.get('/search', courseController.searchCourses);

        this.router.get('/:id', courseController.getCourseById);

        this.router.get('/:courseId/teacher', courseController.getTeacherByCourse);

        this.router.get('/:courseId/students', courseController.getStudentsByCourse); 

        this.router.get('/:courseId/classes', courseController.getClassesByCourse);

        this.router.post('/', courseController.createCourse);

        this.router.put('/:id', courseController.updateCourse);

        this.router.delete('/:id', courseController.deleteCourse);
    }
}
const courseRoutes = new CourseRoutes();
module.exports = courseRoutes.router;