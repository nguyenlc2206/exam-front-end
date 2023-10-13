import { KeyedObject } from '@package:src/common/types';
import AppError from '@package:src/common/utils/app.error';
import { Either } from '@package:src/common/utils/either.response';

/** define question services */
export interface QuestionServices<Entity> {
    getQuestionsByExamId(id: string): Promise<Either<KeyedObject, AppError>>;
    create(entity: Entity): Promise<Either<KeyedObject, AppError>>;
}
