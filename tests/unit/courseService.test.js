const Course = require('../../src/models/courseModel');
const courseService = require('../../src/services/courseService');

describe('Course Service - Unit Tests', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    // getCourseById
    test('getCourseById should return a course', async () => {
        const fakeCourse = {
            id: 1,
            name: 'Database Systems',
            teacher_id: 1
        };

        Course.findByPk = jest.fn().mockResolvedValue(fakeCourse);

        const result = await courseService.getCourseById(1);

        expect(Course.findByPk).toHaveBeenCalledWith(1);
        expect(result).toEqual(fakeCourse);
    });

    test('getCourseById should return null when course does not exist', async () => {
        Course.findByPk = jest.fn().mockResolvedValue(null);

        const result = await courseService.getCourseById(999);

        expect(Course.findByPk).toHaveBeenCalledWith(999);
        expect(result).toBeNull();
    });

    test('getCourseById should throw an error when lookup fails', async () => {
        Course.findByPk = jest.fn().mockRejectedValue(
            new Error('Database error')
        );

        await expect(
            courseService.getCourseById(1)
        ).rejects.toThrow('Database error');
    });

    // createCourse
    test('createCourse should create and return a course', async () => {
        const courseData = {
            name: 'Database Systems',
            teacher_id: 1
        };

        const fakeCourse = {
            id: 10,
            ...courseData
        };

        Course.create = jest.fn().mockResolvedValue(fakeCourse);

        const result = await courseService.createCourse(courseData);

        expect(Course.create).toHaveBeenCalledWith(courseData);
        expect(result).toEqual(fakeCourse);
    });

    test('createCourse should throw an error when creation fails', async () => {
        Course.create = jest.fn().mockRejectedValue(
            new Error('Database error')
        );

        await expect(
            courseService.createCourse({
                name: 'Database Systems',
                teacher_id: 1
            })
        ).rejects.toThrow('Database error');
    });

    // updateCourse
    test('updateCourse should return the number of affected rows', async () => {
        Course.update = jest.fn().mockResolvedValue([1]);

        const result = await courseService.updateCourse(
            1,
            'Advanced Database Systems',
            1
        );

        expect(Course.update).toHaveBeenCalledWith(
            {
                name: 'Advanced Database Systems',
                teacher_id: 1
            },
            {
                where: { id: 1 }
            }
        );

        expect(result).toBe(1);
    });

    test('updateCourse should return 0 when course does not exist', async () => {
        Course.update = jest.fn().mockResolvedValue([0]);

        const result = await courseService.updateCourse(
            999,
            'Nobody Course',
            1
        );

        expect(Course.update).toHaveBeenCalledWith(
            {
                name: 'Nobody Course',
                teacher_id: 1
            },
            {
                where: { id: 999 }
            }
        );

        expect(result).toBe(0);
    });

    test('updateCourse should throw an error when update fails', async () => {
        Course.update = jest.fn().mockRejectedValue(
            new Error('Database error')
        );

        await expect(
            courseService.updateCourse(
                1,
                'Database Systems',
                1
            )
        ).rejects.toThrow('Database error');
    });

    // deleteCourse
    test('deleteCourse should return the number of deleted courses', async () => {
        Course.destroy = jest.fn().mockResolvedValue(1);

        const result = await courseService.deleteCourse(1);

        expect(Course.destroy).toHaveBeenCalledWith({
            where: { id: 1 }
        });

        expect(result).toBe(1);
    });

    test('deleteCourse should return 0 when course does not exist', async () => {
        Course.destroy = jest.fn().mockResolvedValue(0);

        const result = await courseService.deleteCourse(999);

        expect(Course.destroy).toHaveBeenCalledWith({
            where: { id: 999 }
        });

        expect(result).toBe(0);
    });

    test('deleteCourse should throw an error when deletion fails', async () => {
        Course.destroy = jest.fn().mockRejectedValue(
            new Error('Database error')
        );

        await expect(
            courseService.deleteCourse(1)
        ).rejects.toThrow('Database error');
    });

});