import React, { FC, useEffect } from 'react';

import { UserServicesImpl } from '@package:src/domain/services/users';
import { UserRepositoryImpl } from '@package:src/infras/repository/user.repository.impl';
import MainCard from '@package:src/applications/widgets/cards/MainCard';
import {
    Avatar,
    Chip,
    Grid,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Pagination,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
    useTheme
} from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

import { IconSearch } from '@tabler/icons-react';
import { UserEntity } from '@package:src/domain/entities/User';
import { useNavigate } from 'react-router-dom';

// ==============================|| ADMIN HOME USER DASHBOARD ||============================== //

const UserDashboard: FC = () => {
    /** init services */
    const userServices = new UserServicesImpl(new UserRepositoryImpl());

    /** init hooks */
    const theme = useTheme();
    const naviagte = useNavigate();
    const [data, setData] = React.useState([] as UserEntity[]);

    /** handle fetch list users */
    const handlerFetchListUsers = async () => {
        const res = await userServices.getAll();
        if (res.isFailure()) return;

        // console.log('>>>Check res:', res.data?.users);
        setData(res.data?.users);
    };

    /** const handler get list exams */
    const hadlerFetchListExams = async () => {};

    /** useEffect */
    useEffect(() => {
        handlerFetchListUsers();
    }, []);

    return (
        <>
            <MainCard
                title={
                    <Grid container alignItems='center' justifyContent='space-between' spacing={2}>
                        <Grid item>
                            <Typography variant='h3'>Users</Typography>
                        </Grid>
                        <Grid item>
                            <OutlinedInput
                                id='input-search-list-style1'
                                placeholder='Search'
                                startAdornment={
                                    <InputAdornment position='start'>
                                        <IconSearch stroke={1.5} size='16px' />
                                    </InputAdornment>
                                }
                                size='small'
                            />
                        </Grid>
                    </Grid>
                }
                content={false}
            >
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ pl: 3 }}>#</TableCell>
                                <TableCell>User Profile</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Asign</TableCell>
                                <TableCell align='center' sx={{ pr: 3 }}>
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {data &&
                                data.map((row, index) => (
                                    <TableRow hover key={row.id}>
                                        <TableCell sx={{ pl: 3 }}>{index + 1}</TableCell>

                                        <TableCell>
                                            <Grid container spacing={2} alignItems='center'>
                                                <Grid item>
                                                    <Avatar
                                                        alt='User 1'
                                                        src={'../src/assets/images/users/avatar-1.png'}
                                                    />
                                                </Grid>
                                                <Grid item xs zeroMinWidth>
                                                    <Typography align='left' variant='subtitle1' component='div'>
                                                        {row.username}{' '}
                                                        {row.deletedAt === null && (
                                                            <CheckCircleIcon
                                                                sx={{ color: 'success.dark', width: 14, height: 14 }}
                                                            />
                                                        )}
                                                    </Typography>
                                                    <Typography align='left' variant='subtitle2' noWrap>
                                                        {row.email}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </TableCell>

                                        <TableCell>{row.phoneNumber}</TableCell>

                                        <TableCell>
                                            {row.groupName === 'admin' && (
                                                <Chip
                                                    label='Admin'
                                                    size='small'
                                                    sx={{
                                                        background:
                                                            theme.palette.mode === 'dark'
                                                                ? theme.palette.dark.main
                                                                : theme.palette.success.light + 60,
                                                        color: theme.palette.success.dark
                                                    }}
                                                />
                                            )}

                                            {row.groupName === 'user' && (
                                                <Chip
                                                    label='User'
                                                    size='small'
                                                    sx={{
                                                        background:
                                                            theme.palette.mode === 'dark'
                                                                ? theme.palette.dark.main
                                                                : theme.palette.primary.light,
                                                        color: theme.palette.primary.dark
                                                    }}
                                                />
                                            )}
                                        </TableCell>

                                        <TableCell>
                                            <Tooltip placement='top' title='Asign exam'>
                                                <IconButton
                                                    color='primary'
                                                    sx={{
                                                        color: theme.palette.orange.dark,
                                                        borderColor: theme.palette.orange.main,
                                                        '&:hover ': { background: theme.palette.orange.light }
                                                    }}
                                                    size='large'
                                                    onClick={() => naviagte(`asign/${row?.id}`)}
                                                >
                                                    <ControlPointIcon sx={{ fontSize: '1.1rem' }} />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>

                                        <TableCell align='center' sx={{ pr: 3 }}>
                                            <Stack direction='row' justifyContent='center' alignItems='center'>
                                                <Tooltip placement='top' title='View'>
                                                    <IconButton color='primary' aria-label='delete' size='large'>
                                                        <RemoveRedEyeIcon sx={{ fontSize: '1.1rem' }} />
                                                    </IconButton>
                                                </Tooltip>

                                                <Tooltip placement='top' title='Edit'>
                                                    <IconButton
                                                        color='primary'
                                                        sx={{
                                                            color: theme.palette.warning.dark,
                                                            borderColor: theme.palette.warning.main,
                                                            '&:hover ': { background: theme.palette.warning.light }
                                                        }}
                                                        size='large'
                                                    >
                                                        <EditIcon sx={{ fontSize: '1.1rem' }} />
                                                    </IconButton>
                                                </Tooltip>

                                                <Tooltip placement='top' title='Delete'>
                                                    <IconButton
                                                        color='primary'
                                                        sx={{
                                                            color: theme.palette.orange.dark,
                                                            borderColor: theme.palette.orange.main,
                                                            '&:hover ': { background: theme.palette.orange.light }
                                                        }}
                                                        size='large'
                                                    >
                                                        <DeleteIcon sx={{ fontSize: '1.1rem' }} />
                                                    </IconButton>
                                                </Tooltip>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </MainCard>
        </>
    );
};

export default UserDashboard;
