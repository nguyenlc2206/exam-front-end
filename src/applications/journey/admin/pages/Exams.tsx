import * as _ from 'lodash';
import React, { FC, useEffect } from 'react';

import {
    Avatar,
    Box,
    Button,
    DialogContentText,
    Grid,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Theme,
    Tooltip,
    Typography,
    useTheme
} from '@mui/material';
import { ExamEntity } from '@package:src/domain/entities/Exam';

// assets
import AddIcon from '@mui/icons-material/Add';

// third-party
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import MainCard from '@package:src/applications/widgets/cards/MainCard';
import ExamItem from '@package:src/applications/journey/admin/components/exams/ExamItem';
import CustomizedDialogs from '@package:src/applications/widgets/dialogs/CustomizedDialogs';
import FormControlSelect from '@package:src/applications/widgets/forms/FormControlSelect';
import SubCard from '@package:src/applications/widgets/cards/SubCard';
import AnimateButton from '@package:src/applications/widgets/buttons/AnimateButton';
import Avatar1 from '@package:src/assets/images/users/avatar-1.png';

import { ExamServicesImpl } from '@package:src/domain/services/exams';
import { ExamRepositoryImpl } from '@package:src/infras/repository/exam.repository.impl';
import { CategoryServicesImpl } from '@package:src/domain/services/categories';
import { CategoryRepositoryImpl } from '@package:src/infras/repository/category.repository.impl';
import { CategoryEntity } from '@package:src/domain/entities/Category';
import FormDialog from '@package:src/applications/widgets/forms/FormDialog';
import { dispatch } from '@package:src/common/redux/store';
import { openSnackbar } from '@package:src/common/redux/slice/snackbar';

const getDropWrapper = (isDraggingOver: boolean, theme: Theme) => ({
    background: isDraggingOver ? theme.palette.secondary.light + 50 : 'transparent'
});

// select options
type currenciesType = {
    value: string;
    label: string;
};

// ==============================|| ADMIN EXAMS DASHBOARD ||============================== //

const ExamsDashboard: FC = () => {
    /** init services */
    const examServices = new ExamServicesImpl(new ExamRepositoryImpl());
    const categoryServices = new CategoryServicesImpl(new CategoryRepositoryImpl());

    /** init hooks */
    const theme = useTheme();
    const [data, setData] = React.useState([] as ExamEntity[]);
    const [openRow, setOpenRow] = React.useState(false);
    const [openExam, setOpenExam] = React.useState(false);
    const [openCategory, setOpenCategory] = React.useState(false);
    const [currencies, setCurrencies] = React.useState([] as Array<currenciesType>);

    const [categoryName, setCategoryName] = React.useState('');
    const [categoryValid, setCategoryValid] = React.useState(false);

    const [examTitle, setExamTitle] = React.useState('');
    const [examTitleValid, setExamTitleValid] = React.useState(false);
    const [examSubTitle, setExamSubTitle] = React.useState('');
    const [examSubTitleValid, setExamSubTitleValid] = React.useState(false);

    const [currency, setCurrency] = React.useState('');
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
        event?.target.value && setCurrency(event?.target.value);
    };

    /** define content modal add exam */
    const modalAddExam: React.ReactNode = (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    id='Title'
                    label='Title'
                    value={examTitle}
                    error={examTitleValid}
                    onChange={(event) => setExamTitle(event.target.value)}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    id='SubTitle'
                    label='SubTitle'
                    value={examSubTitle}
                    error={examSubTitleValid}
                    onChange={(event) => setExamSubTitle(event.target.value)}
                />
            </Grid>
            <Grid item xs={12}>
                <FormControlSelect
                    currencies={currencies}
                    captionLabel='Categories'
                    selected={currencies[0]?.value}
                    value={currency}
                    handleChange={handleChange}
                />
            </Grid>
            <Grid item xs={12}>
                <SubCard title='Exam Picture' contentSX={{ textAlign: 'center' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Avatar alt='User 1' src={Avatar1} sx={{ width: 100, height: 100, margin: '0 auto' }} />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='subtitle2' align='center'>
                                Upload/Change Your Exam Image
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <AnimateButton>
                                <Button variant='contained' size='small'>
                                    Upload Image
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
        </Grid>
    );

    /** define content modal add category */
    const modalAddCategory: React.ReactNode = (
        <Stack spacing={3}>
            <DialogContentText>
                <Typography variant='body2' component='span'>
                    Enter the category name into the input
                </Typography>
            </DialogContentText>
            <TextField
                autoFocus
                fullWidth
                size='small'
                id='Category Name'
                label='Category Name'
                type='text'
                error={categoryValid}
                value={categoryName}
                onChange={(event) => setCategoryName(event.target.value)}
            />
        </Stack>
    );

    /** handle fetch list exams */
    const handlerFetchListExams = async () => {
        const res = await examServices.getAll();
        if (res.isFailure()) return;

        // console.log('>>>Check res:', res.data?.exams);
        setData(res.data.exams);
    };

    /** handle Open */
    const handleOpen = (item: ExamEntity) => {
        setOpenRow(!openRow);
        _.set(_.find(data, { id: item.id }), 'status', !item.status);
        // console.log(data);
    };

    /** handle get all categories */
    const handleGetAllCategories = async () => {
        const res = await categoryServices.getAll();
        if (res.isFailure()) return;

        // console.log('>>>Check res:', res);
        const _currencies: currenciesType[] = [];
        res.data.categories.map((item: CategoryEntity) => {
            _currencies.push({
                label: item?.name,
                value: item?.id
            });
        });
        setCurrencies(_currencies);
        setCurrency(_currencies[0]?.value);
    };

    /** handle add category */
    const handleAddCategory = async () => {
        // console.log('>>>Check category name:', categoryName);
        setCategoryValid(false);
        if (!categoryName) setCategoryValid(true);

        /** call service to create category */
        if (categoryName) {
            const data = { name: categoryName };
            const res = await categoryServices.createCategory(data);
            if (res.isFailure()) return;
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
            setOpenCategory(false);
        }
    };

    /** handle add exam */
    const handleAddExam = async () => {
        setExamTitleValid(false);
        setExamSubTitleValid(false);

        if (currencies.length === 0) {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Not have categores.',
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    close: false
                })
            );
            return;
        }
        /** validate */
        if (!examTitle) setExamTitleValid(true);
        if (!examSubTitle) setExamSubTitleValid(true);

        // console.log('>>>Check category:', currency);
        const categoryName = _.find(currencies, { value: currency });

        /** call service all exam */
        const data = {
            title: examTitle,
            subTitle: examSubTitle,
            image: 'https://ilinks.io/static/images/main.webp',
            category: categoryName?.label
        };
        const res = await examServices.createExam(data);

        if (res.isFailure()) {
            dispatch(
                openSnackbar({
                    open: true,
                    message: res.error?.message,
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    close: false
                })
            );
            return;
        }

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
        setOpenExam(false);
    };

    /** useEffect */
    useEffect(() => {
        handlerFetchListExams();
        handleGetAllCategories();
    }, [openCategory, openExam]);

    return (
        <Box sx={{ display: 'flex' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        variant='contained'
                        size='small'
                        color='primary'
                        onClick={() => setOpenCategory(true)}
                        endIcon={<AddIcon />}
                    >
                        <Typography>ADD CATEGORY</Typography>
                    </Button>
                    <FormDialog
                        open={openCategory}
                        setOpen={setOpenCategory}
                        title='Add Category'
                        children={modalAddCategory}
                        handleAdd={handleAddCategory}
                    />
                </Grid>

                <Grid item xs={12}>
                    <MainCard contentSX={{ p: 2 }}>
                        <TableContainer>
                            <DragDropContext onDragEnd={() => {}}>
                                <Droppable droppableId='exam-story' type='exam-story'>
                                    {(provided, snapshot) => (
                                        <>
                                            <Table
                                                size='small'
                                                aria-label='collapsible table'
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                sx={getDropWrapper(snapshot.isDraggingOver, theme)}
                                            >
                                                <TableHead sx={{ '& th,& td': { whiteSpace: 'nowrap' } }}>
                                                    <TableRow>
                                                        <TableCell sx={{ pl: 3 }}>
                                                            <Tooltip title='Add Exams'>
                                                                <Button
                                                                    variant='contained'
                                                                    size='small'
                                                                    color='secondary'
                                                                    onClick={() => setOpenExam(true)}
                                                                    endIcon={<AddIcon />}
                                                                >
                                                                    ADD
                                                                </Button>
                                                            </Tooltip>
                                                            <CustomizedDialogs
                                                                title='Add new exam'
                                                                open={openExam}
                                                                setOpen={setOpenExam}
                                                                children={modalAddExam}
                                                                handleAdd={handleAddExam}
                                                            />
                                                        </TableCell>
                                                        <TableCell>Id</TableCell>
                                                        <TableCell>Title</TableCell>
                                                        <TableCell>Status</TableCell>
                                                        {/* <TableCell>CreatedAt</TableCell> */}
                                                        <TableCell>DeletedAt</TableCell>
                                                    </TableRow>
                                                </TableHead>

                                                <TableBody sx={{ '& th,& td': { whiteSpace: 'nowrap' } }}>
                                                    {data.map((item: ExamEntity, index: number) => {
                                                        return (
                                                            <ExamItem
                                                                key={index}
                                                                item={item}
                                                                index={index}
                                                                handleOpen={handleOpen}
                                                            />
                                                        );
                                                    })}
                                                </TableBody>
                                            </Table>
                                        </>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </TableContainer>
                    </MainCard>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ExamsDashboard;
