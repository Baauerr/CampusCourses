
import { Typography, Card, Button } from '@mui/material';
import { CoursesService } from '../groupsService';
import { IRequestGroupsCreateData } from "../../../types/coursesTypes/groupCourses"
import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

type EditModalProps = {
    id: string
    groupName: string
    openEdit: boolean;
    handleClose: () => void;
    setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};

export const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80%",
    maxWidth: "600px",
    height: "auto",
    maxHeight: "80%",
    boxShadow: 90,
    p: 6,
    borderRadius: 2,
    overflowY: 'auto',
};

export const EditModal = ({ groupName, openEdit, handleClose, setUpdated, id }: EditModalProps) => {

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
        open={openEdit}
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
            <Button variant="contained" color={"warning"} onClick={handleClick}>
                редактировать
            </Button>
        </Card>
    </Modal>
    );
};

export default EditModal