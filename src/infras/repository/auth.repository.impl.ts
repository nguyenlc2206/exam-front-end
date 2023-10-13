import { KeyedObject } from '@package:src/common/types';
import { AuthRepository } from '@package:src/domain/repository/auth.repository';
import axios from '@package:src/common/utils/axios';

/** define auth repository implement */
export class AuthRepositoryImpl<T extends KeyedObject> implements AuthRepository<T> {
    constructor() {}

    /** overiding login method */
    async login(entity: T) {
        const response: T = await axios.post('/api/v1/login', {
            email: entity?.email,
            password: entity.password
        });
        return response;
    }

    /** overiding checkAccount method */
    async checkAccount() {
        const response: T = await axios.get('/api/v1/user/check');
        return response;
    }

    /** overiding register method */
    async register(entity: T) {
        const response: T = await axios.post('/api/v1/register', { ...entity });
        return response;
    }
}
