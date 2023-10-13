import { Button, CardContent, CardMedia, Grid, Stack, Typography, useTheme } from '@mui/material';
import MainCard from '@package:src/applications/widgets/cards/MainCard';
import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// assets
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { ExamUserEntity } from '@package:src/domain/entities/ExamUser';
import Chip from '@package:src/applications/widgets/chips/Chip';

type Props = {
    item: ExamUserEntity;
};

// ==============================|| EXAMS CARD ||============================== //

const ExamCard = ({ item }: Props) => {
    /** init hooks */
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <>
            <MainCard
                content={false}
                boxShadow
                sx={{
                    '&:hover': {
                        transform: 'scale3d(1.02, 1.02, 1)',
                        transition: 'all .4s ease-in-out'
                    }
                }}
            >
                <CardMedia
                    sx={{ height: 220 }}
                    image={'https://ilinks.io/static/images/main.webp'}
                    title='Contemplative Reptile'
                    component={Link}
                    to={``}
                />

                <CardContent sx={{ p: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography
                                component={Link}
                                to={``}
                                variant='subtitle1'
                                sx={{
                                    textDecoration: 'none',
                                    fontWeight: 550,
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    flexShrink: 1,
                                    overflow: 'hidden',
                                    width: 'auto',
                                    maxWidth: '100%',
                                    display: 'inline-block'
                                }}
                            >
                                {item?.exam?.title}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                variant='body2'
                                sx={{
                                    overflow: 'hidden',
                                    height: 45
                                }}
                            >
                                {item?.exam?.subTitle}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack direction='row' justifyContent='flex-end' alignItems='center'>
                                <Grid container spacing={1}>
                                    <Grid item>
                                        {item.status === true && (
                                            <Chip label='Complete' size='medium' chipcolor='success' />
                                        )}
                                        {item.status === false && (
                                            <Chip label='Pending' size='medium' chipcolor='pendding' />
                                        )}
                                    </Grid>
                                </Grid>
                                <Button
                                    color='secondary'
                                    variant='contained'
                                    sx={{ minWidth: 0 }}
                                    onClick={() => navigate(`${item?.exam?.id}`)}
                                >
                                    <PlayCircleOutlineIcon fontSize='small' />
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </CardContent>
            </MainCard>
        </>
    );
};

export default ExamCard;
