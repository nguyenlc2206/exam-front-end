import { KeyedObject } from '@package:src/common/types';
import { AuthService } from './auth.services';
import { UserEntity } from '@package:src/domain/entities/User';
import { AuthRepository } from '@package:src/domain/repository/auth.repository';
import { Either, failure, success } from '@package:src/common/utils/either.response';
import AppError from '@package:src/common/utils/app.error';

/** Define auth services implement */
export class AuthServicesImpl<Entity extends KeyedObject> implements AuthService<Entity> {
    private authRepository: AuthRepository<Entity>;

    constructor(authRepository: AuthRepository<Entity>) {
        this.authRepository = authRepository;
    }

    /** overiding login method */
    async login(entity: Entity): Promise<Either<KeyedObject, AppError>> {
        const res = await this.authRepository.login(entity);
        if (res?.status === 'success') {
            /** prosesing for returning userEntity */
            const initUserEntity = new UserEntity();
            const result = initUserEntity.fromUserModelToAuth(res);
            return success(result);
        }
        return failure(new AppError(res.message, res.status));
    }

    /** overiding checkAccount method */
    async checkAccount(): Promise<Either<KeyedObject, AppError>> {
        const res = await this.authRepository.checkAccount();
        if (res?.status === 'success') {
            /** prosesing for returning userEntity */
            const initUserEntity = new UserEntity();
            const result = initUserEntity.fromUserModelToAuth(res);
            return success(result);
        }
        return failure(new AppError(res.message, res.status));
    }

    /** overiding register method */
    async register(entity: Entity): Promise<Either<KeyedObject, AppError>> {
        const res = await this.authRepository.register(entity);
        if (res?.status === 'success') {
            return success({});
        }
        return failure(new AppError(res.message, res.status));
    }
}
