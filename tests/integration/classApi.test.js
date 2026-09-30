const request = require('supertest');
const app = require('../../src/app');

describe('Class API - Integration Tests', () => {

    // GET all classes
    test('GET /api/classes should return all classes', async () => {
        const response = await request(app)
            .get('/api/classes');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // GET class by ID
    test('GET /api/classes/:id should return a class', async () => {
        const response = await request(app)
            .get('/api/classes/1');

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name');
    });

    test('GET /api/classes/:id should reject an invalid ID', async () => {
        const response = await request(app)
            .get('/api/classes/abc');

        expect(response.statusCode).toBe(400);
    });

    test('GET /api/classes/:id should return 404 for a non-existent class', async () => {
        const response = await request(app)
            .get('/api/classes/999999');

        expect(response.statusCode).toBe(404);
    });

    // Search
    test('GET /api/classes/search should return search results', async () => {
        const response = await request(app)
            .get('/api/classes/search?name=Computer');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // POST
    test('POST /api/classes should create a class', async () => {
        const response = await request(app)
            .post('/api/classes')
            .send({
                name: `Integration Class ${Date.now()}`
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('classId');
    });

    test('POST /api/classes should reject missing class name', async () => {
        const response = await request(app)
            .post('/api/classes')
            .send({});

        expect(response.statusCode).toBe(400);
    });

    // PUT
    test('PUT /api/classes/:id should update a class', async () => {
        const response = await request(app)
            .put('/api/classes/1')
            .send({
                name: `Updated Class ${Date.now()}`
            });

        expect(response.statusCode).toBe(200);
    });

    test('PUT /api/classes/:id should reject an invalid ID', async () => {
        const response = await request(app)
            .put('/api/classes/abc')
            .send({
                name: 'Updated Class'
            });

        expect(response.statusCode).toBe(400);
    });

    test('PUT /api/classes/:id should return 404 for a non-existent class', async () => {
        const response = await request(app)
            .put('/api/classes/999999')
            .send({
                name: 'Updated Class'
            });

        expect(response.statusCode).toBe(404);
    });

    // DELETE
    test('DELETE /api/classes/:id should reject an invalid ID', async () => {
        const response = await request(app)
            .delete('/api/classes/abc');

        expect(response.statusCode).toBe(400);
    });

    test('DELETE /api/classes/:id should return 404 for a non-existent class', async () => {
        const response = await request(app)
            .delete('/api/classes/999999');

        expect(response.statusCode).toBe(404);
    });

    // Class → Students
    test('GET /api/classes/:classId/students should return students', async () => {
        const response = await request(app)
            .get('/api/classes/1/students');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Class → Teachers
    test('GET /api/classes/:classId/teachers should return teachers', async () => {
        const response = await request(app)
            .get('/api/classes/1/teachers');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Invalid relationship IDs
    test('GET /api/classes/:classId/students should reject invalid ID', async () => {
        const response = await request(app)
            .get('/api/classes/abc/students');

        expect(response.statusCode).toBe(400);
    });

    test('GET /api/classes/:classId/teachers should reject invalid ID', async () => {
        const response = await request(app)
            .get('/api/classes/abc/teachers');

        expect(response.statusCode).toBe(400);
    });

});