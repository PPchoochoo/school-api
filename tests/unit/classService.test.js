const Class = require('../../src/models/classModel');
const classService = require('../../src/services/classService');

describe('Class Service - Unit Tests', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    // getClassById
    test('getClassById should return a class', async () => {
        const fakeClass = {
            id: 1,
            name: 'Computer Science 2A'
        };

        Class.findByPk = jest.fn().mockResolvedValue(fakeClass);

        const result = await classService.getClassById(1);

        expect(Class.findByPk).toHaveBeenCalledWith(1);
        expect(result).toEqual(fakeClass);
    });

    test('getClassById should return null when class does not exist', async () => {
        Class.findByPk = jest.fn().mockResolvedValue(null);

        const result = await classService.getClassById(999);

        expect(Class.findByPk).toHaveBeenCalledWith(999);
        expect(result).toBeNull();
    });

    test('getClassById should throw an error when lookup fails', async () => {
        Class.findByPk = jest.fn().mockRejectedValue(
            new Error('Database error')
        );

        await expect(
            classService.getClassById(1)
        ).rejects.toThrow('Database error');
    });

    // createClass
    test('createClass should create and return a class', async () => {
        const classData = {
            name: 'Computer Science 2A'
        };

        const fakeClass = {
            id: 10,
            ...classData
        };

        Class.create = jest.fn().mockResolvedValue(fakeClass);

        const result = await classService.createClass(classData);

        expect(Class.create).toHaveBeenCalledWith(classData);
        expect(result).toEqual(fakeClass);
    });

    test('createClass should throw an error when creation fails', async () => {
        Class.create = jest.fn().mockRejectedValue(
            new Error('Database error')
        );

        await expect(
            classService.createClass({
                name: 'Computer Science 2A'
            })
        ).rejects.toThrow('Database error');
    });

    // updateClass
    test('updateClass should return the number of affected rows', async () => {
        Class.update = jest.fn().mockResolvedValue([1]);

        const result = await classService.updateClass(
            1,
            'Computer Science 2B'
        );

        expect(Class.update).toHaveBeenCalledWith(
            {
                name: 'Computer Science 2B'
            },
            {
                where: { id: 1 }
            }
        );

        expect(result).toBe(1);
    });

    test('updateClass should return 0 when class does not exist', async () => {
        Class.update = jest.fn().mockResolvedValue([0]);

        const result = await classService.updateClass(
            999,
            'Nobody Class'
        );

        expect(Class.update).toHaveBeenCalledWith(
            {
                name: 'Nobody Class'
            },
            {
                where: { id: 999 }
            }
        );

        expect(result).toBe(0);
    });

    test('updateClass should throw an error when update fails', async () => {
        Class.update = jest.fn().mockRejectedValue(
            new Error('Database error')
        );

        await expect(
            classService.updateClass(
                1,
                'Computer Science 2B'
            )
        ).rejects.toThrow('Database error');
    });

    // deleteClass
    test('deleteClass should return the number of deleted classes', async () => {
        Class.destroy = jest.fn().mockResolvedValue(1);

        const result = await classService.deleteClass(1);

        expect(Class.destroy).toHaveBeenCalledWith({
            where: { id: 1 }
        });

        expect(result).toBe(1);
    });

    test('deleteClass should return 0 when class does not exist', async () => {
        Class.destroy = jest.fn().mockResolvedValue(0);

        const result = await classService.deleteClass(999);

        expect(Class.destroy).toHaveBeenCalledWith({
            where: { id: 999 }
        });

        expect(result).toBe(0);
    });

    test('deleteClass should throw an error when deletion fails', async () => {
        Class.destroy = jest.fn().mockRejectedValue(
            new Error('Database error')
        );

        await expect(
            classService.deleteClass(1)
        ).rejects.toThrow('Database error');
    });

});