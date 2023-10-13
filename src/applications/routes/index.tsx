import { useRoutes } from 'react-router-dom';
import ClientRoutes from '@package:src/applications/journey/client/routes';
import AuthenticationRoutes from '@package:src/applications/journey/auth/routes';
import AdminRoutes from '@package:src/applications/journey/admin/routes';

// ==============================|| ROUTING RENDER ||============================== //
export default function ThemeRoutes() {
    return useRoutes([AuthenticationRoutes, ClientRoutes, AdminRoutes]);
}
