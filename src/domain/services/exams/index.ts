import { KeyedObject } from '@package:src/common/types';
import AppError from '@package:src/common/utils/app.error';
import { Either, failure, success } from '@package:src/common/utils/either.response';
import { ExamEntity } from '@package:src/domain/entities/Exam';
import { ExamRepository } from '@package:src/domain/repository/exam.repository';
import { ExamServices } from '@package:src/domain/services/exams/exam.services';

/** define exam services implement */
export class ExamServicesImpl<Entity extends KeyedObject> implements ExamServices<Entity> {
    private examRepository: ExamRepository<Entity>;

    constructor(examRepository: ExamRepository<Entity>) {
        this.examRepository = examRepository;
    }

    /** overiding getAll method */
    async getAll(): Promise<Either<KeyedObject, AppError>> {
        const res = await this.examRepository.getAll();
        if (res?.status === 'success') {
            /** prosesing for returning ExamEntity */
            const initExamEntity = new ExamEntity();
            const result = initExamEntity.fromExamModel(res);
            return success(result);
        }
        return failure(new AppError(res.message, res.status));
    }

    /** overiding createExam method */
    async createExam(entity: Entity): Promise<Either<KeyedObject, AppError>> {
        const res = await this.examRepository.createExam(entity);
        if (res?.status === 'success') {
            /** prosesing for returning ExamEntity */
            const initExamEntity = new ExamEntity();
            const result = initExamEntity.fromExamModelToCreate(res);
            return success(result);
        }
        return failure(new AppError(res.message, res.status));
    }

    /** overiding getExamById method */
    async getExamById(id: string): Promise<Either<KeyedObject, AppError>> {
        const res = await this.examRepository.getExamById(id);
        if (res?.status === 'success') {
            /** prosesing for returning ExamEntity */
            return success(res);
        }
        return failure(new AppError(res.message, res.status));
    }

    /** overiding asignExamUser method */
    async asignExamUser(entity: Entity): Promise<Either<KeyedObject, AppError>> {
        const res = await this.examRepository.asignExamUser(entity);
        if (res?.status === 'success') {
            /** prosesing for returning ExamEntity */
            return success(res);
        }
        return failure(new AppError(res.message, res.status));
    }

    /** overiding getByUserId method */
    async getByUserId(id: string): Promise<Either<KeyedObject, AppError>> {
        const res = await this.examRepository.getByUserId(id);
        if (res?.status === 'success') {
            /** prosesing for returning ExamEntity */
            return success(res);
        }
        return failure(new AppError(res.message, res.status));
    }

    /** overiding getAllExamsByUserId method */
    async getAllExamsByUserId(): Promise<Either<KeyedObject, AppError>> {
        const res = await this.examRepository.getAllExamsByUserId();
        if (res?.status === 'success') {
            /** prosesing for returning ExamEntity */
            return success(res);
        }
        return failure(new AppError(res.message, res.status));
    }

    /** overiding submitExam method */
    async submitExam(entity: Entity): Promise<Either<KeyedObject, AppError>> {
        const res = await this.examRepository.submitExam(entity);
        if (res?.status === 'success') {
            /** prosesing for returning ExamEntity */
            return success(res);
        }
        return failure(new AppError(res.message, res.status));
    }
}
