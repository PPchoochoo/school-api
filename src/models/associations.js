const Student = require('./studentModel');
const Teacher = require('./teacherModel');
const Course = require('./courseModel');
const Class = require('./classModel');
const ClassCourse = require('./classCourseModel');


// Student <-> Class
Class.hasMany(Student, {
    foreignKey: 'class_id'
});

Student.belongsTo(Class, {
    foreignKey: 'class_id'
});


// Teacher <-> Course
Teacher.hasMany(Course, {
    foreignKey: 'teacher_id'
});

Course.belongsTo(Teacher, {
    foreignKey: 'teacher_id'
});


// Class <-> Course
Class.belongsToMany(Course, {
    through: ClassCourse,
    foreignKey: 'class_id',
    otherKey: 'course_id'
});

Course.belongsToMany(Class, {
    through: ClassCourse,
    foreignKey: 'course_id',
    otherKey: 'class_id'
});


module.exports = {
    Student,
    Teacher,
    Course,
    Class,
    ClassCourse
};