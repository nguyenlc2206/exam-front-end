/** define question repository */
export interface QuestionRepository<T> {
    getQuestionsByExamId(id: string): Promise<T>;
    create(entity: T): Promise<T>;
}
