import React, { useEffect } from 'react';
import {
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import useAuth from '@package:src/common/hooks/useAuth';
import useScriptRef from '@package:src/common/hooks/useScriptRef';
import { Link, useNavigate } from 'react-router-dom';
import { StringColorProps } from '@package:src/common/types';
import { strengthColor, strengthIndicator } from '@package:src/common/utils/password-strength';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';

// inport redux
import { useDispatch } from '@package:src/common/redux/store';
import { openSnackbar } from '@package:src/common/redux/slice/snackbar';

type Item = {
    name: string;
    id: string;
    show?: boolean;
    setShow?: React.Dispatch<React.SetStateAction<boolean>>;
};

// ===============================|| AUTH REGISTER ||=============================== //
const AuthRegisterPage = ({ ...others }) => {
    /** init theme */
    const theme = useTheme();

    /** init react hook */
    const navigate = useNavigate();
    const { register } = useAuth();
    const scriptedRef = useScriptRef();
    const dispatch = useDispatch();

    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const [showPassword, setShowPassword] = React.useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);

    const [checked, setChecked] = React.useState(true);

    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState<StringColorProps>();

    /** define items input of register */
    const registerInputItems: Array<Item> = [
        // {
        //     name: 'FullName / Username',
        //     id: 'fullName',
        //     show: true
        // },
        // {
        //     name: 'Phone number',
        //     id: 'phoneNumber',
        //     show: true
        // },
        {
            name: 'Email',
            id: 'email',
            show: true
        },
        {
            name: 'Password',
            id: 'password',
            show: showPassword,
            setShow: setShowPassword
        },
        {
            name: 'Password confirm',
            id: 'passwordConfirm',
            show: showPasswordConfirm,
            setShow: setShowPasswordConfirm
        }
    ];

    /** init change password for check */
    const changePassword = (value: string) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    useEffect(() => {}, []);

    const handleMouseDownPassword = (event: React.MouseEvent) => {
        event.preventDefault()!;
    };

    return (
        <Formik
            initialValues={{
                fullName: '',
                phoneNumber: '',
                email: '',
                password: '',
                passwordConfirm: '',
                submit: null
            }}
            validationSchema={Yup.object().shape({
                // fullName: Yup.string().max(255).required('Full name is required'),
                // phoneNumer: Yup.string().max(255).required('Phone number is required'),
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                password: Yup.string().max(255).required('Password is required'),
                passwordConfirm: Yup.string()
                    .max(255)
                    .oneOf([Yup.ref('password'), null], `Password don't match`)
                    .required('Password confirm is required')
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                    const registerError = await register(values.email, values.password, values.passwordConfirm);

                    if (registerError.isFailure()) {
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: registerError.error.message });
                            setSubmitting(false);
                            return;
                        }
                    }

                    if (scriptedRef.current) {
                        setStatus({ success: true });
                        setSubmitting(false);
                        dispatch(
                            openSnackbar({
                                open: true,
                                message: 'Your registration has been successfully completed.',
                                variant: 'alert',
                                alert: {
                                    color: 'success'
                                },
                                close: false
                            })
                        );

                        setTimeout(() => {
                            navigate('/login', { replace: true });
                        }, 1500);
                    }
                } catch (err: any) {
                    console.error('>>>Check error', err.message, scriptedRef.current);
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
                    {registerInputItems.map((item: Item) => {
                        return (
                            <div key={item.id}>
                                <FormControl
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
                                        onChange={(e) => {
                                            handleChange(e);
                                            if (item.id === 'password') changePassword(e.target.value);
                                        }}
                                        endAdornment={
                                            item.setShow && (
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        aria-label='toggle password visibility'
                                                        onClick={() => item.setShow((show: boolean) => !show)}
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
                                {item.id === 'password' && strength !== 0 && (
                                    <FormControl fullWidth>
                                        <Box sx={{ mb: 2 }}>
                                            <Grid container spacing={2} alignItems='center'>
                                                <Grid item>
                                                    <Box
                                                        style={{ backgroundColor: level?.color }}
                                                        sx={{ width: 85, height: 8, borderRadius: '7px' }}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant='subtitle1' fontSize='0.75rem'>
                                                        {level?.label}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </FormControl>
                                )}
                            </div>
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
                                label={
                                    <Typography variant='subtitle1'>
                                        Agree with &nbsp;
                                        <Typography variant='subtitle1' component={Link} to='#'>
                                            Terms & Condition.
                                        </Typography>
                                    </Typography>
                                }
                            />
                        </Grid>
                    </Grid>

                    {errors.submit && (
                        <Box sx={{ mt: 1 }}>
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
                            <span>Sign Up</span>
                        </LoadingButton>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default AuthRegisterPage;
