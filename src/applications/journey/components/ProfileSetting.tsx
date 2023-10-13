import React, { useRef } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useNavigate } from 'react-router-dom';
import {
    Avatar,
    Box,
    Chip,
    ClickAwayListener,
    Divider,
    Grid,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Popper,
    Stack,
    Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import User1 from '@package:src/assets/images/users/avatar-11.png';
import { IconLogout, IconSettings, IconUser } from '@tabler/icons-react';
import Transitions from '@package:src/applications/widgets/Transitions';
import MainCard from '@package:src/applications/widgets/cards/MainCard';
import useAuth from '@package:src/common/hooks/useAuth';
import useConfig from '@package:src/common/hooks/useConfig';
import { FormattedMessage } from 'react-intl';

/** define profile setting */
const ProfileSetting = () => {
    /** init theme */
    const theme = useTheme();

    /** init hooks */
    const { borderRadius } = useConfig();
    const [open, setOpen] = React.useState(false);

    const navigate = useNavigate();

    const { isLoggedIn, user } = useAuth();

    /**
     * anchorRef is used on different components and specifying one type leads to other components throwing an error
     * */
    const anchorRef = useRef<any>(null);

    const handleClose = (event: React.MouseEvent<HTMLDivElement> | MouseEvent | TouchEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    return (
        <>
            <Chip
                sx={{
                    height: '42px',
                    alignItems: 'center',
                    borderRadius: '27px',
                    transition: 'all .2s ease-in-out',
                    borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
                    backgroundColor:
                        theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
                    '&[aria-controls="menu-list-grow"], &:hover': {
                        borderColor: theme.palette.primary.main,
                        background: `${theme.palette.primary.main}!important`,
                        color: theme.palette.primary.light,
                        '& svg': {
                            stroke: theme.palette.primary.light
                        }
                    },
                    '& .MuiChip-label': {
                        lineHeight: 0
                    }
                }}
                icon={
                    <Avatar
                        src={User1}
                        alt='user-images'
                        sx={{
                            ...theme.typography.mediumAvatar,
                            margin: '8px 0 8px 8px !important',
                            cursor: 'pointer'
                        }}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup='true'
                        color='inherit'
                    />
                }
                label={<IconSettings stroke={1.5} size='24px' color={theme.palette.primary.main} />}
                variant='outlined'
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup='true'
                onClick={() => setOpen((prevOpen) => !prevOpen)}
                color='primary'
                aria-label='user-account'
            />

            <Popper
                placement='bottom'
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                modifiers={[
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 14]
                        }
                    }
                ]}
            >
                {({ TransitionProps }) => (
                    <ClickAwayListener onClickAway={handleClose}>
                        <Transitions in={open} {...TransitionProps}>
                            <Paper>
                                {open && (
                                    <MainCard
                                        border={false}
                                        elevation={16}
                                        content={false}
                                        boxShadow
                                        shadow={theme.shadows[16]}
                                    >
                                        <Box sx={{ display: 'flex', p: 2, pb: 0, justifyContent: 'space-between' }}>
                                            <Stack flexGrow={1} direction='row' spacing={0.5} alignItems='center'>
                                                <Typography component='span' variant='h4' sx={{ fontWeight: 400 }}>
                                                    {user?.username}
                                                </Typography>
                                            </Stack>
                                            <Chip
                                                label={
                                                    <Typography
                                                        sx={{ color: theme.palette.primary.main }}
                                                        variant='subtitle1'
                                                    >
                                                        {user?.group?.name}
                                                    </Typography>
                                                }
                                            />

                                            <Divider />
                                        </Box>

                                        <List
                                            component='nav'
                                            sx={{
                                                width: '100%',
                                                maxWidth: 350,
                                                minWidth: 300,
                                                backgroundColor: theme.palette.background.paper,
                                                borderRadius: '10px',
                                                [theme.breakpoints.down('md')]: {
                                                    minWidth: '100%'
                                                },
                                                '& .MuiListItemButton-root': {
                                                    mt: 0.5
                                                }
                                            }}
                                        >
                                            <ListItemButton
                                                sx={{ borderRadius: `${borderRadius}px` }}
                                                onClick={() => {}}
                                            >
                                                <ListItemIcon>
                                                    <IconSettings stroke={1.5} size='20px' />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={
                                                        <Typography variant='body2'>
                                                            <FormattedMessage id='account-settings' />
                                                        </Typography>
                                                    }
                                                />
                                            </ListItemButton>

                                            <ListItemButton
                                                sx={{ borderRadius: `${borderRadius}px` }}
                                                onClick={() => {}}
                                            >
                                                <ListItemIcon>
                                                    <IconUser stroke={1.5} size='20px' />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={
                                                        <Grid container spacing={1} justifyContent='space-between'>
                                                            <Grid item>
                                                                <Typography variant='body2'>
                                                                    <FormattedMessage id='social-profile' />
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    }
                                                />
                                            </ListItemButton>

                                            <ListItemButton
                                                sx={{ borderRadius: `${borderRadius}px` }}
                                                onClick={() => navigate('/login')}
                                            >
                                                <ListItemIcon>
                                                    <IconLogout stroke={1.5} size='20px' />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={
                                                        <Typography variant='body2'>
                                                            <FormattedMessage id='logout' />
                                                        </Typography>
                                                    }
                                                />
                                            </ListItemButton>
                                        </List>
                                    </MainCard>
                                )}
                            </Paper>
                        </Transitions>
                    </ClickAwayListener>
                )}
            </Popper>
        </>
    );
};

export default ProfileSetting;
