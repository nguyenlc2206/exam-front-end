import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

interface Props {
    title: string;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    children?: React.ReactNode;
    handleAdd: () => Promise<void>;
}

// ===============================|| UI DIALOG - FORMS ||=============================== //

export default function FormDialog({ open, setOpen, children, title, handleAdd }: Props) {
    const theme = useTheme();

    return (
        <div>
            <Dialog fullWidth open={open} onClose={() => setOpen(false)} aria-labelledby='form-dialog-title'>
                {open && (
                    <>
                        <DialogTitle id='form-dialog-title'>
                            <Typography sx={{ fontWeight: 550, fontSize: '20px' }}>{title}</Typography>
                        </DialogTitle>
                        <DialogContent>{children}</DialogContent>
                        <DialogActions sx={{ pr: 2 }}>
                            <Button
                                sx={{ color: theme.palette.error.dark }}
                                onClick={() => setOpen(false)}
                                color='secondary'
                            >
                                Cancel
                            </Button>
                            <LoadingButton
                                onClick={() => handleAdd()}
                                loading={!open}
                                variant='contained'
                                size='small'
                                color='secondary'
                            >
                                <span>Add</span>
                            </LoadingButton>
                            {/* <Button variant='contained' size='small' onClick={() => handleAdd()}>
                                Add
                            </Button> */}
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </div>
    );
}
