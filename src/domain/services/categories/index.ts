import { KeyedObject } from '@package:src/common/types';
import { CategoryServices } from './category.services';
import { CategoryRepository } from '@package:src/domain/repository/category.repository';
import { Either, failure, success } from '@package:src/common/utils/either.response';
import AppError from '@package:src/common/utils/app.error';
import { CategoryEntity } from '@package:src/domain/entities/Category';

/** define category services implement */
export class CategoryServicesImpl<Entity extends KeyedObject> implements CategoryServices<Entity> {
    private categoryRepository: CategoryRepository<Entity>;

    constructor(categoryRepository: CategoryRepository<Entity>) {
        this.categoryRepository = categoryRepository;
    }

    /** overiding getAll method */
    async getAll(): Promise<Either<KeyedObject, AppError>> {
        const res = await this.categoryRepository.getAll();
        if (res?.status === 'success') {
            /** prosesing for returning CategoryEntity */
            const initUserEntity = new CategoryEntity();
            const result = initUserEntity.fromCategoryModel(res);
            return success(result);
        }
        return failure(new AppError(res.message, res.status));
    }

    /** create category method */
    async createCategory(entity: Entity): Promise<Either<KeyedObject, AppError>> {
        const res = await this.categoryRepository.createCategory(entity);
        if (res?.status === 'success') {
            /** prosesing for returning CategoryEntity */
            return success(res.data);
        }
        return failure(new AppError(res.message, res.status));
    }
}
