/** define answer repository */
export interface AnswerRepository<T> {
    create(entity: T): Promise<T>;
}
