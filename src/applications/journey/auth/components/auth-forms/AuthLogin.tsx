import React from 'react';
import { useTheme } from '@mui/material/styles';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

// project imports
import useAuth from '@package:src/common/hooks/useAuth';
import useScriptRef from '@package:src/common/hooks/useScriptRef';

type Item = {
    name: string;
    id: string;
    show?: boolean;
    setShow?: React.Dispatch<React.SetStateAction<boolean>>;
};

// ===============================|| AUTH LOGIN ||=============================== //
const AuthLoginPage = ({ loginProp, ...others }: { loginProp?: number }) => {
    /** init theme */
    const theme = useTheme();

    /** init react hook */
    const navigate = useNavigate();
    const { login } = useAuth();
    const scriptedRef = useScriptRef();

    const [checked, setChecked] = React.useState(true);
    const [showPassword, setShowPassword] = React.useState(false);

    /** define items input of login */
    const loginInputItems: Array<Item> = [
        {
            name: 'Email Address / Username',
            id: 'email',
            show: true
        },
        {
            name: 'Password',
            id: 'password',
            show: showPassword,
            setShow: setShowPassword
        }
    ];

    const handleMouseDownPassword = (event: React.MouseEvent) => {
        event.preventDefault()!;
    };

    return (
        <Formik
            initialValues={{
                email: 'admin@gmail.com',
                password: 'admin',
                submit: null
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                    const loginError = await login(values.email, values.password);
                    if (loginError.isFailure()) {
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: loginError.error.message });
                            setSubmitting(false);
                            return;
                        }
                    }

                    if (scriptedRef.current) {
                        setStatus({ success: true });
                        setSubmitting(false);
                        navigate('/');
                    }
                } catch (err: any) {
                    console.error('>>>Check error', err, scriptedRef.current);
                    if (scriptedRef.current) {
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit} {...others}>
                    {loginInputItems.map((item: Item) => {
                        return (
                            <FormControl
                                key={item.id}
                                fullWidth
                                error={Boolean(touched[`${item.id}`] && errors[`${item.id}`])}
                                sx={{ ...theme.typography.customInput }}
                            >
                                <InputLabel htmlFor={`outlined-adornment-${item.id}-login`}>{item.name}</InputLabel>
                                <OutlinedInput
                                    id={`outlined-adornment-${item.id}-login`}
                                    type={item.show ? 'text' : 'password'}
                                    value={values[`${item.id}`]}
                                    name={item.id}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    endAdornment={
                                        item.setShow && (
                                            <InputAdornment position='end'>
                                                <IconButton
                                                    aria-label='toggle password visibility'
                                                    onClick={() => item.setShow((show) => !show)}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge='end'
                                                    size='large'
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }
                                    inputProps={{}}
                                />
                                {touched[`${item.id}`] && errors[`${item.id}`] && (
                                    <FormHelperText error id={`standard-weight-helper-text-${item.id}-login`}>
                                        {errors[`${item.id}`]}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        );
                    })}

                    <Grid container alignItems='center' justifyContent='space-between'>
                        <Grid item>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={(event) => setChecked(event.target.checked)}
                                        name='checked'
                                        color='primary'
                                    />
                                }
                                label='Keep me logged in'
                            />
                        </Grid>
                        <Grid item>
                            <Typography
                                variant='subtitle1'
                                component={Link}
                                to={'forgot-password'}
                                color='secondary'
                                sx={{ textDecoration: 'none' }}
                            >
                                Forgot Password?
                            </Typography>
                        </Grid>
                    </Grid>

                    {errors.submit && (
                        <Box sx={{ mt: 3 }}>
                            <FormHelperText error>{`${errors.submit}`}</FormHelperText>
                        </Box>
                    )}

                    <Box sx={{ mt: 2 }}>
                        <LoadingButton
                            fullWidth
                            onClick={() => {}}
                            loading={isSubmitting}
                            variant='contained'
                            size='large'
                            color='secondary'
                            type='submit'
                        >
                            <span>Sign In</span>
                        </LoadingButton>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default AuthLoginPage;
