import { Link as RouterLink } from 'react-router-dom';
import React, { cloneElement, ReactElement, useRef } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    AppBar as MuiAppBar,
    Box,
    Button,
    Container,
    Drawer,
    IconButton,
    Link,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Toolbar,
    Typography,
    useScrollTrigger
} from '@mui/material';

// assets
import { IconBook, IconCreditCard, IconDashboard, IconHome2 } from '@tabler/icons-react';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '@package:src/assets/images/logo/Logo';

// import project
import useAuth from '@package:src/common/hooks/useAuth';
import ProfileSetting from '@package:src/applications/journey/components/ProfileSetting';

// elevation scroll
interface ElevationScrollProps {
    children: ReactElement;
    window?: Window | Node;
}

function ElevationScroll({ children, window }: ElevationScrollProps) {
    const theme = useTheme();

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window!
    });

    return cloneElement(children, {
        elevation: trigger ? 1 : 0,
        style: {
            backgroundColor:
                theme.palette.mode === 'dark' && trigger ? theme.palette.dark[800] : theme.palette.background.default,
            color: theme.palette.text.dark
        }
    });
}

// ==============================|| LANDING - HEADER PAGE ||============================== //

const HeaderClientPage = ({ ...others }) => {
    /** init hooks */
    const { isLoggedIn, user } = useAuth();
    const [role, setRole] = React.useState(user?.group?.name);

    const [drawerToggle, setDrawerToggle] = React.useState<boolean>(false);

    const drawerToggler = (open: boolean) => (event: any) => {
        if (event.type! === 'keydown' && (event.key! === 'Tab' || event.key! === 'Shift')) {
            return;
        }
        setDrawerToggle(open);
    };

    return (
        <ElevationScroll {...others}>
            <MuiAppBar>
                <Container>
                    <Toolbar sx={{ py: 1.75, px: `0 !important` }}>
                        <Typography component='div' sx={{ flexGrow: 1, textAlign: 'left' }}>
                            <Logo />
                        </Typography>
                        <Stack
                            direction='row'
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                            spacing={{ xs: 1.5, md: 2.5 }}
                        >
                            <Button color='inherit' component={RouterLink} to='/' href='#'>
                                Home
                            </Button>
                            <Button color='inherit' component={RouterLink} to='/exams' href='#'>
                                Exams
                            </Button>

                            {role === 'admin' && (
                                <Button color='inherit' component={RouterLink} to='/admin/default' href='#'>
                                    Dashboard
                                </Button>
                            )}

                            {!isLoggedIn ? (
                                <Button
                                    component={RouterLink}
                                    to='/login'
                                    href='#'
                                    disableElevation
                                    variant='contained'
                                    color='secondary'
                                >
                                    Sign In
                                </Button>
                            ) : (
                                <ProfileSetting />
                            )}
                        </Stack>

                        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                            <IconButton color='inherit' onClick={drawerToggler(true)} size='large'>
                                <MenuIcon />
                            </IconButton>
                            {isLoggedIn && <ProfileSetting />}
                            <Drawer anchor='top' open={drawerToggle} onClose={drawerToggler(false)}>
                                {drawerToggle && (
                                    <Box
                                        sx={{ width: 'auto' }}
                                        role='presentation'
                                        onClick={drawerToggler(false)}
                                        onKeyDown={drawerToggler(false)}
                                    >
                                        <List>
                                            <Link style={{ textDecoration: 'none' }} href='/'>
                                                <ListItemButton component='div'>
                                                    <ListItemIcon>
                                                        <IconHome2 />
                                                    </ListItemIcon>
                                                    <ListItemText primary='Home' />
                                                </ListItemButton>
                                            </Link>

                                            <Link style={{ textDecoration: 'none' }} href='/login'>
                                                <ListItemButton component='div'>
                                                    <ListItemIcon>
                                                        <IconDashboard />
                                                    </ListItemIcon>
                                                    <ListItemText primary='Exams' />
                                                </ListItemButton>
                                            </Link>

                                            {role === 'admin' && (
                                                <Link style={{ textDecoration: 'none' }} href='/admin/default'>
                                                    <ListItemButton component='div'>
                                                        <ListItemIcon>
                                                            <IconBook />
                                                        </ListItemIcon>
                                                        <ListItemText primary='Dashboard' />
                                                    </ListItemButton>
                                                </Link>
                                            )}

                                            {!isLoggedIn && (
                                                <Link style={{ textDecoration: 'none' }} href='/login'>
                                                    <ListItemButton component='div'>
                                                        <ListItemIcon>
                                                            <IconCreditCard />
                                                        </ListItemIcon>
                                                        <ListItemText primary='Sign In' />
                                                    </ListItemButton>
                                                </Link>
                                            )}
                                        </List>
                                    </Box>
                                )}
                            </Drawer>
                        </Box>
                    </Toolbar>
                </Container>
            </MuiAppBar>
        </ElevationScroll>
    );
};

export default HeaderClientPage;
