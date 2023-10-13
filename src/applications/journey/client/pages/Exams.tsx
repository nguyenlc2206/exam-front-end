import React, { FC } from 'react';
import { styled } from '@mui/material/styles';
import { Container, Grid } from '@mui/material';
import ExamCard from '@package:src/applications/journey/client/components/ExamCard';
import { ExamServicesImpl } from '@package:src/domain/services/exams';
import { ExamRepositoryImpl } from '@package:src/infras/repository/exam.repository.impl';
import { ExamUserEntity } from '@package:src/domain/entities/ExamUser';

// ==============================|| EXAMS PAGE ||============================== //

const SectionWrapper = styled('div')({
    paddingTop: 100,
    paddingBottom: 100,
    height: '100vh',
    backgroundColor: '#eef2f6'
});

const ExamsClientPage: FC = () => {
    /** init services */
    const examServices = new ExamServicesImpl(new ExamRepositoryImpl());

    /** init hooks */
    const [exams, setExams] = React.useState<ExamUserEntity[]>([]);

    /** init variables */

    /** handle get all exams with user */
    const handleGetListExams = async () => {
        const res = await examServices.getAllExamsByUserId();
        if (res.isFailure()) return;

        // console.log('>>>Check res:', res?.data?.data?.exams);
        setExams(res?.data?.data?.exams);
    };

    /** useEffect */
    React.useEffect(() => {
        handleGetListExams();
    }, []);

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
                    <Grid container alignItems='center' spacing={{ xs: 1.5, sm: 2.5, md: 3 }}>
                        {exams.map((item: ExamUserEntity) => {
                            return (
                                <Grid key={item?.id} item xs={12} sm={6} md={4} lg={3}>
                                    <ExamCard item={item} />
                                </Grid>
                            );
                        })}
                    </Grid>
                </Container>
            </SectionWrapper>
        </>
    );
};

export default ExamsClientPage;
