import { KeyedObject } from '@package:src/common/types';

// * Define answer entity type
export class AnswersEntity {
    id?: string;
    title: string;
    subTitle?: string;
    status?: boolean;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;

    fromAnswerModel(answerModel: KeyedObject) {
        return {
            data: answerModel?.data?.answers as AnswersEntity[],
            message: answerModel?.message,
            status: answerModel?.status
        } as KeyedObject;
    }
}
