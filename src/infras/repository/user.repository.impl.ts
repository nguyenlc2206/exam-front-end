import axios from '@package:src/common/utils/axios';
import { KeyedObject } from '@package:src/common/types';
import { UserRepository } from '@package:src/domain/repository/user.repository';

/** define class user repositpy implement */
export class UserRepositoryImpl<T extends KeyedObject> implements UserRepository<T> {
    constructor() {}

    /** overiding getAll method */
    async getAll(): Promise<T> {
        const response: T = await axios.get('/api/v1/users');
        return response;
    }
}
