import * as _ from 'lodash';
import React from 'react';

import {
    Alert,
    Button,
    Checkbox,
    Container,
    Dialog,
    FormControlLabel,
    FormGroup,
    Grid,
    Typography
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import MainCard from '@package:src/applications/widgets/cards/MainCard';
import SubCard from '@package:src/applications/widgets/cards/SubCard';
import { QuestionsEntity } from '@package:src/domain/entities/Question';
import { ExamServicesImpl } from '@package:src/domain/services/exams';
import { ExamRepositoryImpl } from '@package:src/infras/repository/exam.repository.impl';
import { useParams } from 'react-router-dom';
import { AnswersEntity } from '@package:src/domain/entities/Answer';
import { KeyedObject } from '@package:src/common/types';
import { useDispatch } from '@package:src/common/redux/store';
import { openSnackbar } from '@package:src/common/redux/slice/snackbar';

// ==============================|| QUESTIONS PAGE ||============================== //
type QuestionSubmit = {
    questionId: string;
    answerId: string;
};

const SectionWrapper = styled('div')({
    paddingTop: 100,
    paddingBottom: 100,
    height: '100vh',
    backgroundColor: '#eef2f6'
});

interface SimpleDialogProps {
    onClose: (s: string) => void;
    open: boolean;
    point: number;
}

function SimpleDialog({ onClose, open, point }: SimpleDialogProps) {
    const theme = useTheme();

    return (
        <Dialog onClose={onClose} aria-labelledby='simple-dialog-title' open={open}>
            {open && (
                <>
                    <Alert variant='outlined' severity='info' sx={{ borderColor: theme.palette.primary.main, m: 1 }}>
                        {`Bạn đạt được ${point} điểm.`}
                    </Alert>
                </>
            )}
        </Dialog>
    );
}

const QuestionsClientPage = () => {
    /** init services */
    const examServices = new ExamServicesImpl(new ExamRepositoryImpl());

    /** init hooks */
    const theme = useTheme();
    const dispatch = useDispatch();

    const [questions, setQuestions] = React.useState<QuestionsEntity[]>([]);
    const [questionSelect, setQuestionSelect] = React.useState<QuestionsEntity>();
    const [titleExam, setTitleExam] = React.useState<string>('');
    const [isSubmiting, setIsSubmiting] = React.useState<boolean>(false);

    const [open, setOpen] = React.useState<boolean>(false);
    const [point, setPoint] = React.useState<number>(0);

    /** init variables */
    const { id: examId } = useParams();

    /** handle get question by exam id */
    const handleGetQuestionsByExamId = async () => {
        const res = await examServices.getExamById(examId);
        if (res.isFailure()) return;

        let _isSubmit: boolean = true;
        res.data?.data?.exams?.questions.map((item: QuestionsEntity) => {
            if (item?.answerUserId && item?.answerCorrectId) {
                if (item?.answerUserId === item?.answerCorrectId) {
                    _.set(_.find(res.data?.data?.exams?.questions, { id: item?.id }), 'isCorrect', true);
                }
                _isSubmit = _isSubmit && item?.answerCorrectId === null;
            }
        });
        setIsSubmiting(!_isSubmit);

        /** processing answers */
        if (res?.data?.data?.exams?.questions.length) {
            res?.data?.data?.exams?.questions.map((item: any) => {
                item['selected'] = false;
                if (item?.answers.length) {
                    item?.answers.map((item: any) => {
                        item['status'] = false;
                    });
                }
            });

            /** processing answers selected */
            res.data.data.exams.questions[0]['selected'] = true;
        }

        /** set questions and selected */
        setQuestions(res?.data?.data?.exams?.questions);
        setQuestionSelect(res?.data?.data?.exams?.questions[0]);
        setTitleExam(res?.data?.data?.exams?.title);
    };

    /** handle change question */
    const handleSelectQuestion = (item: QuestionsEntity) => {
        const questionsClone = _.cloneDeep(questions);

        questionsClone.map((item: QuestionsEntity) => {
            let isChecked: boolean = false;
            if (item.answers.length) {
                item.answers.map((answer: AnswersEntity) => {
                    isChecked = isChecked || answer.status;
                });
            }
            item.selected = isChecked;
        });

        _.set(_.find(questionsClone, { id: item.id }), 'selected', true);

        setQuestionSelect(item);
        setQuestions(questionsClone);
    };

    /** handle checked answer */
    const handleCheckedAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
        // setAnswer((event.target as HTMLInputElement).value);
        questionSelect.answers.map((item: AnswersEntity) => {
            if (item.id === (event.target as HTMLInputElement).value) {
                item.status = true;
            } else item.status = false;
        });
        // console.log(questionSelect?.question);
        // Find item index using _.find (thanks @AJ Richardson for comment)
        const questionsClone = _.cloneDeep(questions);
        _.set(_.find(questionsClone, { id: questionSelect?.id }), 'answers', questionSelect.answers);
        setQuestions(questionsClone);
    };

    /** @todo: handle submit quiz */
    const handleSubmitQuiz = async (): Promise<void> => {
        const questionsProc: QuestionSubmit[] = [];
        // console.log('>>>Check questions:', questions);

        questions.map((item: QuestionsEntity) => {
            if (item.answers.length) {
                item.answers.map((answer: AnswersEntity) => {
                    if (answer.status)
                        questionsProc.push({
                            questionId: item?.id,
                            answerId: answer?.id
                        });
                });
            }
        });
        /** check questions have selected all */
        if (questionsProc.length === 0 || questionsProc.length < questions.length) {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Something wrong!',
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    close: false
                })
            );
            return;
        }
        // console.log(questions, questionsProc);
        const body: KeyedObject = {
            body: {
                examId: examId,
                data: questionsProc
            }
        };
        // console.log('>>>Check body:', body);

        const res = await examServices.submitExam(body);
        if (res.isFailure()) {
            dispatch(
                openSnackbar({
                    open: true,
                    message: res?.error?.message,
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    close: false
                })
            );
            return;
        }
        // console.log('>>>Check res:', res.data);
        dispatch(
            openSnackbar({
                open: true,
                message: res.data?.message,
                variant: 'alert',
                alert: {
                    color: 'success'
                },
                close: false
            })
        );
        setOpen(true);
        setPoint(res.data.data.numberCorrect);
    };

    /** useEffect */
    React.useEffect(() => {
        handleGetQuestionsByExamId();
    }, [open]);

    return (
        <>
            <SectionWrapper>
                <Container
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                            <SubCard
                                title={titleExam}
                                secondary={
                                    !isSubmiting && (
                                        <Grid container>
                                            <Button
                                                color='secondary'
                                                size='small'
                                                variant='contained'
                                                onClick={handleSubmitQuiz}
                                            >
                                                Submit
                                            </Button>
                                            <div>
                                                <SimpleDialog
                                                    open={open}
                                                    onClose={() => setOpen(false)}
                                                    point={point}
                                                />
                                            </div>
                                        </Grid>
                                    )
                                }
                            >
                                <Grid container spacing={1} sx={{ px: 2 }}>
                                    <Grid item xs={12}>
                                        <Typography variant='subtitle1' align='left'>
                                            {questionSelect?.title}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormGroup>
                                            <Grid container spacing={0}>
                                                {questionSelect?.answers.length ? (
                                                    questionSelect?.answers.map((item: any, index: number) => {
                                                        return (
                                                            <Grid key={item?.id} item xs={12}>
                                                                <FormControlLabel
                                                                    control={
                                                                        isSubmiting ? (
                                                                            <Checkbox
                                                                                checked={
                                                                                    item?.status ||
                                                                                    questionSelect.answerCorrectId ===
                                                                                        item.id ||
                                                                                    questionSelect?.answerUserId ===
                                                                                        item.id
                                                                                }
                                                                                disabled={
                                                                                    isSubmiting &&
                                                                                    questionSelect.answerCorrectId ===
                                                                                        item.id
                                                                                }
                                                                                value={`${item?.id}`}
                                                                                onChange={handleCheckedAnswer}
                                                                                name='checkedA'
                                                                                color={
                                                                                    questionSelect.isCorrect
                                                                                        ? 'primary'
                                                                                        : 'error'
                                                                                }
                                                                            />
                                                                        ) : (
                                                                            <Checkbox
                                                                                checked={
                                                                                    item?.status ||
                                                                                    questionSelect.answerCorrectId ===
                                                                                        item.id ||
                                                                                    questionSelect?.answerUserId ===
                                                                                        item.id
                                                                                }
                                                                                disabled={
                                                                                    isSubmiting &&
                                                                                    questionSelect.answerCorrectId ===
                                                                                        item.id
                                                                                }
                                                                                value={`${item?.id}`}
                                                                                onChange={handleCheckedAnswer}
                                                                                name='checkedA'
                                                                            />
                                                                        )
                                                                    }
                                                                    label={item?.title}
                                                                />
                                                            </Grid>
                                                        );
                                                    })
                                                ) : (
                                                    <></>
                                                )}
                                            </Grid>
                                        </FormGroup>
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <MainCard>
                                <Grid container spacing={2}>
                                    {questions.length ? (
                                        questions.map((item: QuestionsEntity, index: number) => {
                                            return (
                                                <Grid key={item?.id} item>
                                                    {isSubmiting ? (
                                                        <Button
                                                            // variant='outlined'
                                                            variant={item?.selected ? 'contained' : 'outlined'}
                                                            color={item.isCorrect ? 'primary' : 'error'}
                                                            size='small'
                                                            sx={{ width: 40, height: 40, minWidth: '0' }}
                                                            onClick={() => handleSelectQuestion(item)}
                                                        >
                                                            {index + 1}
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            // variant='outlined'
                                                            variant={item?.selected ? 'contained' : 'outlined'}
                                                            size='small'
                                                            sx={{ width: 40, height: 40, minWidth: '0' }}
                                                            onClick={() => handleSelectQuestion(item)}
                                                        >
                                                            {index + 1}
                                                        </Button>
                                                    )}
                                                </Grid>
                                            );
                                        })
                                    ) : (
                                        <></>
                                    )}
                                </Grid>
                            </MainCard>
                        </Grid>
                    </Grid>
                </Container>
            </SectionWrapper>
        </>
    );
};

export default QuestionsClientPage;
