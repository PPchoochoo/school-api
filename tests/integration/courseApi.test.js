const request = require('supertest');
const app = require('../../src/app');

describe('Course API - Integration Tests', () => {

    // GET all courses
    test('GET /api/courses should return all courses', async () => {
        const response = await request(app)
            .get('/api/courses');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // GET course by ID
    test('GET /api/courses/:id should return a course', async () => {
        const response = await request(app)
            .get('/api/courses/1');

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id');
    });

    test('GET /api/courses/:id should reject an invalid ID', async () => {
        const response = await request(app)
            .get('/api/courses/abc');

        expect(response.statusCode).toBe(400);
    });

    test('GET /api/courses/:id should return 404 for a non-existent course', async () => {
        const response = await request(app)
            .get('/api/courses/999999');

        expect(response.statusCode).toBe(404);
    });

    // Search
    test('GET /api/courses/search should return search results', async () => {
        const response = await request(app)
            .get('/api/courses/search?name=Database');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // POST
    test('POST /api/courses should create a course', async () => {
        const response = await request(app)
            .post('/api/courses')
            .send({
                name: `Integration Course ${Date.now()}`,
                teacher_id: 1
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('courseId');
    });

    test('POST /api/courses should reject missing course name', async () => {
        const response = await request(app)
            .post('/api/courses')
            .send({
                teacher_id: 1
            });

        expect(response.statusCode).toBe(400);
    });

    test('POST /api/courses should reject missing teacher ID', async () => {
        const response = await request(app)
            .post('/api/courses')
            .send({
                name: 'Test Course'
            });

        expect(response.statusCode).toBe(400);
    });

    // PUT
    test('PUT /api/courses/:id should update a course', async () => {
        const response = await request(app)
            .put('/api/courses/1')
            .send({
                name: `Updated Course ${Date.now()}`,
                teacher_id: 1
            });

        expect(response.statusCode).toBe(200);
    });

    test('PUT /api/courses/:id should reject an invalid ID', async () => {
        const response = await request(app)
            .put('/api/courses/abc')
            .send({
                name: 'Updated Course',
                teacher_id: 1
            });

        expect(response.statusCode).toBe(400);
    });

    test('PUT /api/courses/:id should return 404 for a non-existent course', async () => {
        const response = await request(app)
            .put('/api/courses/999999')
            .send({
                name: 'Updated Course',
                teacher_id: 1
            });

        expect(response.statusCode).toBe(404);
    });

    // DELETE
    test('DELETE /api/courses/:id should reject an invalid ID', async () => {
        const response = await request(app)
            .delete('/api/courses/abc');

        expect(response.statusCode).toBe(400);
    });

    test('DELETE /api/courses/:id should return 404 for a non-existent course', async () => {
        const response = await request(app)
            .delete('/api/courses/999999');

        expect(response.statusCode).toBe(404);
    });

    // Course → Teacher
    test('GET /api/courses/:courseId/teacher should return the course teacher', async () => {
        const response = await request(app)
            .get('/api/courses/1/teacher');

        expect(response.statusCode).toBe(200);
    });

    // Course → Students
    test('GET /api/courses/:courseId/students should return students', async () => {
        const response = await request(app)
            .get('/api/courses/1/students');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Course → Classes
    test('GET /api/courses/:courseId/classes should return classes', async () => {
        const response = await request(app)
            .get('/api/courses/1/classes');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('GET /api/courses/:courseId/teacher should reject invalid ID', async () => {
        const response = await request(app)
            .get('/api/courses/abc/teacher');

        expect(response.statusCode).toBe(400);
    });

    test('GET /api/courses/:courseId/students should reject invalid ID', async () => {
        const response = await request(app)
            .get('/api/courses/abc/students');

        expect(response.statusCode).toBe(400);
    });

    test('GET /api/courses/:courseId/classes should reject invalid ID', async () => {
        const response = await request(app)
            .get('/api/courses/abc/classes');

        expect(response.statusCode).toBe(400);
    });

});