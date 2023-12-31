import { Link } from 'react-router-dom';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import AuthWrapper1 from '@package:src/applications/journey/auth/components/auth-wrapper/AuthWrapper1';
import AuthCardWrapper from '@package:src/applications/journey/auth/components/auth-wrapper/AuthCardWrapper';
import Logo from '@package:src/assets/images/logo/Logo';
import useAuth from '@package:src/common/hooks/useAuth';
import AuthRegisterPage from '@package:src/applications/journey/auth/components/auth-forms/AuthRegister';

// ===============================|| AUTH - REGISTER ||=============================== //

const RegisterPage = () => {
    /** get theme init */
    const theme = useTheme();

    /** init hooks */
    const { isLoggedIn } = useAuth();

    /** get size screen */
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <AuthWrapper1>
            <Grid container direction='column' justifyContent='flex-end' sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid
                        container
                        justifyContent='center'
                        alignItems='center'
                        sx={{ minHeight: 'calc(100vh - 68px)' }}
                    >
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <AuthCardWrapper>
                                <Grid container spacing={2} alignItems='center' justifyContent='center'>
                                    <Grid item sx={{ mb: 2 }}>
                                        <Link to='#' aria-label='logo'>
                                            <Logo />
                                        </Link>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            direction={matchDownSM ? 'column-reverse' : 'row'}
                                            alignItems='center'
                                            justifyContent='center'
                                        >
                                            <Grid item>
                                                <Stack alignItems='center' justifyContent='center' spacing={1}>
                                                    <Typography
                                                        color={theme.palette.secondary.main}
                                                        gutterBottom
                                                        variant={matchDownSM ? 'h3' : 'h2'}
                                                    >
                                                        Sign up
                                                    </Typography>
                                                    <Typography
                                                        variant='caption'
                                                        fontSize='16px'
                                                        textAlign={matchDownSM ? 'center' : 'inherit'}
                                                    >
                                                        Enter your credentials to continue
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <AuthRegisterPage />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Grid item container direction='column' alignItems='center' xs={12}>
                                            <Typography
                                                component={Link}
                                                to={'/login'}
                                                variant='subtitle1'
                                                sx={{ textDecoration: 'none', fontWeight: 600 }}
                                            >
                                                Already have an account?
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ m: 3, mt: 1 }}></Grid>
            </Grid>
        </AuthWrapper1>
    );
};

export default RegisterPage;
