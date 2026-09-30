const Class = require('../../src/models/classModel');
const ClassCourse = require('../../src/models/classCourseModel');
const classCourseService = require('../../src/services/classCourseService');

describe('Class-Course Service - Unit Tests', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    // addCourseToClass
    test('addCourseToClass should create a class-course relationship', async () => {
        const relationship = {
            class_id: 1,
            course_id: 1
        };

        ClassCourse.create = jest.fn().mockResolvedValue(relationship);

        const result =
            await classCourseService.addCourseToClass(1, 1);

        expect(ClassCourse.create).toHaveBeenCalledWith({
            class_id: 1,
            course_id: 1
        });

        expect(result).toEqual(relationship);
    });

    test('addCourseToClass should throw an error when creation fails', async () => {
        ClassCourse.create = jest.fn().mockRejectedValue(
            new Error('Database error')
        );

        await expect(
            classCourseService.addCourseToClass(1, 1)
        ).rejects.toThrow('Database error');
    });

    // getCoursesByClass
    test('getCoursesByClass should return courses for a class', async () => {
        const fakeCourses = [
            {
                id: 1,
                name: 'Database Systems'
            },
            {
                id: 2,
                name: 'Computer Networks'
            }
        ];

        const fakeClass = {
            id: 1,
            Courses: fakeCourses
        };

        Class.findByPk = jest.fn().mockResolvedValue(fakeClass);

        const result =
            await classCourseService.getCoursesByClass(1);

        expect(Class.findByPk).toHaveBeenCalledWith(
            1,
            expect.objectContaining({
                include: expect.anything()
            })
        );

        expect(result).toEqual(fakeCourses);
    });

    test('getCoursesByClass should return an empty array when no courses exist', async () => {
        const fakeClass = {
            id: 1,
            Courses: []
        };

        Class.findByPk = jest.fn().mockResolvedValue(fakeClass);

        const result =
            await classCourseService.getCoursesByClass(1);

        expect(result).toEqual([]);
    });

    test('getCoursesByClass should return null when class does not exist', async () => {
        Class.findByPk = jest.fn().mockResolvedValue(null);

        const result = await classCourseService.getCoursesByClass(999);

        expect(result).toBeNull();
    });

    test('getCoursesByClass should throw an error when lookup fails', async () => {
        Class.findByPk = jest.fn().mockRejectedValue(
            new Error('Database error')
        );

        await expect(
            classCourseService.getCoursesByClass(1)
        ).rejects.toThrow('Database error');
    });

    // removeCourseFromClass
    test('removeCourseFromClass should delete a class-course relationship', async () => {
        ClassCourse.destroy = jest.fn().mockResolvedValue(1);

        const result =
            await classCourseService.removeCourseFromClass(1, 1);

        expect(ClassCourse.destroy).toHaveBeenCalledWith({
            where: {
                class_id: 1,
                course_id: 1
            }
        });

        expect(result).toBe(1);
    });

    test('removeCourseFromClass should return 0 when relationship does not exist', async () => {
        ClassCourse.destroy = jest.fn().mockResolvedValue(0);

        const result =
            await classCourseService.removeCourseFromClass(999, 999);

        expect(result).toBe(0);
    });

    test('removeCourseFromClass should throw an error when deletion fails', async () => {
        ClassCourse.destroy = jest.fn().mockRejectedValue(
            new Error('Database error')
        );

        await expect(
            classCourseService.removeCourseFromClass(1, 1)
        ).rejects.toThrow('Database error');
    });

});