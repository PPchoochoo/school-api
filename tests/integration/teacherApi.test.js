const request = require('supertest');
const app = require('../../src/app');

describe('Teacher API - Integration Tests', () => {

    // GET all
    test('GET /api/teachers should return all teachers', async () => {
        const response = await request(app)
            .get('/api/teachers');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // GET by ID
    test('GET /api/teachers/:id should return a teacher', async () => {
        const response = await request(app)
            .get('/api/teachers/1');

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id');
    });

    test('GET /api/teachers/:id should reject an invalid ID', async () => {
        const response = await request(app)
            .get('/api/teachers/abc');

        expect(response.statusCode).toBe(400);
    });

    test('GET /api/teachers/:id should return 404 for a non-existent teacher', async () => {
        const response = await request(app)
            .get('/api/teachers/999999');

        expect(response.statusCode).toBe(404);
    });

    // Search
    test('GET /api/teachers/search should return search results', async () => {
        const response = await request(app)
            .get('/api/teachers/search?name=John');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // POST
    test('POST /api/teachers should create a teacher', async () => {
        const uniqueEmail =
            `integration_teacher_${Date.now()}@example.com`;

        const response = await request(app)
            .post('/api/teachers')
            .send({
                first_name: 'Integration',
                last_name: 'Teacher',
                email: uniqueEmail
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('teacherId');
    });

    test('POST /api/teachers should reject missing first name', async () => {
        const response = await request(app)
            .post('/api/teachers')
            .send({
                last_name: 'Teacher',
                email: `missing_${Date.now()}@example.com`
            });

        expect(response.statusCode).toBe(400);
    });

    test('POST /api/teachers should reject missing last name', async () => {
        const response = await request(app)
            .post('/api/teachers')
            .send({
                first_name: 'Teacher',
                email: `missing_${Date.now()}@example.com`
            });

        expect(response.statusCode).toBe(400);
    });

    test('POST /api/teachers should reject missing email', async () => {
        const response = await request(app)
            .post('/api/teachers')
            .send({
                first_name: 'Integration',
                last_name: 'Teacher'
            });

        expect(response.statusCode).toBe(400);
    });

    test('POST /api/teachers should reject invalid email', async () => {
        const response = await request(app)
            .post('/api/teachers')
            .send({
                first_name: 'Integration',
                last_name: 'Teacher',
                email: 'invalid-email'
            });

        expect(response.statusCode).toBe(400);
    });

    // PUT
    test('PUT /api/teachers/:id should update a teacher', async () => {
        const response = await request(app)
            .put('/api/teachers/1')
            .send({
                first_name: 'Updated',
                last_name: 'Teacher',
                email: `updated_teacher_${Date.now()}@example.com`
            });

        expect(response.statusCode).toBe(200);
    });

    test('PUT /api/teachers/:id should reject an invalid ID', async () => {
        const response = await request(app)
            .put('/api/teachers/abc')
            .send({
                first_name: 'Updated',
                last_name: 'Teacher',
                email: 'updated@example.com'
            });

        expect(response.statusCode).toBe(400);
    });

    test('PUT /api/teachers/:id should return 404 for a non-existent teacher', async () => {
        const response = await request(app)
            .put('/api/teachers/999999')
            .send({
                first_name: 'Updated',
                last_name: 'Teacher',
                email: `none_${Date.now()}@example.com`
            });

        expect(response.statusCode).toBe(404);
    });

    // DELETE
    test('DELETE /api/teachers/:id should reject an invalid ID', async () => {
        const response = await request(app)
            .delete('/api/teachers/abc');

        expect(response.statusCode).toBe(400);
    });

    test('DELETE /api/teachers/:id should return 404 for a non-existent teacher', async () => {
        const response = await request(app)
            .delete('/api/teachers/999999');

        expect(response.statusCode).toBe(404);
    });

    // Teacher → Courses
    test('GET /api/teachers/:teacherId/courses should return teacher courses', async () => {
        const response = await request(app)
            .get('/api/teachers/1/courses');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Teacher → Students
    test('GET /api/teachers/:teacherId/students should return students', async () => {
        const response = await request(app)
            .get('/api/teachers/1/students');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('GET /api/teachers/:teacherId/courses should reject invalid ID', async () => {
        const response = await request(app)
            .get('/api/teachers/abc/courses');

        expect(response.statusCode).toBe(400);
    });

    test('GET /api/teachers/:teacherId/students should reject invalid ID', async () => {
        const response = await request(app)
            .get('/api/teachers/abc/students');

        expect(response.statusCode).toBe(400);
    });

});