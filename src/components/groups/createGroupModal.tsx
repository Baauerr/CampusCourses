
import { Typography, Card, Button } from '@mui/material';
import { CoursesService } from './groupsService';
import { IRequestGroupsCreateData } from "../../types/coursesTypes/groupCourses"
import { useState } from 'react';

import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

type CreateModalProps = {
    open: boolean;
    handleClose: () => void;
    setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 90,
    p: 6,
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