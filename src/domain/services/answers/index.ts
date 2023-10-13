import { KeyedObject } from '@package:src/common/types';
import AppError from '@package:src/common/utils/app.error';
import { Either, failure, success } from '@package:src/common/utils/either.response';
import { AnswersEntity } from '@package:src/domain/entities/Answer';
import { AnswerRepository } from '@package:src/domain/repository/answer.repository';
import { AnswerServices } from '@package:src/domain/services/answers/answer.services';

/** define answer services implement */
export class AnswerServicesImpl<Entity extends KeyedObject> implements AnswerServices<Entity> {
    private answerRepository: AnswerRepository<Entity>;

    constructor(answerRepository: AnswerRepository<Entity>) {
        this.answerRepository = answerRepository;
    }

    /** overiding create method */
    async create(entity: Entity): Promise<Either<KeyedObject, AppError>> {
        const res = await this.answerRepository.create(entity);
        if (res?.status === 'success') {
            /** prosesing for returning AnswersEntity */
            const initAnswerEntity = new AnswersEntity();
            const result = initAnswerEntity.fromAnswerModel(res);
            return success(result);
        }
        return failure(new AppError(res.message, res.status));
    }
}
