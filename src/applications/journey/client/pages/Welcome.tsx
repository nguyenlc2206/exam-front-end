import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { styled, useTheme } from '@mui/material/styles';
import { Button, CardMedia, Container, Grid, Stack, Typography } from '@mui/material';

// assets
import { IconCircleCheck } from '@tabler/icons-react';
import LayersTwoToneIcon from '@mui/icons-material/LayersTwoTone';

import LayerLeft from '@package:src/assets/images/landing/customization-left.png';

// project import
import AnimateButton from '@package:src/applications/widgets/buttons/AnimateButton';

const SectionWrapper = styled('div')({
    paddingTop: 100,
    paddingBottom: 100
});

// ==============================|| WELCOME PAGE ||============================== //
const WelcomeClientPage: FC = () => {
    /** init theme */
    const theme = useTheme();

    const listSX = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.7rem',
        padding: '10px 0',
        fontSize: '1rem',
        color: theme.palette.grey[900],
        svg: { color: theme.palette.secondary.main }
    };

    return (
        <SectionWrapper>
            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Grid
                    container
                    justifyContent='space-between'
                    alignItems='center'
                    spacing={{ xs: 1.5, sm: 2.5, md: 3, lg: 5 }}
                >
                    <Grid item xs={12} md={6} sx={{ img: { width: '100%' } }}>
                        <Stack sx={{ width: '75%', mb: 5, mx: 'auto' }}>
                            <CardMedia component='img' image={LayerLeft} alt='Layer' />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={2.5}>
                            <Grid item xs={12}>
                                <Typography variant='h5' sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' }, mb: 2 }}>
                                    Easy practice with more quizes
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography sx={listSX}>
                                    <IconCircleCheck size={20} />
                                    Have more quizes with different category.
                                </Typography>
                                <Typography sx={listSX}>
                                    <IconCircleCheck size={20} />
                                    ......
                                </Typography>
                                <Typography sx={listSX}>
                                    <IconCircleCheck size={20} />
                                    ......
                                </Typography>
                                <Typography sx={listSX}>
                                    <IconCircleCheck size={20} />
                                    ......
                                </Typography>
                                <Typography sx={listSX}>
                                    <IconCircleCheck size={20} />
                                    ......
                                </Typography>
                                <Stack direction='row'>
                                    <AnimateButton>
                                        <Button
                                            startIcon={<LayersTwoToneIcon />}
                                            sx={{ boxShadow: 'none', my: 4 }}
                                            variant='contained'
                                            component={RouterLink}
                                            to='/exams'
                                            color='secondary'
                                        >
                                            View Exams
                                        </Button>
                                    </AnimateButton>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </SectionWrapper>
    );
};

export default WelcomeClientPage;
