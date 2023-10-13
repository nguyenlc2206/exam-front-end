import axios from '@package:src/common/utils/axios';
import { KeyedObject } from '@package:src/common/types';
import { CategoryRepository } from '@package:src/domain/repository/category.repository';

/** /** define class category repositpy implement */
export class CategoryRepositoryImpl<T extends KeyedObject> implements CategoryRepository<T> {
    constructor() {}

    /** overiding getAll method */
    async getAll(): Promise<T> {
        const response: T = await axios.get('/api/v1/categories');
        return response;
    }

    /** overiding create category method */
    async createCategory(entity: T): Promise<T> {
        const response: T = await axios.post('/api/v1/categories', { name: entity?.name });
        return response;
    }
}
