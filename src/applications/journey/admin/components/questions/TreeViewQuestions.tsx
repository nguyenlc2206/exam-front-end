import React, { useEffect } from 'react';

// material-ui
import { alpha, styled } from '@mui/material/styles';
import { Checkbox, Collapse, CollapseProps, IconButton, Stack, TextField, Tooltip } from '@mui/material';
import { treeItemClasses, TreeItemProps } from '@mui/lab';
import { TreeView, TreeItem } from '@mui/x-tree-view';

// assets
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

// tree icons
function MinusSquare(props: SvgIconProps) {
    return (
        <SvgIcon fontSize='inherit' style={{ width: 14, height: 14 }} {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path d='M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z' />
        </SvgIcon>
    );
}

function PlusSquare(props: SvgIconProps) {
    return (
        <SvgIcon fontSize='inherit' style={{ width: 14, height: 14 }} {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path d='M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z' />
        </SvgIcon>
    );
}

function CloseSquare(props: SvgIconProps) {
    return (
        <SvgIcon className='close' fontSize='inherit' style={{ width: 14, height: 14 }} {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path d='M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z' />
        </SvgIcon>
    );
}

// animation
function TransitionComponent(props: CollapseProps) {
    return <Collapse {...props} />;
}

// style constant
const StyledTreeItem = styled((props: TreeItemProps) => (
    <TreeItem {...props} TransitionComponent={TransitionComponent} />
))(({ theme }) => ({
    [`& .${treeItemClasses.iconContainer}`]: {
        '& .close': {
            opacity: 0.3
        }
    },
    [`& .${treeItemClasses.group}`]: {
        marginLeft: 15,
        paddingLeft: 18,
        borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`
    }
}));

type Props = {
    questions: any[];
    handleAddAnswer: (item: any) => Promise<void>;
    handleRemoveAnswer: (questionId: string, answerId: string) => Promise<void>;
    handleOnChangeTextFieldQuestion: (event: React.ChangeEvent<HTMLInputElement>, questionId: string) => void;
    handleOnChangeTextFieldAnswer: (
        event: React.ChangeEvent<HTMLInputElement>,
        questionId: string,
        answerId: string
    ) => void;
    handSelectAnswer: (event: React.ChangeEvent<HTMLInputElement>, questionId: string, answerId: string) => void;
    expanded: string[];
    setExpanded: any;
};
// ==============================|| UI TREEVIEW - CUSTOMIZED ||============================== //

const CustomizedTreeView = ({
    questions,
    handleAddAnswer,
    handleRemoveAnswer,
    handleOnChangeTextFieldQuestion,
    handleOnChangeTextFieldAnswer,
    handSelectAnswer,
    expanded,
    setExpanded
}: Props) => {
    /** init services */
    const [selected, setSelected] = React.useState<string[]>([]);

    const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
        setExpanded(nodeIds);
    };

    const handleSelect = (event: React.SyntheticEvent, nodeIds: string[]) => {
        setSelected(nodeIds);
    };

    /** useEffect */
    useEffect(() => {}, []);

    return (
        <TreeView
            aria-label='controlled'
            expanded={expanded}
            selected={selected}
            onNodeToggle={handleToggle}
            onNodeSelect={handleSelect}
            multiSelect
            defaultCollapseIcon={<MinusSquare />}
            defaultExpandIcon={<PlusSquare />}
            defaultEndIcon={<PlusSquare />}
        >
            {questions.length ? (
                questions.map((item: any, index: number) => {
                    return (
                        <Stack key={item?.questionId} direction='row' spacing={0.25} alignItems='center'>
                            <StyledTreeItem
                                sx={{ flexGrow: 1 }}
                                nodeId={`${index + 1}`}
                                label={item?.questionId}
                                onClick={() => {}}
                            >
                                <Stack sx={{ p: 1 }}>
                                    <TextField
                                        fullWidth
                                        id='answer-basic'
                                        label='Question title'
                                        variant='standard'
                                        value={item?.title}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            handleOnChangeTextFieldQuestion(event, item?.questionId);
                                        }}
                                    />
                                </Stack>

                                {item.answers.length ? (
                                    item.answers.map((answer: any) => {
                                        return (
                                            <Stack
                                                key={answer?.answerId}
                                                direction='row'
                                                spacing={0.25}
                                                sx={{ p: 1 }}
                                                alignItems='center'
                                            >
                                                <StyledTreeItem
                                                    sx={{ flexGrow: 1 }}
                                                    nodeId={answer?.answerId}
                                                    label={answer?.answerId}
                                                >
                                                    <Stack
                                                        sx={{ my: 1.25 }}
                                                        direction='row'
                                                        spacing={0.25}
                                                        alignItems='center'
                                                    >
                                                        <Checkbox
                                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                                                handSelectAnswer(
                                                                    event,
                                                                    item?.questionId,
                                                                    answer?.answerId
                                                                )
                                                            }
                                                            defaultChecked={
                                                                item?.answerCorrectId &&
                                                                answer?.answerId === item?.answerCorrectId
                                                            }
                                                        />
                                                        <TextField
                                                            fullWidth
                                                            id='answer-basic'
                                                            label='Answer title'
                                                            variant='standard'
                                                            value={answer?.title}
                                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                                                handleOnChangeTextFieldAnswer(
                                                                    event,
                                                                    item?.questionId,
                                                                    answer?.answerId
                                                                )
                                                            }
                                                        />
                                                    </Stack>
                                                </StyledTreeItem>

                                                <Tooltip title='Remove answer'>
                                                    <IconButton
                                                        aria-label='expand row'
                                                        size='small'
                                                        onClick={() =>
                                                            handleRemoveAnswer(item?.questionId, answer?.answerId)
                                                        }
                                                    >
                                                        <RemoveCircleIcon fontSize='small' color='primary' />
                                                    </IconButton>
                                                </Tooltip>
                                            </Stack>
                                        );
                                    })
                                ) : (
                                    <></>
                                )}
                            </StyledTreeItem>
                            <Tooltip title='Add Answer'>
                                <IconButton
                                    aria-label='expand row'
                                    size='small'
                                    onClick={() => {
                                        handleAddAnswer(item);
                                    }}
                                >
                                    <AddCircleTwoToneIcon fontSize='small' color='primary' />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    );
                })
            ) : (
                <></>
            )}
        </TreeView>
    );
};

export default CustomizedTreeView;
