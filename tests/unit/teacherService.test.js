const Teacher = require('../../src/models/teacherModel');
const teacherService = require('../../src/services/teacherService');

describe('Teacher Service - Unit Tests', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    // getTeacherById
    test('getTeacherById should return a teacher', async () => {
        const fakeTeacher = {
            id: 1,
            first_name: 'John',
            last_name: 'Doe',
            email: 'john@example.com'
        };

        Teacher.findByPk = jest.fn().mockResolvedValue(fakeTeacher);

        const result = await teacherService.getTeacherById(1);

        expect(Teacher.findByPk).toHaveBeenCalledWith(1);
        expect(result).toEqual(fakeTeacher);
    });

    test('getTeacherById should return null when teacher does not exist', async () => {
        Teacher.findByPk = jest.fn().mockResolvedValue(null);

        const result = await teacherService.getTeacherById(999);

        expect(Teacher.findByPk).toHaveBeenCalledWith(999);
        expect(result).toBeNull();
    });

    test('getTeacherById should throw an error when lookup fails', async () => {
        Teacher.findByPk = jest.fn().mockRejectedValue(
            new Error('Database error')
        );

        await expect(
            teacherService.getTeacherById(1)
        ).rejects.toThrow('Database error');
    });

    // createTeacher
    test('createTeacher should create and return a teacher', async () => {
        const teacherData = {
            first_name: 'Jane',
            last_name: 'Smith',
            email: 'jane@example.com'
        };

        const fakeTeacher = {
            id: 10,
            ...teacherData
        };

        Teacher.create = jest.fn().mockResolvedValue(fakeTeacher);

        const result = await teacherService.createTeacher(teacherData);

        expect(Teacher.create).toHaveBeenCalledWith(teacherData);
        expect(result).toEqual(fakeTeacher);
    });

    test('createTeacher should throw an error when creation fails', async () => {
        Teacher.create = jest.fn().mockRejectedValue(
            new Error('Database error')
        );

        await expect(
            teacherService.createTeacher({
                first_name: 'Jane',
                last_name: 'Smith',
                email: 'jane@example.com'
            })
        ).rejects.toThrow('Database error');
    });

    // updateTeacher
    test('updateTeacher should return the number of affected rows', async () => {
        Teacher.update = jest.fn().mockResolvedValue([1]);

        const result = await teacherService.updateTeacher(
            1,
            'Michael',
            'Smith',
            'michael@example.com'
        );

        expect(Teacher.update).toHaveBeenCalledWith(
            {
                first_name: 'Michael',
                last_name: 'Smith',
                email: 'michael@example.com'
            },
            {
                where: { id: 1 }
            }
        );

        expect(result).toBe(1);
    });

    test('updateTeacher should return 0 when teacher does not exist', async () => {
        Teacher.update = jest.fn().mockResolvedValue([0]);

        const result = await teacherService.updateTeacher(
            999,
            'Nobody',
            'Here',
            'nobody@example.com'
        );

        expect(Teacher.update).toHaveBeenCalledWith(
            {
                first_name: 'Nobody',
                last_name: 'Here',
                email: 'nobody@example.com'
            },
            {
                where: { id: 999 }
            }
        );

        expect(result).toBe(0);
    });

    test('updateTeacher should throw an error when update fails', async () => {
        Teacher.update = jest.fn().mockRejectedValue(
            new Error('Database error')
        );

        await expect(
            teacherService.updateTeacher(
                1,
                'John',
                'Doe',
                'john@example.com'
            )
        ).rejects.toThrow('Database error');
    });

    // deleteTeacher
    test('deleteTeacher should return the number of deleted teachers', async () => {
        Teacher.destroy = jest.fn().mockResolvedValue(1);

        const result = await teacherService.deleteTeacher(1);

        expect(Teacher.destroy).toHaveBeenCalledWith({
            where: { id: 1 }
        });

        expect(result).toBe(1);
    });

    test('deleteTeacher should return 0 when teacher does not exist', async () => {
        Teacher.destroy = jest.fn().mockResolvedValue(0);

        const result = await teacherService.deleteTeacher(999);

        expect(Teacher.destroy).toHaveBeenCalledWith({
            where: { id: 999 }
        });

        expect(result).toBe(0);
    });

    test('deleteTeacher should throw an error when deletion fails', async () => {
        Teacher.destroy = jest.fn().mockRejectedValue(
            new Error('Database error')
        );

        await expect(
            teacherService.deleteTeacher(1)
        ).rejects.toThrow('Database error');
    });

});