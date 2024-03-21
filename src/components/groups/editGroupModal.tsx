
import { Typography, Card, Button } from '@mui/material';
import { CoursesService } from './groupsService';
import { IRequestGroupsCreateData } from "../../types/coursesTypes/groupCourses"
import { useEffect, useState } from 'react';

import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

type CreateModalProps = {
    id: string
    groupName: string
    open: boolean;
    handleClose: () => void;
    setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};

export const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 90,
    p: 6,
    borderRadius: 2,
};

export const EditModal = ({ groupName, open, handleClose, setUpdated, id }: CreateModalProps) => {

    const [textValue, setTextValue] = useState<IRequestGroupsCreateData>({ name: '' });

    const handleClick = async () => {
        try {

            const updateInfo: IRequestGroupsCreateData = {
                name: textValue.name
            }

            await CoursesService.editGroup(updateInfo, id);
            setUpdated(true);
            handleClose();
        } catch (error) {
            console.log("bruh");
        }
    };

    useEffect(() => {
        const name: IRequestGroupsCreateData = {
            name: groupName
        }
        setTextValue(name);
    }, [groupName]);

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
            <Typography id="modal-modal-title" fontWeight="bold" variant="h5" sx={{ marginBottom: "10px" }}>Редактировать группу</Typography>
            <TextField
                sx={{ marginBottom: 1.5 }}
                fullWidth
                id="name"
                name="name"
                label="Название"
                value={textValue.name}
                variant="outlined"
                onChange={handleChange}
            />
            <Button variant="contained" color = {"warning"} onClick={handleClick}>
                редактировать
            </Button>
        </Card>
    </Modal>
    );
};

export default EditModal