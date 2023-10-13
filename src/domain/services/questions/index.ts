import { KeyedObject } from '@package:src/common/types';
import AppError from '@package:src/common/utils/app.error';
import { Either, failure, success } from '@package:src/common/utils/either.response';
import { QuestionsEntity } from '@package:src/domain/entities/Question';
import { QuestionRepository } from '@package:src/domain/repository/question.repository';
import { QuestionServices } from '@package:src/domain/services/questions/question.services';

/** define question services implement */
export class QuestionServicesImpl<Entity extends KeyedObject> implements QuestionServices<Entity> {
    private questionRepository: QuestionRepository<Entity>;

    constructor(questionRepository: QuestionRepository<Entity>) {
        this.questionRepository = questionRepository;
    }

    /** overiding getQuestionsByExamId method */
    async getQuestionsByExamId(id: string): Promise<Either<KeyedObject, AppError>> {
        const res = await this.questionRepository.getQuestionsByExamId(id);
        if (res?.status === 'success') {
            /** prosesing for returning questionEntity */
            return success(res?.data);
        }
        return failure(new AppError(res.message, res.status));
    }

    /** overiding create method */
    async create(entity: Entity): Promise<Either<KeyedObject, AppError>> {
        const res = await this.questionRepository.create(entity);
        if (res?.status === 'success') {
            /** prosesing for returning AnswersEntity */
            const initQuestionEntity = new QuestionsEntity();
            const result = initQuestionEntity.fromQuestionModel(res);
            return success(result);
        }
        return failure(new AppError(res.message, res.status));
    }
}
