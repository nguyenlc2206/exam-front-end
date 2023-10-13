import React, { createContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

// third-party
import jwtDecode from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT } from '@package:src/common/redux/actions';
import authReducer from '@package:src/common/redux/authReducer';

// project imports
import Loader from '@package:src/applications/widgets/Loader';
import axios from '@package:src/common/utils/axios';

// types
import { KeyedObject } from '@package:src/common/types';
import { InitialLoginContextProps, JWTContextType } from '@package:src/common/types/auth';
import { AuthServicesImpl } from '@package:src/domain/services/auth';
import { AuthRepositoryImpl } from '@package:src/infras/repository/auth.repository.impl';
import AppError from '@package:src/common/utils/app.error';
import { Either, failure, success } from '@package:src/common/utils/either.response';

// constant
const initialState: InitialLoginContextProps = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

const setSession = (serviceToken?: string | null) => {
    if (serviceToken) {
        window.localStorage.setItem('serviceToken', serviceToken);
        axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
    } else {
        window.localStorage.removeItem('serviceToken');
        delete axios.defaults.headers.common.Authorization;
    }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const JWTContext = createContext<JWTContextType | null>(null);

export const JWTProvider = ({ children }: { children: React.ReactElement }) => {
    /** init auth service */
    const authServices = new AuthServicesImpl(new AuthRepositoryImpl());

    const [state, dispatch] = useReducer(authReducer, initialState);

    /** initial function */
    const handleInitial = async () => {
        try {
            const serviceToken = window.localStorage.getItem('serviceToken');
            if (serviceToken) {
                setSession(serviceToken);
                /** call service */
                const response = await authServices.checkAccount();

                if (response.isFailure()) {
                    dispatch({
                        type: LOGOUT
                    });
                    return;
                }

                const { user: user } = response.data;
                dispatch({
                    type: LOGIN,
                    payload: {
                        isLoggedIn: true,
                        user
                    }
                });
            } else {
                dispatch({
                    type: LOGOUT
                });
            }
        } catch (err) {
            console.error(err);
            dispatch({
                type: LOGOUT
            });
        }
    };

    useEffect(() => {
        handleInitial();
    }, []);

    const login = async (email: string, password: string): Promise<Either<string, AppError>> => {
        const res = await authServices.login({ email: email, password: password } as KeyedObject);

        if (res.isFailure()) return failure(res.error);
        // console.log('>>>Check res:', res.data);

        /** processing data */
        const { accessToken: serviceToken, user: user } = res.data;
        setSession(serviceToken);
        dispatch({
            type: LOGIN,
            payload: {
                isLoggedIn: true,
                user
            }
        });
        return success('okie');
    };

    const register = async (
        email: string,
        password: string,
        passwordConfirm: string
    ): Promise<Either<string, AppError>> => {
        /** processing data */
        const data: KeyedObject = {
            username: email,
            email: email,
            phoneNumber: '0369360057',
            password: password,
            passwordConfirm: passwordConfirm
        };
        /** call regiter service */
        const res = await authServices.register(data);
        if (res.isFailure()) return failure(res.error);
        return success('okie');
    };

    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <Loader />;
    }

    return <JWTContext.Provider value={{ ...state, login, register }}>{children}</JWTContext.Provider>;
};

export default JWTContext;
