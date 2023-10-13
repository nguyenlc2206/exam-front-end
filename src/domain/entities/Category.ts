import { KeyedObject } from '@package:src/common/types';

// * Define category entity type
export class CategoryEntity {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;

    fromCategoryModel(userModel: KeyedObject) {
        return {
            categories: userModel?.data?.items as CategoryEntity[],
            message: userModel?.message,
            status: userModel?.status
        } as KeyedObject;
    }
}
