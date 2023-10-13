import { styled } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';

import HeaderClientPage from '@package:src/applications/journey/client/components/Header';

// custom stlye
const HeaderWrapper = styled('div')(({ theme }) => ({
    overflowX: 'hidden',
    overflowY: 'clip',
    background:
        theme.palette.mode === 'dark'
            ? theme.palette.background.default
            : `linear-gradient(360deg, ${theme.palette.grey[100]} 1.09%, ${theme.palette.background.paper} 100%)`,
    [theme.breakpoints.down('md')]: {}
}));

// ==============================|| LANDING - MAIN CLIENT LAYOUT ||============================== //
const MainClientLayout = () => {
    return (
        <>
            {/* 1. header and hero section */}
            <HeaderWrapper id='home'>
                <HeaderClientPage />
            </HeaderWrapper>

            <Outlet />
        </>
    );
};

export default MainClientLayout;
