import { lazy } from 'react';

import Loadable from '@package:src/applications/widgets/Loadable';
import MainClientLayout from '@package:src/applications/journey/client/index';
import AuthGuard from '@package:src/applications/routes/AuthGuard';

// client page
const WelcomeClientPage = Loadable(lazy(() => import('@package:src/applications/journey/client/pages/Welcome')));
const ExamsClientPage = Loadable(lazy(() => import('@package:src/applications/journey/client/pages/Exams')));
const QuestionClientPage = Loadable(lazy(() => import('@package:src/applications/journey/client/pages/Questions')));

// ==============================|| CLIENT ROUTING ||============================== //
const ClientRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainClientLayout />
        </AuthGuard>
    ),
    children: [
        { index: true, element: <WelcomeClientPage /> },
        { path: 'welcome', element: <WelcomeClientPage /> },
        { path: 'exams', element: <ExamsClientPage /> },
        { path: 'exams/:id', element: <QuestionClientPage /> }
    ]
};

export default ClientRoutes;
