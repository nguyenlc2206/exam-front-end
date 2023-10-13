import { FC, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Box, Divider, List, Typography, useMediaQuery } from '@mui/material';

// assets
import { IconDashboard, IconDeviceAnalytics, IconUser, IconAddressBook } from '@tabler/icons-react';
import { FormattedMessage } from 'react-intl';

import MiniDrawerLayout from '@package:src/applications/journey/layouts/MiniDrawerLayout';
import Logo from '@package:src/assets/images/logo/Logo';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useSelector } from '@package:src/common/redux/store';

import NavItem from '@package:src/applications/journey/admin/components/sidebar/NavItem';

/** define item sidebar */
const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics: IconDeviceAnalytics,
    IconUser: IconUser,
    IconAddressBook: IconAddressBook
};

const dashboards = [
    {
        id: 'dashboard',
        title: <FormattedMessage id='dashboard' />,
        icon: icons.IconDashboard,
        type: 'group',
        childrens: [
            {
                id: 'default',
                title: <FormattedMessage id='default' />,
                url: '/admin/default',
                icon: icons.IconDashboard
            }
            // {
            //     id: 'analytics',
            //     title: <FormattedMessage id='analytics' />,
            //     url: '/admin/analytics',
            //     icon: icons.IconDeviceAnalytics
            // }
        ]
    },
    {
        id: 'manager',
        title: <FormattedMessage id='manager' />,
        icon: icons.IconUser,
        type: 'group',
        childrens: [
            {
                id: 'users',
                title: <FormattedMessage id='user' />,
                url: '/admin/users',
                icon: icons.IconUser
            },
            {
                id: 'exams',
                title: <FormattedMessage id='exams' />,
                url: '/admin/exams',
                icon: icons.IconAddressBook
            }
        ]
    }
];

// ==============================|| SIDEBAR DRAWER ||============================== //

const SidebarAdmin: FC = () => {
    /** init theme */
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

    const { pathname } = useLocation();

    const { drawerOpen } = useSelector((state) => state.menu);

    // active menu item on page load
    useEffect(() => {}, [pathname]);

    return (
        <>
            <Box
                component='nav'
                sx={{ flexShrink: { md: 0 }, width: matchUpMd ? 260 : 'auto' }}
                aria-label='mailbox folders'
            >
                <MiniDrawerLayout variant='permanent' open={drawerOpen}>
                    <Box sx={{ display: 'flex', p: 2 }}>
                        <Link to={''} aria-label='theme-logo'>
                            <Logo />
                        </Link>
                    </Box>
                    <PerfectScrollbar
                        component='div'
                        style={{
                            height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 70px)',
                            paddingLeft: drawerOpen ? '16px' : 2,
                            paddingRight: drawerOpen ? '16px' : 2,
                            marginTop: drawerOpen ? 0 : '12px'
                        }}
                    >
                        {dashboards.map((ele: any, index: number) => {
                            return (
                                <div key={ele.id}>
                                    <List
                                        sx={{ px: 0.2, py: drawerOpen ? 0.1 : 0.1 }}
                                        subheader={
                                            ele.title &&
                                            drawerOpen && (
                                                <Typography
                                                    variant='caption'
                                                    sx={{ ...theme.typography.menuCaption }}
                                                    display='block'
                                                    gutterBottom
                                                >
                                                    {ele.title}
                                                    {ele.caption && (
                                                        <Typography
                                                            variant='caption'
                                                            sx={{ ...theme.typography.subMenuCaption }}
                                                            display='block'
                                                            gutterBottom
                                                        >
                                                            {ele.caption}
                                                        </Typography>
                                                    )}
                                                </Typography>
                                            )
                                        }
                                    >
                                        {/* init and return nav item */}
                                        {ele.childrens.map((item: any) => {
                                            return <NavItem key={item.id} item={item} parentId={ele.id!} />;
                                        })}
                                    </List>
                                    {drawerOpen && <Divider sx={{ mt: 0.25, mb: 1.25 }} />}
                                </div>
                            );
                        })}
                    </PerfectScrollbar>
                </MiniDrawerLayout>
            </Box>
        </>
    );
};

export default SidebarAdmin;
