import axios from '@package:src/common/utils/axios';
import { KeyedObject } from '@package:src/common/types';
import { QuestionRepository } from '@package:src/domain/repository/question.repository';

/** define class questions repositpy implement */
export class QuestionRepositoryImpl<T extends KeyedObject> implements QuestionRepository<T> {
    constructor() {}

    /** overiding getQuestionsByExamId method */
    async getQuestionsByExamId(id: string): Promise<T> {
        const response: T = await axios.get(`/api/v1/questions/${id}`);
        return response;
    }

    /** overiding create method */
    async create(entity: T): Promise<T> {
        const response: T = await axios.post('/api/v1/questions', {
            examId: entity?.examId,
            questions: entity?.questions
        });
        return response;
    }
}
