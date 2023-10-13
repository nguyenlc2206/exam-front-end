import {
    ButtonBase,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import useConfig from '@package:src/common/hooks/useConfig';
import { activeID, activeItem, openDrawer } from '@package:src/common/redux/slice/menu';
import { dispatch, useSelector } from '@package:src/common/redux/store';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

/** define nav item */
const NavItem = ({ item, parentId, level = 1 }: any) => {
    /** init theme and hooks */
    const theme = useTheme();
    const { borderRadius } = useConfig();
    const { pathname } = useLocation();

    const { selectedItem, drawerOpen } = useSelector((state) => state.menu);
    const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

    const isSelected = selectedItem.findIndex((id) => id === item.id) > -1;

    /** styles define */
    const textColor = theme.palette.mode === 'dark' ? 'grey.400' : 'text.primary';
    const iconSelectedColor = theme.palette.mode === 'dark' && true ? 'text.primary' : 'secondary.main';

    /** handle active item */
    const itemHandler = (id: string, parentId: string) => {
        dispatch(activeItem([id]));
        if (matchesSM) dispatch(openDrawer(false));
        dispatch(activeID(parentId));
    };

    // active menu item on page load
    useEffect(() => {
        const currentIndex = document.location.pathname
            .toString()
            .split('/')
            .findIndex((id) => id === item.id);
        if (currentIndex > -1) {
            dispatch(activeItem([item.id]));
        }
    }, [pathname]);

    return (
        <ListItemButton
            component={Link}
            to={item.url}
            sx={{
                zIndex: 1201,
                borderRadius: `${borderRadius}px`,
                mb: 0.5,
                pl: drawerOpen ? `${level * 24}px` : 1.25,
                ...(drawerOpen &&
                    level === 1 &&
                    theme.palette.mode !== 'dark' && {
                        '&:hover': {
                            background: theme.palette.secondary.light
                        },
                        '&.Mui-selected': {
                            background: theme.palette.secondary.light,
                            color: iconSelectedColor,
                            '&:hover': {
                                color: iconSelectedColor,
                                background: theme.palette.secondary.light
                            }
                        }
                    }),
                ...((!drawerOpen || level !== 1) && {
                    py: level === 1 ? 0 : 1,
                    '&:hover': {
                        bgcolor: 'transparent'
                    },
                    '&.Mui-selected': {
                        '&:hover': {
                            bgcolor: 'transparent'
                        },
                        bgcolor: 'transparent'
                    }
                })
            }}
            selected={isSelected}
            onClick={() => {
                itemHandler(item.id, parentId);
            }}
        >
            <ButtonBase aria-label='theme-icon' sx={{ borderRadius: `${borderRadius}px` }} disableRipple={drawerOpen}>
                <ListItemIcon
                    sx={{
                        minWidth: level === 1 ? 36 : 18,
                        color: isSelected ? iconSelectedColor : textColor,
                        ...(!drawerOpen &&
                            level === 1 && {
                                borderRadius: `${borderRadius}px`,
                                width: 46,
                                height: 46,
                                alignItems: 'center',
                                justifyContent: 'center',
                                '&:hover': {
                                    bgcolor:
                                        theme.palette.mode === 'dark'
                                            ? theme.palette.secondary.main + 25
                                            : 'secondary.light'
                                },
                                ...(isSelected && {
                                    bgcolor:
                                        theme.palette.mode === 'dark'
                                            ? theme.palette.secondary.main + 25
                                            : 'secondary.light',
                                    '&:hover': {
                                        bgcolor:
                                            theme.palette.mode === 'dark'
                                                ? theme.palette.secondary.main + 30
                                                : 'secondary.light'
                                    }
                                })
                            })
                    }}
                >
                    <item.icon
                        stroke={1.75}
                        size={drawerOpen ? '20px' : '24px'}
                        style={{
                            color: isSelected ? theme.palette.secondary.main : theme.palette.text.primary
                        }}
                    />
                </ListItemIcon>
            </ButtonBase>

            {(drawerOpen || (!drawerOpen && level !== 1)) && (
                <ListItemText
                    primary={
                        <Typography variant={drawerOpen ? 'h5' : 'body1'} color='inherit'>
                            {item.title}
                        </Typography>
                    }
                />
            )}
        </ListItemButton>
    );
};

export default NavItem;
