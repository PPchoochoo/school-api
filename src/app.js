const express = require('express');
require('./models/associations');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const courseRoutes = require('./routes/courseRoutes');
const classRoutes = require('./routes/classRoutes');
const classCourseRoutes = require('./routes/classCourseRoutes');

const app = express();

app.use(express.json());

app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/classes', classCourseRoutes);

module.exports = app;