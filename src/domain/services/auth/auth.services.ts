import { KeyedObject } from '@package:src/common/types';
import AppError from '@package:src/common/utils/app.error';
import { Either } from '@package:src/common/utils/either.response';

/** define auth services */
export interface AuthService<Entity> {
    login(entity: Entity): Promise<Either<KeyedObject, AppError>>;
    checkAccount(): Promise<Either<KeyedObject, AppError>>;
    register(entity: Entity): Promise<Either<KeyedObject, AppError>>;
}
