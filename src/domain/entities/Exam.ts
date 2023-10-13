import { KeyedObject } from '@package:src/common/types';
import { QuestionsEntity } from '@package:src/domain/entities/Question';

// * Define exam entity type
export class ExamEntity {
    id: string;
    title: string;
    subTitle: string;
    image: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    questions?: QuestionsEntity[];
    selected?: boolean;

    fromExamModel(examModel: KeyedObject) {
        return {
            exams: examModel?.data?.items as ExamEntity[],
            message: examModel?.message,
            status: examModel?.status
        } as KeyedObject;
    }

    fromExamModelToCreate(examModel: KeyedObject) {
        return {
            exam: examModel?.data?.exam as ExamEntity,
            message: examModel?.message,
            status: examModel?.status
        } as KeyedObject;
    }
}
