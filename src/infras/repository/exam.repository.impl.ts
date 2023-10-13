import axios from '@package:src/common/utils/axios';
import { KeyedObject } from '@package:src/common/types';
import { ExamRepository } from '@package:src/domain/repository/exam.repository';

/** define exam repository implement */
export class ExamRepositoryImpl<T extends KeyedObject> implements ExamRepository<T> {
    constructor() {}

    /** overiding getAll method */
    async getAll(): Promise<T> {
        const response: T = await axios.get('/api/v1/exams');
        return response;
    }

    /** overiding createExam method */
    async createExam(entity: T): Promise<T> {
        const response: T = await axios.post('/api/v1/exams', {
            title: entity?.title,
            subTitle: entity?.subTitle,
            image: entity?.image,
            category: entity?.category
        });
        return response;
    }

    /** overiding getExamById method */
    async getExamById(id: string): Promise<T> {
        const response: T = await axios.get(`/api/v1/exams/${id}`);
        return response;
    }

    /** overiding asignExamUser method */
    async asignExamUser(entity: T): Promise<T> {
        const response: T = await axios.post('/api/v1/exam-user', {
            userId: entity?.userId,
            examId: entity?.examId
        });
        return response;
    }

    /** overiding getByUserId method */
    async getByUserId(id: string): Promise<T> {
        const response: T = await axios.get(`/api/v1/exams-user/${id}`);
        return response;
    }

    /** overiding get all exams by user id */
    async getAllExamsByUserId(): Promise<T> {
        const response: T = await axios.get('/api/v1/exams-user');
        return response;
    }

    /** overiding submit exam */
    async submitExam(entity: T): Promise<T> {
        const response: T = await axios.post('/api/v1/exams/submit', {
            ...entity.body
        });
        return response;
    }
}
