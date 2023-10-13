/** define exam repository */
export interface ExamRepository<T> {
    getAll(): Promise<T>;
    createExam(entity: T): Promise<T>;
    getExamById(id: string): Promise<T>;
    asignExamUser(entity: T): Promise<T>;
    getByUserId(id: string): Promise<T>;
    getAllExamsByUserId(): Promise<T>;
    submitExam(entity: T): Promise<T>;
}
