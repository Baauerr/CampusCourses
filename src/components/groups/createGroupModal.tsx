
import { Typography, Card, Button, Backdrop  } from '@mui/material';
import { CoursesService } from './groupsService';
import { IRequestGroupsCreateData } from "../../types/coursesTypes/groupCourses"
import { useState } from 'react';

import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { style } from './editGroupModal';

type CreateModalProps = {
    open: boolean;
    handleClose: () => void;
    setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreateModal = ({ open, handleClose, setUpdated }: CreateModalProps) => {

    const [textValue, setTextValue] = useState<IRequestGroupsCreateData>({ name: '' });

    const handleClick = async () => {
        try {

            

            await CoursesService.createGroup(textValue);
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