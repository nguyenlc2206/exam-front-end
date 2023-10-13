/** define user repository */
export interface UserRepository<T> {
    getAll(): Promise<T>;
}
