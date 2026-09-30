const express = require('express');
const classCourseController = require('../controllers/classCourseController');

class ClassCourseRoutes {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes(){
        this.router.post(
            '/:classId/courses/:courseId',
            classCourseController.addCourseToClass
        );

        this.router.get(
            '/:classId/courses',
            classCourseController.getCoursesByClass
        );

        this.router.delete(
            '/:classId/courses/:courseId',
            classCourseController.removeCourseFromClass
        );
    }
}

const classCourseRoutes = new ClassCourseRoutes();
module.exports = classCourseRoutes.router;