import { Draggable, Droppable } from '@hello-pangea/dnd';
import {
    Box,
    Collapse,
    IconButton,
    Link,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Theme,
    Tooltip,
    Typography,
    useTheme
} from '@mui/material';
import { CSSProperties, FC } from 'react';

import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MenuBookTwoToneIcon from '@mui/icons-material/MenuBookTwoTone';

import Chip from '@package:src/applications/widgets/chips/Chip';
import { ExamEntity } from '@package:src/domain/entities/Exam';
import { QuestionsEntity } from '@package:src/domain/entities/Question';
import QuestionItem from '@package:src/applications/journey/admin/components/exams/QuestionItem';
import { useNavigate } from 'react-router-dom';

interface Props {
    item: ExamEntity;
    index: number;
    handleOpen: React.Dispatch<React.SetStateAction<ExamEntity>>;
}

const getDropWrapper = (isDraggingOver: boolean, theme: Theme) => ({
    background: isDraggingOver ? theme.palette.secondary.light + 50 : 'transparent'
});

// drag wrapper
const getDragWrapper = (isDragging: boolean, theme: Theme, open: boolean): CSSProperties | undefined => {
    const bgcolor = theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.primary.light;
    return {
        backgroundColor: isDragging || open ? bgcolor : 'transparent',
        userSelect: 'none'
    };
};

// ==============================|| EXAM ITEM - ITEMS ||============================== //

const ExamItem = ({ item, index, handleOpen }: Props) => {
    /** init hooks */
    const theme = useTheme();
    const navigate = useNavigate();

    /** handle add question for exam */
    const handleAddQuestions = async (item: ExamEntity) => {
        // console.log('>>>Check id:', item?.id);
        navigate(`${item.id}`);
    };

    return (
        <Draggable draggableId={item.id} index={index}>
            {(provided, snapshot) => (
                <>
                    <TableRow
                        hover
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        sx={getDragWrapper(snapshot.isDragging, theme, item.status)}
                    >
                        <TableCell
                            sx={{
                                pl: 3,
                                minWidth: 110,
                                width: 110,
                                height: 46
                            }}
                        >
                            <Stack direction='row' spacing={0.25} alignItems='center'>
                                <Tooltip title='Add Question'>
                                    <IconButton
                                        aria-label='expand row'
                                        size='small'
                                        onClick={() => handleAddQuestions(item)}
                                    >
                                        <AddCircleTwoToneIcon fontSize='small' color='primary' />
                                    </IconButton>
                                </Tooltip>

                                <IconButton aria-label='expand row' size='small' onClick={() => handleOpen(item)}>
                                    {item.status ? (
                                        <KeyboardArrowDownIcon fontSize='small' />
                                    ) : (
                                        <KeyboardArrowRightIcon fontSize='small' />
                                    )}
                                </IconButton>
                            </Stack>
                        </TableCell>

                        <TableCell sx={{ width: 90, minWidth: 90 }}>
                            <Stack direction='row' spacing={0.5} alignItems='center'>
                                <MenuBookTwoToneIcon
                                    color='secondary'
                                    sx={{
                                        fontSize: '0.875rem'
                                    }}
                                />
                                <Typography variant='body2'>{item.id}</Typography>
                            </Stack>
                        </TableCell>

                        <TableCell sx={{ maxWidth: 'calc(100vw - 1150px)', minWidth: 100 }} component='th' scope='row'>
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

                        <TableCell sx={{ width: 200, minWidth: 200 }}>
                            {item.deletedAt ? (
                                <Chip label='InActive' chipcolor='error' />
                            ) : (
                                <Chip chipcolor='success' label='Active' />
                            )}
                        </TableCell>

                        {/* <TableCell
                            sx={{
                                width: 140,
                                minWidth: 140
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

                    <Droppable droppableId={item.id} type='item'>
                        {(providedDrop, snapshotDrop) => (
                            <TableRow
                                ref={providedDrop.innerRef}
                                {...providedDrop.droppableProps}
                                sx={getDropWrapper(snapshotDrop.isDraggingOver, theme)}
                            >
                                <TableCell style={{ padding: 0 }} colSpan={8}>
                                    <Collapse in={item.status} timeout='auto' unmountOnExit>
                                        {item.status && (
                                            <Box
                                                sx={{
                                                    margin: 0
                                                }}
                                            >
                                                <TableContainer>
                                                    <Table size='small' aria-label='purchases'>
                                                        <TableBody>
                                                            {item.questions.map(
                                                                (questions: QuestionsEntity, index: number) => {
                                                                    return (
                                                                        <QuestionItem
                                                                            key={index}
                                                                            item={questions}
                                                                            index={index}
                                                                        />
                                                                    );
                                                                }
                                                            )}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </Box>
                                        )}
                                    </Collapse>
                                </TableCell>
                            </TableRow>
                        )}
                    </Droppable>
                </>
            )}
        </Draggable>
    );
};

export default ExamItem;
