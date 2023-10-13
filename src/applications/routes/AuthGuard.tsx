import { useNavigate } from 'react-router-dom';

// project imports
import useAuth from '@package:src/common/hooks/useAuth';

import { ReactElement, useEffect } from 'react';

// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */

export type GuardProps = {
    children: ReactElement | null;
};

const AuthGuard = ({ children }: GuardProps) => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login', { replace: true });
        }
    }, [isLoggedIn, navigate]);

    return children;
};

export default AuthGuard;
