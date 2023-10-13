import { ExamEntity } from '@package:src/domain/entities/Exam';

/** define exam user entity */
export interface ExamUserEntity {
    id: string;
    retry: number;
    updatedAt: string;
    createdAt: string;
    deletedAt: string;
    status: boolean;
    exam: ExamEntity;
}
