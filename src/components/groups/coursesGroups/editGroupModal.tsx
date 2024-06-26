
import { Typography, Card, Button } from '@mui/material';
import { GroupsService } from '../groupsService';
import { IRequestGroupsCreateData } from "../../../types/groupsTypes/groupCourses"
import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { style } from '../../modalWindows/styles';
import { EditGroupModalProps } from '../../../types/propsTypes/groupsPropsTypes';


export const EditModal = ({ groupName, openEdit, handleClose, setUpdated, id }: EditGroupModalProps) => {

    const [textValue, setTextValue] = useState<IRequestGroupsCreateData>({ name: '' });

    const handleClick = async () => {
        try {
            const updateInfo: IRequestGroupsCreateData = {
                name: textValue.name
            }
            await GroupsService.editGroup(updateInfo, id);
            setUpdated(true);
            handleClose();
        } catch (error) {
            console.log("Ошибка при редактировании группы");
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