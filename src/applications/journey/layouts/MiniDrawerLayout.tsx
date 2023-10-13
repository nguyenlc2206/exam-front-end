// material-ui
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';

const openedMixin = (theme: Theme): CSSObject => ({
    width: 260,
    borderRight: 'none',
    zIndex: 1099,
    background: theme.palette.background.default,
    overflowX: 'hidden',
    boxShadow: theme.palette.mode === 'dark' ? theme.customShadows.z1 : 'none',
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen + 200
    })
});

const closedMixin = (theme: Theme): CSSObject => ({
    borderRight: 'none',
    zIndex: 1099,
    background: theme.palette.background.default,
    overflowX: 'hidden',
    width: 72,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen + 200
    })
});

// ==============================|| DRAWER - MINI STYLED ||============================== //

const MiniDrawerLayout = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    width: 260,
    borderRight: '0px',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme)
    })
}));

export default MiniDrawerLayout;
