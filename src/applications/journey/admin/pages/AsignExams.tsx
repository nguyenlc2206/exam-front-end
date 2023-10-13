import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { visuallyHidden } from '@mui/utils';
import * as _ from 'lodash';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MainCard from '@package:src/applications/widgets/cards/MainCard';
import {
    Box,
    Checkbox,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar,
    Tooltip,
    Typography,
    useTheme
} from '@mui/material';
import {
    ArrangementOrder,
    EnhancedTableHeadProps,
    EnhancedTableToolbarProps,
    GetComparator,
    HeadCell,
    KeyedObject
} from '@package:src/common/types';
import React from 'react';
import { ExamEntity } from '@package:src/domain/entities/Exam';
import Chip from '@package:src/applications/widgets/chips/Chip';
import { ExamServicesImpl } from '@package:src/domain/services/exams';
import { ExamRepositoryImpl } from '@package:src/infras/repository/exam.repository.impl';
import { useDispatch } from '@package:src/common/redux/store';
import { openSnackbar } from '@package:src/common/redux/slice/snackbar';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

// table sort
function descendingComparator(a: KeyedObject, b: KeyedObject, orderBy: string) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

const getComparator: GetComparator = (order, orderBy) =>
    order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);

function stableSort(array: ExamEntity[], comparator: (a: ExamEntity, b: ExamEntity) => number) {
    const stabilizedThis = array.map((el: ExamEntity, index: number) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0] as ExamEntity, b[0] as ExamEntity);
        if (order !== 0) return order;
        return (a[1] as number) - (b[1] as number);
    });
    return stabilizedThis.map((el) => el[0]);
}

// table header options
const headCells: HeadCell[] = [
    {
        id: 'title',
        numeric: false,
        label: 'Exam Title',
        align: 'left'
    },
    {
        id: 'asign',
        numeric: false,
        label: 'Asign',
        align: 'left'
    },
    {
        id: 'status',
        numeric: false,
        label: 'Status',
        align: 'center'
    }
];

// ==============================|| TABLE HEADER ||============================== //

interface CustomerListEnhancedTableHeadProps extends EnhancedTableHeadProps {
    selected: string[];
}

function EnhancedTableHead({
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    selected,
    actionToolBar
}: CustomerListEnhancedTableHeadProps) {
    const createSortHandler = (property: string) => (event: React.SyntheticEvent<Element, Event>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding='checkbox' sx={{ pl: 3 }}>
                    <Checkbox
                        color='primary'
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts'
                        }}
                    />
                </TableCell>
                {numSelected > 0 && (
                    <TableCell padding='none' colSpan={6}>
                        <EnhancedTableToolbar numSelected={selected.length} action={actionToolBar} />
                    </TableCell>
                )}
                {numSelected <= 0 &&
                    headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.align}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component='span' sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                {numSelected <= 0 && (
                    <TableCell sortDirection={false} align='center' sx={{ pr: 3 }}>
                        Action
                    </TableCell>
                )}
            </TableRow>
        </TableHead>
    );
}

// ==============================|| TABLE HEADER TOOLBAR ||============================== //

const EnhancedTableToolbar = ({ numSelected, action }: EnhancedTableToolbarProps) => (
    <Toolbar
        sx={{
            p: 0,
            pl: 1,
            pr: 1,
            ...(numSelected > 0 && {
                color: (theme) => theme.palette.secondary.main
            })
        }}
    >
        {numSelected > 0 ? (
            <Typography color='inherit' variant='h4'>
                {numSelected} Selected
            </Typography>
        ) : (
            <Typography variant='h6' id='tableTitle'>
                Nutrition
            </Typography>
        )}
        <Box sx={{ flexGrow: 1 }} />
        {numSelected > 0 && (
            <Tooltip title='Asign Exams'>
                <IconButton size='large' onClick={action}>
                    <AddCircleOutlineIcon fontSize='small' />
                </IconButton>
            </Tooltip>
        )}
    </Toolbar>
);

// ==============================|| ADMIN ASIGN EXAMS DASHBOARD ||============================== //

const AsignExamsUser: FC = () => {
    /** init services */
    const examServices = new ExamServicesImpl(new ExamRepositoryImpl());

    /** init hooks */
    const theme = useTheme();
    const dispatch = useDispatch();

    const [selected, setSelected] = React.useState<string[]>([]);
    const [order, setOrder] = React.useState<ArrangementOrder>('asc');
    const [orderBy, setOrderBy] = React.useState<string>('calories');
    const [rows, setRows] = React.useState<ExamEntity[]>([]);
    const [rowUsers, setRowUsers] = React.useState<ExamEntity[]>([]);
    const [page, setPage] = React.useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
    const [asignStatus, setAsignStatus] = React.useState<boolean>(false);

    /** init variables */
    const { id: userId } = useParams();

    /** handler select all */
    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            if (selected.length > 0) {
                setSelected([]);
            } else {
                const newSelectedId = rows.map((n) => n.id);
                setSelected(newSelectedId);
            }
            return;
        }
        setSelected([]);
    };

    /** handler request sort */
    const handleRequestSort = (event: React.SyntheticEvent<Element, Event>, property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    /** handle Click */
    const handleClick = (event: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>, row: ExamEntity) => {
        const selectedIndex = selected.indexOf(row?.id);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, row?.id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setSelected(newSelected);
    };

    const isSelected = (examId: string) => selected.indexOf(examId) !== -1;

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
        event?.target.value && setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    /** handle get list exam */
    const handleGetListExams = async () => {
        const resUser = await examServices.getByUserId(userId);
        if (resUser.isFailure()) return;

        const res = await examServices.getAll();
        if (res.isFailure()) return;

        res.data?.exams.map((item: any, index: number) => {
            if (resUser?.data?.data?.exams.length) {
                resUser?.data?.data?.exams.map((ele: any) => {
                    if (item?.id === ele?.id) {
                        res.data.exams[index]['selected'] = true;
                    } else if (!res.data.exams[index]['selected']) {
                        res.data.exams[index]['selected'] = false;
                    }
                });
            } else {
                res.data.exams[index]['selected'] = false;
            }
        });
        // console.log(res?.data?.exams);

        // const listDifferent: any = _.differenceBy(res.data?.exams, resUser?.data?.data?.exams, 'id');

        setRows(res?.data?.exams);
        setRowUsers(resUser?.data?.data?.exams);
    };

    /** handle assign exam to user */
    const handleAsignExamUser = async () => {
        // console.log('>>>Check selected:', selected);
        const data: KeyedObject = {
            userId: userId,
            examId: selected
        };
        const res = await examServices.asignExamUser(data);
        if (res.isFailure()) {
            dispatch(
                openSnackbar({
                    open: true,
                    message: res.error.message,
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    close: false
                })
            );
            return;
        }

        // console.log('>>>Check res:', res.data);

        dispatch(
            openSnackbar({
                open: true,
                message: res.data?.message,
                variant: 'alert',
                alert: {
                    color: 'success'
                },
                close: false
            })
        );

        setAsignStatus(!asignStatus);
    };

    /** useEffect */
    React.useEffect(() => {
        handleGetListExams();
    }, [asignStatus]);

    return (
        <>
            <MainCard title='Exams List' content={false}>
                {/* table */}
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                            selected={selected}
                            actionToolBar={handleAsignExamUser}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    /** Make sure no display bugs if row isn't an OrderData object */
                                    if (typeof row === 'number') return null;
                                    const isItemSelected = isSelected(row?.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            role='checkbox'
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={index}
                                            selected={isItemSelected}
                                        >
                                            <TableCell
                                                padding='checkbox'
                                                sx={{ pl: 3 }}
                                                onClick={(event) => handleClick(event, row)}
                                            >
                                                <Checkbox
                                                    color='primary'
                                                    checked={isItemSelected || row.selected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId
                                                    }}
                                                    disabled={row.selected}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component='th'
                                                id={labelId}
                                                scope='row'
                                                onClick={(event) => handleClick(event, row)}
                                                sx={{ cursor: 'pointer' }}
                                            >
                                                <Typography
                                                    variant='subtitle1'
                                                    sx={{
                                                        color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900'
                                                    }}
                                                >
                                                    {' '}
                                                    {row.title}{' '}
                                                </Typography>
                                            </TableCell>

                                            <TableCell align='left'>
                                                {row.selected === true && (
                                                    <Chip label='Acitve' size='small' chipcolor='success' />
                                                )}
                                                {row.selected === false && (
                                                    <Chip label='Inactive' size='small' chipcolor='error' />
                                                )}
                                            </TableCell>

                                            <TableCell align='center'>
                                                {row.deletedAt === null && (
                                                    <Chip label='Complete' size='small' chipcolor='success' />
                                                )}
                                            </TableCell>

                                            <TableCell align='center' sx={{ pr: 3 }}>
                                                <IconButton color='secondary' size='large' aria-label='View'>
                                                    <EditTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 53 * emptyRows
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* table pagination */}
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component='div'
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </MainCard>
        </>
    );
};

export default AsignExamsUser;
