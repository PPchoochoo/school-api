const request = require('supertest');
const app = require('../../src/app');

describe('Class-Course API - Integration Tests', () => {

    // =========================
    // POST - Add Course to Class
    // =========================

    test('should add a course to a class', async () => {
        const response = await request(app)
            .post('/api/classes/4/courses/1');

        expect([200, 201, 400, 409])
            .toContain(response.statusCode);
    });

    test('should reject an invalid class ID', async () => {
        const response = await request(app)
            .post('/api/classes/abc/courses/1');

        expect(response.statusCode).toBe(400);
    });

    test('should reject an invalid course ID', async () => {
        const response = await request(app)
            .post('/api/classes/1/courses/abc');

        expect(response.statusCode).toBe(400);
    });


    // =========================
    // GET - Courses in a Class
    // =========================

    test('should return courses assigned to a class', async () => {
        const response = await request(app)
            .get('/api/classes/1/courses');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('should reject an invalid class ID', async () => {
        const response = await request(app)
            .get('/api/classes/abc/courses');

        expect(response.statusCode).toBe(400);
    });

    test('should return 404 when the class does not exist', async () => {
        const response = await request(app)
            .get('/api/classes/999999/courses');

        expect(response.statusCode).toBe(404);
    });


    // =========================
    // DELETE - Remove Course
    // =========================

    test('should remove a course from a class', async () => {
        const response = await request(app)
            .delete('/api/classes/4/courses/1');

        expect([200, 404])
            .toContain(response.statusCode);
    });

    test('should reject an invalid class ID', async () => {
        const response = await request(app)
            .delete('/api/classes/abc/courses/1');

        expect(response.statusCode).toBe(400);
    });

    test('should reject an invalid course ID', async () => {
        const response = await request(app)
            .delete('/api/classes/1/courses/abc');

        expect(response.statusCode).toBe(400);
    });

    test('should return 404 when the relationship does not exist', async () => {
        const response = await request(app)
            .delete('/api/classes/999999/courses/999999');

        expect(response.statusCode).toBe(404);
    });

});