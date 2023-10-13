import { KeyedObject } from '@package:src/common/types';
import AppError from '@package:src/common/utils/app.error';
import { Either } from '@package:src/common/utils/either.response';

/** define exam services */
export interface ExamServices<Entity> {
    getAll(): Promise<Either<KeyedObject, AppError>>;
    createExam(entity: Entity): Promise<Either<KeyedObject, AppError>>;
    getExamById(id: string): Promise<Either<KeyedObject, AppError>>;
    asignExamUser(entity: Entity): Promise<Either<KeyedObject, AppError>>;
    getByUserId(id: string): Promise<Either<KeyedObject, AppError>>;
    getAllExamsByUserId(): Promise<Either<KeyedObject, AppError>>;
    submitExam(entity: Entity): Promise<Either<KeyedObject, AppError>>;
}
