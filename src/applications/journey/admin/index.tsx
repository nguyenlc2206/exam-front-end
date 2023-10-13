import { FC, useEffect, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import HeaderAdminPage from '@package:src/applications/journey/admin/components/header/Header';
import { AppBar, Box, Container, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';
import { useTheme, styled, Theme } from '@mui/material/styles';
import useConfig from '@package:src/common/hooks/useConfig';
import SidebarAdmin from '@package:src/applications/journey/admin/components/sidebar/Sidebar';
import { dispatch, useSelector } from '@package:src/common/redux/store';
import { openDrawer } from '@package:src/common/redux/slice/menu';

interface MainStyleProps {
    theme: Theme;
    open: boolean;
    layout: string;
}

// styles
const MainAmin: any = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }: MainStyleProps) => ({
        ...theme.typography.mainContent,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        ...(!open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.shorter + 200
            }),
            [theme.breakpoints.up('md')]: {
                marginLeft: -(260 - 72),
                width: `calc(100% - 260px)`,
                marginTop: 70
            }
        }),
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.shorter + 200
            }),
            marginLeft: 0,
            marginTop: 70,
            width: `calc(100% - 260px)`,
            [theme.breakpoints.up('md')]: {
                marginTop: 70
            }
        }),
        [theme.breakpoints.down('md')]: {
            // marginLeft: '20px',
            // padding: '16px',
            marginTop: 70,
            ...(!open && {
                width: `calc(100% - 260px)`
            })
        },
        [theme.breakpoints.down('sm')]: {
            // marginLeft: '10px',
            marginRight: '10px',
            // padding: '16px',
            marginTop: 70,
            ...(!open && {
                width: `calc(100% - 260px)`
            })
        }
    })
);

// ==============================||  MAIN ADMIN LAYOUT ||============================== //
const MainAdminLayout: FC = () => {
    /** init theme */
    const theme = useTheme();

    const { drawerOpen } = useSelector((state) => state.menu);

    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

    const { container } = useConfig();

    /** header init */
    const header = useMemo(
        () => (
            <Toolbar sx={{ p: '16px' }}>
                <HeaderAdminPage />
            </Toolbar>
        ),
        [matchDownMd]
    );

    useEffect(() => {
        dispatch(openDrawer(true));
    }, []);

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                {/* header components */}
                <AppBar
                    enableColorOnDark
                    position='fixed'
                    color='inherit'
                    elevation={0}
                    sx={{ bgcolor: theme.palette.background.default }}
                >
                    {header}
                </AppBar>

                {/* drawer sidebar */}
                <SidebarAdmin />

                {/* main content */}
                <MainAmin theme={theme} open={drawerOpen}>
                    <Container maxWidth={container ? 'lg' : false} {...(!container && { sx: { px: { xs: 0 } } })}>
                        <Outlet />
                    </Container>
                </MainAmin>
            </Box>
        </>
    );
};

export default MainAdminLayout;
