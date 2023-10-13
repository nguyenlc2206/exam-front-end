import { Avatar, Box, Link, useMediaQuery } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Logo from '@package:src/assets/images/logo/Logo';
import { IconMenu2 } from '@tabler/icons-react';
import { dispatch, useSelector } from '@package:src/common/redux/store';
import { openDrawer } from '@package:src/common/redux/slice/menu';

import ProfileSetting from '@package:src/applications/journey/components/ProfileSetting';
// ==============================|| ADMIN - HEADER PAGE ||============================== //
const HeaderAdminPage = () => {
    /** init theme */
    const theme = useTheme();

    const { drawerOpen } = useSelector((state) => state.menu);

    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            {/* logo & toggler button */}
            <Box
                sx={{
                    width: 228,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <Box component='span' sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    <Link component={RouterLink} to={''} aria-label='theme-logo'>
                        <Logo />
                    </Link>
                </Box>

                <Avatar
                    variant='rounded'
                    sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.mediumAvatar,
                        overflow: 'hidden',
                        transition: 'all .2s ease-in-out',
                        background:
                            theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
                        color:
                            theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
                        '&:hover': {
                            background:
                                theme.palette.mode === 'dark'
                                    ? theme.palette.secondary.main
                                    : theme.palette.secondary.dark,
                            color:
                                theme.palette.mode === 'dark'
                                    ? theme.palette.secondary.light
                                    : theme.palette.secondary.light
                        }
                    }}
                    onClick={() => dispatch(openDrawer(!drawerOpen))}
                    color='inherit'
                >
                    <IconMenu2 stroke={1.5} size='20px' />
                </Avatar>
            </Box>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} />

            <ProfileSetting />
        </>
    );
};

export default HeaderAdminPage;
