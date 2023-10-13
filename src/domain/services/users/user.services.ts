import { KeyedObject } from '@package:src/common/types';
import AppError from '@package:src/common/utils/app.error';
import { Either } from '@package:src/common/utils/either.response';

/** define user services */
export interface UserServices<Entity> {
    getAll(): Promise<Either<KeyedObject, AppError>>;
}
