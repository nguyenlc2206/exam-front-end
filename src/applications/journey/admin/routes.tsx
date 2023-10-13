import { lazy } from 'react';

import AuthGuard from '@package:src/applications/routes/AuthGuard';
import Loadable from '@package:src/applications/widgets/Loadable';
import MainAdminLayout from '@package:src/applications/journey/admin/index';

// admin page
const HomeAdminPage = Loadable(lazy(() => import('@package:src/applications/journey/admin/pages/Home')));
const AnalyticsDashboard = Loadable(lazy(() => import('@package:src/applications/journey/admin/pages/Analytics')));
const UsersDashboard = Loadable(lazy(() => import('@package:src/applications/journey/admin/pages/Users')));
const ExamsDashboard = Loadable(lazy(() => import('@package:src/applications/journey/admin/pages/Exams')));
const QuestionsDashboard = Loadable(lazy(() => import('@package:src/applications/journey/admin/pages/Questions')));
const AsignExamsUser = Loadable(lazy(() => import('@package:src/applications/journey/admin/pages/AsignExams')));

// ==============================|| ADMIN ROUTING ||============================== //

const AdminRoutes = {
    path: '/admin',
    element: (
        <AuthGuard>
            <MainAdminLayout />
        </AuthGuard>
    ),
    children: [
        { index: true, path: 'default', element: <HomeAdminPage /> },
        { path: 'analytics', element: <AnalyticsDashboard /> },
        { path: 'users', element: <UsersDashboard /> },
        { path: 'users/asign/:id', element: <AsignExamsUser /> },
        { path: 'exams', element: <ExamsDashboard /> },
        { path: 'exams/:id', element: <QuestionsDashboard /> }
    ]
};

export default AdminRoutes;
