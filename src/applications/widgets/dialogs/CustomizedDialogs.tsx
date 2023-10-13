import React from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Button, Dialog, DialogProps, IconButton } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

// assets
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuDialogContent-root': {
        padding: theme.spacing(2)
    },
    '& .MuDialogActions-root': {
        padding: theme.spacing(1)
    }
}));

interface Props {
    title: string;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    children?: React.ReactNode;
    handleAdd: () => Promise<void>;
}

interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

const BootstrapDialogTitle = ({ children, onClose, ...other }: DialogTitleProps) => (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
            <IconButton
                aria-label='close'
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 10,
                    top: 10,
                    color: (theme) => theme.palette.grey[500]
                }}
            >
                <CloseIcon />
            </IconButton>
        ) : null}
    </DialogTitle>
);

const CustomizedDialogs = ({ open, setOpen, children, title, handleAdd }: Props) => {
    const theme = useTheme();

    return (
        <div>
            <BootstrapDialog
                fullWidth
                onClose={() => setOpen(false)}
                aria-labelledby='customized-dialog-title'
                open={open}
            >
                <BootstrapDialogTitle id='customized-dialog-title' onClose={() => setOpen(false)}>
                    {title}
                </BootstrapDialogTitle>
                <DialogContent dividers>{children}</DialogContent>
                <DialogActions sx={{ pr: 2.5 }}>
                    <Button sx={{ color: theme.palette.error.dark }} onClick={() => setOpen(false)} color='secondary'>
                        Cancel
                    </Button>
                    <Button variant='contained' size='small' onClick={() => handleAdd()}>
                        Add
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
};

export default CustomizedDialogs;
