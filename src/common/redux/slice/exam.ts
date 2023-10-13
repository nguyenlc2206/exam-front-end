import { createSlice } from '@reduxjs/toolkit';

// project imports

type AnswerType = {
    answerId: string;
    title: string;
    selected: boolean;
};

type QuestionType = {
    questionId: string;
    title: string;
    answers: AnswerType[];
};

// initial state
const initialState: any = {
    exams: {
        data: [] as QuestionType[],
        isSubmiting: false,
        examId: ''
    }
};

// ==============================|| SLICE - EXAMS ||============================== //

const exam = createSlice({
    name: 'exam',
    initialState,
    reducers: {
        //  SAVE LIST EXAMS
        saveListExams(state, action) {
            state.exams = action.payload;
        }
    }
});

// Reducer
export default exam.reducer;

export const { saveListExams } = exam.actions;
