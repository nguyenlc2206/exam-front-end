import { CSSProperties } from 'react';
import { Link, Stack, TableCell, TableRow, Theme, Typography, useTheme } from '@mui/material';

import AssignmentTwoToneIcon from '@mui/icons-material/AssignmentTwoTone';
import Chip from '@package:src/applications/widgets/chips/Chip';

interface Props {
    item: any;
    index: number;
}

// drag wrapper
const getDragWrapper = (theme: Theme): CSSProperties | undefined => {
    const bgcolor = theme.palette.mode === 'dark' ? theme.palette.background.paper + 90 : theme.palette.primary.light;
    return {
        backgroundColor: 'transparent',
        userSelect: 'none'
    };
};

// ==============================|| QUESTION ITEM - ITEMS ||============================== //
const QuestionItem = ({ item, index }: Props) => {
    const theme = useTheme();

    return (
        <>
            <TableRow
                hover
                sx={{
                    '& th,& td': {
                        whiteSpace: 'nowrap'
                    },
                    '& .more-button': {
                        opacity: 0
                    },
                    ':hover': {
                        '& .more-button': {
                            opacity: 1
                        }
                    },
                    ...getDragWrapper(theme)
                }}
            >
                <TableCell
                    sx={{
                        pl: 3,
                        minWidth: 120,
                        width: 120,
                        height: 46
                    }}
                />
                <TableCell sx={{ width: 90, minWidth: 90 }}>
                    <Stack direction='row' spacing={0.5} alignItems='center'>
                        <AssignmentTwoToneIcon
                            color='primary'
                            sx={{
                                fontSize: '0.875rem'
                            }}
                        />
                        <Typography variant='body2'>{item.id}</Typography>
                    </Stack>
                </TableCell>

                <TableCell sx={{ maxWidth: 'calc(100vw - 1200px)', minWidth: 100 }} component='th' scope='row'>
                    <Link
                        underline='hover'
                        color='default'
                        onClick={() => {}}
                        sx={{
                            overflow: 'hidden',
                            display: 'block',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            ':hover': { color: 'primary.main' },
                            cursor: 'pointer'
                        }}
                    >
                        {item.title}
                    </Link>
                </TableCell>

                <TableCell sx={{ width: 150, minWidth: 150 }}>
                    {item.deletedAt ? (
                        <Chip label='InActive' chipcolor='error' />
                    ) : (
                        <Chip chipcolor='success' label='Active' />
                    )}
                </TableCell>

                {/* <TableCell
                    sx={{
                        width: 100,
                        minWidth: 100
                    }}
                >
                    {item.createdAt}
                </TableCell> */}

                <TableCell
                    sx={{
                        width: 150,
                        minWidth: 150,
                        textTransform: 'capitalize'
                    }}
                >
                    {item.deletedAt}
                </TableCell>
            </TableRow>
        </>
    );
};

export default QuestionItem;
