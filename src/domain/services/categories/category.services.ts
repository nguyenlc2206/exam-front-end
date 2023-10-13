import { KeyedObject } from '@package:src/common/types';
import AppError from '@package:src/common/utils/app.error';
import { Either } from '@package:src/common/utils/either.response';

/** define category services */
export interface CategoryServices<Entity> {
    getAll(): Promise<Either<KeyedObject, AppError>>;
    createCategory(entity: Entity): Promise<Either<KeyedObject, AppError>>;
}
