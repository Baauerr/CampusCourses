
import { Typography, Card, Button } from '@mui/material';
import { GroupsService } from '../groupsService';
import { IRequestGroupsCreateData } from "../../../types/groupsTypes/groupCourses"
import { useState } from 'react';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { style } from '../../modalWindows/styles';

type CreateModalProps = {
    open: boolean;
    handleClose: () => void;
    setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreateModal = ({ open, handleClose, setUpdated }: CreateModalProps) => {

    const [textValue, setTextValue] = useState<IRequestGroupsCreateData>({ name: '' });

    const handleClick = async () => {
        try {
            await GroupsService.createGroup(textValue);
            setUpdated(true);
            handleClose();
        } catch (error) {
            console.log("bruh");
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTextValue({ ...textValue, name: event.target.value });
    };

    return (<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Card sx={style}>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <Typography id="modal-modal-title" fontWeight="bold" variant="h5" sx={{ marginBottom: "10px" }}>Создать группу</Typography>
            <TextField
                sx={{ marginBottom: 1.5 }}
                fullWidth
                id="name"
                name="name"
                label="Название"
                variant="outlined"
                onChange={handleChange}
            />
            <Button variant="contained" onClick={handleClick}>
                создать
            </Button>
        </Card>
    </Modal>
    );
};

export default CreateModal