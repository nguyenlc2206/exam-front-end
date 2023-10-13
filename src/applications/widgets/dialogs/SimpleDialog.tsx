import React from 'react';

// material-ui
import { Button, Dialog, Alert, useTheme } from '@mui/material';

// alert user data
const emails = [
    {
        email: 'username@company.com',
        avatar: 'avatar-1.png'
    },
    {
        email: 'user02@company.com',
        avatar: 'avatar-2.png'
    }
];

// ===============================|| DIALOG ||=============================== //

interface SimpleDialogProps {
    onClose: (s: string) => void;
    open: boolean;
}

function SimpleDialog({ onClose, open }: SimpleDialogProps) {
    const theme = useTheme();

    return (
        <Dialog onClose={onClose} aria-labelledby='simple-dialog-title' open={open}>
            {open && (
                <>
                    <Alert variant='outlined' severity='info' sx={{ borderColor: theme.palette.primary.main, m: 1 }}>
                        This is an info alert — check it out!
                    </Alert>
                </>
            )}
        </Dialog>
    );
}

// ===============================|| UI DIALOG - SIMPLE ||=============================== //

export default function SimpleDialogDemo() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            <Button variant='contained' onClick={handleClickOpen}>
                Open simple dialog
            </Button>
            <SimpleDialog open={open} onClose={() => setOpen(false)} />
        </div>
    );
}
