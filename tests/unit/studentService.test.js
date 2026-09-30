const Student = require('../../src/models/studentModel');
const studentService = require('../../src/services/studentService');

describe('Student Service - Unit Tests', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    // getStudentById
    test('getStudentById should return a student', async () => {
        const fakeStudent = {
            id: 1,
            first_name: 'John',
            last_name: 'Doe',
            email: 'john@example.com'
        };

        Student.findByPk = jest.fn().mockResolvedValue(fakeStudent);

        const result = await studentService.getStudentById(1);

        expect(Student.findByPk).toHaveBeenCalledWith(1);
        expect(result).toEqual(fakeStudent);
    });

    test('getStudentById should return null when student does not exist', async () => {
        Student.findByPk = jest.fn().mockResolvedValue(null);

        const result = await studentService.getStudentById(999);

        expect(Student.findByPk).toHaveBeenCalledWith(999);
        expect(result).toBeNull();
    });

    test('getStudentById should throw an error when database lookup fails', async () => {
        Student.findByPk = jest.fn().mockRejectedValue(
            new Error('Database error')
        );

        await expect(
            studentService.getStudentById(1)
        ).rejects.toThrow('Database error');
    });

    // createStudent
    test('createStudent should create and return a student', async () => {
        const studentData = {
            first_name: 'Jane',
            last_name: 'Smith',
            email: 'jane@example.com'
        };

        const fakeStudent = {
            id: 10,
            ...studentData
        };

        Student.create = jest.fn().mockResolvedValue(fakeStudent);

        const result = await studentService.createStudent(studentData);

        expect(Student.create).toHaveBeenCalledWith(studentData);
        expect(result).toEqual(fakeStudent);
    });

    test('createStudent should throw an error when creation fails', async () => {
        const studentData = {
            first_name: 'Jane',
            last_name: 'Smith',
            email: 'jane@example.com'
        };

        Student.create = jest.fn().mockRejectedValue(
            new Error('Database error')
        );

        await expect(
            studentService.createStudent(studentData)
        ).rejects.toThrow('Database error');
    });

    // updateStudent
    test('updateStudent should return the number of affected rows', async () => {
        Student.update = jest.fn().mockResolvedValue([1]);

        const studentData = {
            first_name: 'Michael',
            last_name: 'Smith',
            email: 'michael@example.com'
        };

        const result = await studentService.updateStudent(10, studentData);

        expect(Student.update).toHaveBeenCalledWith(
            studentData,
            { where: { id: 10 } }
        );

        expect(result).toBe(1);
    });

    test('updateStudent should return 0 when student does not exist', async () => {
        Student.update = jest.fn().mockResolvedValue([0]);

        const studentData = {
            first_name: 'Nobody',
            last_name: 'Here',
            email: 'nobody@example.com'
        };

        const result = await studentService.updateStudent(999, studentData);

        expect(Student.update).toHaveBeenCalledWith(
            studentData,
            { where: { id: 999 } }
        );

        expect(result).toBe(0);
    });

    test('updateStudent should throw an error when update fails', async () => {
        Student.update = jest.fn().mockRejectedValue(
            new Error('Database error')
        );

        const studentData = {
            first_name: 'John',
            last_name: 'Doe',
            email: 'john@example.com'
        };

        await expect(
            studentService.updateStudent(1, studentData)
        ).rejects.toThrow('Database error');
    });

    // deleteStudent
    test('deleteStudent should return the number of deleted students', async () => {
        Student.destroy = jest.fn().mockResolvedValue(1);

        const result = await studentService.deleteStudent(10);

        expect(Student.destroy).toHaveBeenCalledWith({
            where: { id: 10 }
        });

        expect(result).toBe(1);
    });

    test('deleteStudent should return 0 when student does not exist', async () => {
        Student.destroy = jest.fn().mockResolvedValue(0);

        const result = await studentService.deleteStudent(999);

        expect(Student.destroy).toHaveBeenCalledWith({
            where: { id: 999 }
        });

        expect(result).toBe(0);
    });

    test('deleteStudent should throw an error when deletion fails', async () => {
        Student.destroy = jest.fn().mockRejectedValue(
            new Error('Database error')
        );

        await expect(
            studentService.deleteStudent(1)
        ).rejects.toThrow('Database error');
    });

});