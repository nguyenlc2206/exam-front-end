import { Box, Button, Grid, Stack } from '@mui/material';
import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import * as _ from 'lodash';

import SubCard from '@package:src/applications/widgets/cards/SubCard';
import CustomizedTreeView from '@package:src/applications/journey/admin/components/questions/TreeViewQuestions';
import { QuestionServicesImpl } from '@package:src/domain/services/questions';
import { QuestionRepositoryImpl } from '@package:src/infras/repository/question.repository.impl';
import { QuestionsEntity } from '@package:src/domain/entities/Question';
import { AnswersEntity } from '@package:src/domain/entities/Answer';
import AnimateButton from '@package:src/applications/widgets/buttons/AnimateButton';
import { useDispatch, useSelector } from '@package:src/common/redux/store';
import { saveListExams } from '@package:src/common/redux/slice/exam';
import { AnswerServicesImpl } from '@package:src/domain/services/answers';
import { AnswerRepositoryImpl } from '@package:src/infras/repository/answer.repository.impl';
import { openSnackbar } from '@package:src/common/redux/slice/snackbar';

// ==============================|| ADMIN QUESTIONS DASHBOARD ||============================== //

const QuestionsDashboard: FC = () => {
    /** init services */
    const questionServices = new QuestionServicesImpl(new QuestionRepositoryImpl());
    const answerServices = new AnswerServicesImpl(new AnswerRepositoryImpl());

    /** init hooks */
    const dispatch = useDispatch();
    const { exams } = useSelector((state) => state.exam);

    const { id: examId } = useParams();
    const [questions, setQuestions] = React.useState({
        data: [],
        isSubmiting: false,
        examId: examId
    });
    const [expanded, setExpanded] = React.useState<string[]>([]);
    const [changeData, setChangeData] = React.useState(false);

    const [textAnswer, setTextAnswer] = React.useState('');

    /** @todo: handle get list question exists */
    const handleGetListQuestions = async () => {
        const { isSubmiting: isSubmiting, examId: id } = exams;

        const res = await questionServices.getQuestionsByExamId(examId);
        if (res.isFailure()) return;

        // console.log('>>>Check res:', res.data?.questions);
        const _questions = {
            data: [],
            isSubmiting: false
        };
        const _indexs = [];
        res.data?.questions.map((item: QuestionsEntity, index: number) => {
            /** processing answers */
            const _answers = [];
            item?.answers.map((answer: AnswersEntity) => {
                _answers.push({
                    answerId: answer?.id,
                    title: answer?.title,
                    selected: item?.answerCorrectId ? item?.answerCorrectId === answer?.id : answer?.status
                });
            });

            /** processing questions */
            _questions.data.push({
                questionId: item?.id,
                title: item?.title,
                answerCorrectId: item?.answerCorrectId,
                answers: _answers
            });

            /** processong list indexs */
            _indexs.push(`${index + 1}`);
        });
        dispatch(
            saveListExams({
                data: _questions?.data,
                isSubmiting: false,
                examId: examId
            })
        );
        setQuestions({ ...questions, data: _questions?.data, isSubmiting: false });
        setExpanded((oldExpanded) => (oldExpanded.length === 0 ? _indexs : []));

        // if (isSubmiting || id !== examId) {
        // } else {
        //     const _indexs = [];
        //     exams.data.map((item: any, index: number) => {
        //         /** processong list indexs */
        //         _indexs.push(`${index + 1}`);
        //     });
        //     setQuestions(exams);
        //     setExpanded((oldExpanded) => (oldExpanded.length === 0 ? _indexs : []));
        // }
    };

    /** @todo: add question */
    const handleAddQuestion = () => {
        const questionsClone: any = _.cloneDeep(questions?.data);
        const _questionAdd = {
            questionId: uuidv4(),
            title: '',
            answerCorrectId: null,
            answers: []
        };
        questionsClone.push(_questionAdd);
        setQuestions({ ...questions, data: questionsClone, isSubmiting: false });
    };

    /** @todo: handle add questions */
    const handleAddAnswer = async (item: any) => {
        const questionsClone: any = _.cloneDeep(questions?.data);
        const questionFinded: any = _.find(questionsClone, { questionId: item?.questionId });
        // console.log('>>>Check question:', questionFinded);

        const uuid = uuidv4();
        questionFinded.answers.push({
            answerId: uuid,
            title: textAnswer,
            selected: false,
            setTitle: setTextAnswer
        });

        _.set(_.find(questionsClone?.data, { questionId: item?.questionId }), 'answers', questionFinded?.answers);

        setQuestions({ ...questions, data: questionsClone, isSubmiting: false });
        dispatch(
            saveListExams({
                data: questionsClone,
                isSubmiting: false,
                examId: examId
            })
        );
        // console.log('>>>Check questions:', questions);
    };

    /** @todo: handle onchange text field */
    const handleOnChangeTextFieldAnswer = (
        event: React.ChangeEvent<HTMLInputElement>,
        questionId: string,
        answerId: string
    ) => {
        const questionsClone: any = _.cloneDeep(questions?.data);
        const questionFinded: any = _.find(questionsClone, { questionId: questionId });

        _.set(_.find(questionFinded?.answers, { answerId: answerId }), 'title', event.target.value);

        _.set(_.find(questionsClone, { questionId: questionId }), 'answers', questionFinded?.answers);

        setQuestions({ ...questions, data: questionsClone, isSubmiting: false });
        dispatch(
            saveListExams({
                data: questionsClone,
                isSubmiting: false,
                examId: examId
            })
        );
    };

    /** @todo: handleOnChangeTextFieldQuestion */
    const handleOnChangeTextFieldQuestion = (event: React.ChangeEvent<HTMLInputElement>, questionId: string) => {
        const questionsClone: any = _.cloneDeep(questions?.data);

        _.set(_.find(questionsClone, { questionId: questionId }), 'title', event.target.value);

        setQuestions({ ...questions, data: questionsClone, isSubmiting: false });

        dispatch(
            saveListExams({
                data: questionsClone,
                isSubmiting: false,
                examId: examId
            })
        );
    };

    /** @todo: handle select answer */
    const handSelectAnswer = (event: React.ChangeEvent<HTMLInputElement>, questionId: string, answerId: string) => {
        const questionsClone: any = _.cloneDeep(questions?.data);
        const questionFinded: any = _.find(questionsClone, { questionId: questionId });

        _.set(_.find(questionFinded?.answers, { answerId: answerId }), 'selected', event.target.checked);

        _.set(_.find(questionsClone, { questionId: questionId }), 'answers', questionFinded?.answers);

        setQuestions({ ...questions, data: questionsClone, isSubmiting: false });
        dispatch(
            saveListExams({
                data: questionsClone,
                isSubmiting: false,
                examId: examId
            })
        );
    };

    /** @todo: handle remove answer */
    const handleRemoveAnswer = async (questionId: string, answerId: string) => {
        // console.log('>>>Check id:', questionId, answerId);
        const _questionsClone = _.cloneDeep(questions?.data);
        const questionFinded: any = _.find(_questionsClone, { questionId: questionId });
        const answerIndex: any = _.findIndex(questionFinded?.answers, { answerId: answerId });

        /** remove answer */
        _.pullAt(questionFinded?.answers, [answerIndex]);

        _.set(_.find(_questionsClone, { questionId: questionId }), 'answers', questionFinded?.answers);

        setQuestions({ ...questions, data: _questionsClone, isSubmiting: false });
        dispatch(
            saveListExams({
                data: _questionsClone,
                isSubmiting: false,
                examId: examId
            })
        );
        // console.log('>>>Check questions:', questions);
    };

    /** @todo: handle create questions */
    const hanleCreateQuestions = async () => {
        /** processing questions */
        const _questionUpdate = [];
        questions.data.map((item: any) => {
            _questionUpdate.push({
                id: item?.questionId,
                title: item?.title,
                subTitle: item?.title
            });
        });

        // console.log('>>>Check questions:', {
        //     examId: examId,
        //     questions: _questionUpdate
        // });

        const reQuestions = await questionServices.create({ examId: examId, questions: _questionUpdate });
        if (reQuestions.isFailure()) return;

        // console.log('>>>Check res:', res.data);
        dispatch(
            openSnackbar({
                open: true,
                message: reQuestions.data?.message,
                variant: 'alert',
                alert: {
                    color: 'success'
                },
                close: false
            })
        );
        setChangeData(!changeData);
    };

    /** @todo: handle call service create answers */
    const handleCreateAnswers = async () => {
        /** processing answers */
        const _answersUpdate = [];

        questions.data.map((item: any) => {
            /** processing answers */
            const _answers = [];
            item?.answers.map((answer: any) => {
                _answers.push({
                    id: answer?.answerId,
                    title: answer.title,
                    select: answer.selected
                });
            });

            /** processing questions */
            _answersUpdate.push({
                questionId: item?.questionId,
                answers: _answers
            });
        });

        // console.log('>>>Check answers:', _answersUpdate);

        /** call services create answer */
        const resAnswer = await answerServices.create({ data: _answersUpdate });
        if (resAnswer.isFailure()) return;

        // console.log('>>>Check res:', res.data);
        dispatch(
            openSnackbar({
                open: true,
                message: resAnswer.data?.message,
                variant: 'alert',
                alert: {
                    color: 'success'
                },
                close: false
            })
        );
        setChangeData(!changeData);
    };

    /** useEffect */
    useEffect(() => {
        handleGetListQuestions();
    }, [changeData]);

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <SubCard title={`Questions with id ${examId}`}>
                        <CustomizedTreeView
                            questions={questions.data}
                            handleAddAnswer={handleAddAnswer}
                            handleRemoveAnswer={handleRemoveAnswer}
                            handleOnChangeTextFieldQuestion={handleOnChangeTextFieldQuestion}
                            handleOnChangeTextFieldAnswer={handleOnChangeTextFieldAnswer}
                            handSelectAnswer={handSelectAnswer}
                            expanded={expanded}
                            setExpanded={setExpanded}
                        />
                        {questions.data.length ? (
                            <Stack sx={{ m: 2 }} direction='row' spacing={0.25} alignItems='center'>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Button
                                        color='primary'
                                        disabled={false}
                                        size='large'
                                        type='submit'
                                        variant='contained'
                                        onClick={handleAddQuestion}
                                    >
                                        Add question
                                    </Button>
                                </Box>
                                <Box sx={{ display: 'flex' }}>
                                    <Button
                                        color='secondary'
                                        disabled={false}
                                        size='large'
                                        type='submit'
                                        variant='contained'
                                        onClick={handleCreateAnswers}
                                    >
                                        Submit Answers
                                    </Button>
                                    <Box width={'12px'}></Box>
                                    <Button
                                        color='warning'
                                        disabled={false}
                                        size='large'
                                        type='submit'
                                        variant='contained'
                                        onClick={hanleCreateQuestions}
                                    >
                                        Submit Questions
                                    </Button>
                                </Box>
                            </Stack>
                        ) : (
                            <>
                                <Box sx={{ mt: 2 }}>
                                    <Button
                                        color='secondary'
                                        disabled={false}
                                        size='large'
                                        type='submit'
                                        variant='contained'
                                        onClick={handleAddQuestion}
                                    >
                                        Add question
                                    </Button>
                                </Box>
                            </>
                        )}
                    </SubCard>
                </Grid>
            </Grid>
        </>
    );
};

export default QuestionsDashboard;
