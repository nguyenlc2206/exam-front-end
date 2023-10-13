import { KeyedObject } from '@package:src/common/types';
import AppError from '@package:src/common/utils/app.error';
import { Either } from '@package:src/common/utils/either.response';

/** define answer services */
export interface AnswerServices<Entity> {
    create(entity: Entity): Promise<Either<KeyedObject, AppError>>;
}
