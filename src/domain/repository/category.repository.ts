/** define categories repository */
export interface CategoryRepository<T> {
    getAll(): Promise<T>;
    createCategory(entity: T): Promise<T>;
}
