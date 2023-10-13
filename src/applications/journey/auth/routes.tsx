import { lazy } from 'react';

import Loadable from '@package:src/applications/widgets/Loadable';

// authentication page
const LoginPage = Loadable(lazy(() => import('@package:src/applications/journey/auth/pages/Login')));
const RegisterPage = Loadable(lazy(() => import('@package:src/applications/journey/auth/pages/Register')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //
const AuthenticationRoutes = {
    path: '/',
    element: '',
    children: [
        {
            path: '/login',
            element: <LoginPage />
        },
        {
            path: '/register',
            element: <RegisterPage />
        }
    ]
};

export default AuthenticationRoutes;
