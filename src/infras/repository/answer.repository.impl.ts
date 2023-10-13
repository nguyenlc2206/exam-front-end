import axios from '@package:src/common/utils/axios';
import { KeyedObject } from '@package:src/common/types';
import { AnswerRepository } from '@package:src/domain/repository/answer.repository';

/** define class answer repositpy implement */
export class AnswerRepositoryImpl<T extends KeyedObject> implements AnswerRepository<T> {
    constructor() {}

    /** overiding create method */
    async create(entity: T): Promise<T> {
        const response: T = await axios.post('/api/v1/anwsers', {
            data: entity?.data
        });
        return response;
    }
}
