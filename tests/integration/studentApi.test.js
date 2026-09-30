const request = require('supertest');
const app = require('../../src/app');

describe('Student API - Integration Tests', () => {

    // GET all students
    test('GET /api/students should return all students', async () => {
        const response = await request(app)
            .get('/api/students');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // GET student by ID
    test('GET /api/students/:id should return a student', async () => {
        const response = await request(app)
            .get('/api/students/2');

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('first_name');
        expect(response.body).toHaveProperty('last_name');
        expect(response.body).toHaveProperty('email');
    });

    test('GET /api/students/:id should reject an invalid ID', async () => {
        const response = await request(app)
            .get('/api/students/abc');

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Invalid student ID');
    });

    test('GET /api/students/:id should return 404 for a non-existent student', async () => {
        const response = await request(app)
            .get('/api/students/999999');

        expect(response.statusCode).toBe(404);
    });

    // Search
    test('GET /api/students/search should return search results', async () => {
        const response = await request(app)
            .get('/api/students/search?name=John');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // POST
    test('POST /api/students should create a student', async () => {
        const uniqueEmail =
            `integration_${Date.now()}@example.com`;

        const response = await request(app)
            .post('/api/students')
            .send({
                first_name: 'Integration',
                last_name: 'Test',
                email: uniqueEmail,
                class_id: 1
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('studentId');
        expect(response.body.message)
            .toBe('Student created successfully');
    });

    test('POST /api/students should reject missing first name', async () => {
        const response = await request(app)
            .post('/api/students')
            .send({
                last_name: 'Test',
                email: `missing_first_${Date.now()}@example.com`,
                class_id: 1
            });

        expect(response.statusCode).toBe(400);
    });

    test('POST /api/students should reject missing last name', async () => {
        const response = await request(app)
            .post('/api/students')
            .send({
                first_name: 'Test',
                email: `missing_last_${Date.now()}@example.com`,
                class_id: 1
            });

        expect(response.statusCode).toBe(400);
    });

    test('POST /api/students should reject missing email', async () => {
        const response = await request(app)
            .post('/api/students')
            .send({
                first_name: 'Test',
                last_name: 'Student',
                class_id: 1
            });

        expect(response.statusCode).toBe(400);
    });

    test('POST /api/students should reject an invalid email', async () => {
        const response = await request(app)
            .post('/api/students')
            .send({
                first_name: 'Test',
                last_name: 'Student',
                email: 'not-an-email',
                class_id: 1
            });

        expect(response.statusCode).toBe(400);
    });

    // PUT
    test('PUT /api/students/:id should update a student', async () => {
        const response = await request(app)
            .put('/api/students/6')
            .send({
                first_name: 'Updated',
                last_name: 'Student',
                email: `updated_${Date.now()}@example.com`,
                class_id: 1
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.message)
            .toBe('Student updated successfully');
    });

    test('PUT /api/students/:id should reject an invalid ID', async () => {
        const response = await request(app)
            .put('/api/students/abc')
            .send({
                first_name: 'Updated',
                last_name: 'Student',
                email: 'updated@example.com',
                class_id: 1
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Invalid student ID');
    });

    test('PUT /api/students/:id should return 404 for a non-existent student', async () => {
        const response = await request(app)
            .put('/api/students/999999')
            .send({
                first_name: 'Updated',
                last_name: 'Student',
                email: `nonexistent_${Date.now()}@example.com`,
                class_id: 1
            });

        expect(response.statusCode).toBe(404);
    });

    // DELETE
    test('DELETE /api/students/:id should reject an invalid ID', async () => {
        const response = await request(app)
            .delete('/api/students/abc');

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Invalid student ID');
    });

    test('DELETE /api/students/:id should return 404 for a non-existent student', async () => {
        const response = await request(app)
            .delete('/api/students/999999');

        expect(response.statusCode).toBe(404);
    });

    // Student → Class
    test('GET /api/students/:studentId/class should return the student class', async () => {
        const response = await request(app)
            .get('/api/students/2/class');

        expect(response.statusCode).toBe(200);
    });

    // Student → Courses
    test('GET /api/students/:studentId/courses should return student courses', async () => {
        const response = await request(app)
            .get('/api/students/2/courses');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('GET /api/students/:studentId/class should reject an invalid ID', async () => {
        const response = await request(app)
            .get('/api/students/abc/class');

        expect(response.statusCode).toBe(400);
    });

    test('GET /api/students/:studentId/courses should reject an invalid ID', async () => {
        const response = await request(app)
            .get('/api/students/abc/courses');

        expect(response.statusCode).toBe(400);
    });

});