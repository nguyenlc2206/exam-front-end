/** define authentication repository */
export interface AuthRepository<T> {
    login(entity: T): Promise<T>;
    checkAccount(): Promise<T>;
    register(entity: T): Promise<T>;
}
