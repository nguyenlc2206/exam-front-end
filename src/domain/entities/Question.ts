import { KeyedObject } from '@package:src/common/types';
import { AnswersEntity } from '@package:src/domain/entities/Answer';

// * Define question entity type
export class QuestionsEntity {
    id: string;
    title: string;
    subTitle: string;
    image: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    answerCorrectId: string | null;
    answers?: AnswersEntity[];
    selected?: boolean;
    answerUserId?: string;
    isCorrect?: boolean;

    fromQuestionModel(questionModel: KeyedObject) {
        return {
            data: questionModel?.data?.questions as QuestionsEntity[],
            message: questionModel?.message,
            status: questionModel?.status
        } as KeyedObject;
    }
}
