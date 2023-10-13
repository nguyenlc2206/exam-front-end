import { KeyedObject } from '@package:src/common/types';
import AppError from '@package:src/common/utils/app.error';
import { Either, failure, success } from '@package:src/common/utils/either.response';
import { UserEntity } from '@package:src/domain/entities/User';
import { UserRepository } from '@package:src/domain/repository/user.repository';
import { UserServices } from '@package:src/domain/services/users/user.services';

/** define user services implement */
export class UserServicesImpl<Entity extends KeyedObject> implements UserServices<Entity> {
    private userRepository: UserRepository<Entity>;

    constructor(userRepository: UserRepository<Entity>) {
        this.userRepository = userRepository;
    }

    /** overiding getAll method */
    async getAll(): Promise<Either<KeyedObject, AppError>> {
        const res = await this.userRepository.getAll();
        if (res?.status === 'success') {
            /** prosesing for returning userEntity */
            const initUserEntity = new UserEntity();
            const result = initUserEntity.fromUserModelToUserAdmin(res);
            return success(result);
        }
        return failure(new AppError(res.message, res.status));
    }
}
