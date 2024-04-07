import { Typography, Card, Button } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import { style } from '../modalWindows/styles';
import { CourseService } from './CourseService';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import 'react-quill/dist/quill.snow.css';
import { ICourseStatusesData, IRequestChangeCourseStatusData } from '../../types/coursesTypes/courseTypes';
import { EditModalProps } from '../../types/propsTypes/corsePropsTypes';

export const ChangeStatusModal = ({ openEdit, handleClose, setUpdated, id, courseStatus }: EditModalProps) => {

    const [newCourseStatus, setCourseStatus] = useState<ICourseStatusesData>(courseStatus);

    const handleClick = async () => {
        handleStatusChange(newCourseStatus, setUpdated, handleClose, id);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCourseStatus(event.target.value as ICourseStatusesData); // Обновляем состояние при изменении выбора пользователя
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
            <Typography id="modal-modal-title" fontWeight="bold" variant="h5" sx={{ marginBottom: "10px" }}>Изменить статус</Typography>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                value={newCourseStatus}
                sx={{ marginBottom: 2 }}
                onChange={handleChange}
            >

                <FormControlLabel value="Finished" control={<Radio />} label="Закрыт" />
                <FormControlLabel value="Started" control={<Radio />} label="В процессе обучения" />
                {courseStatus !== ICourseStatusesData.Started &&
                    <FormControlLabel value="OpenForAssigning" control={<Radio />} label="Открыт для записи" />
                }

            </RadioGroup>
            <Button variant="contained" color={"warning"} onClick={handleClick}>
                изменить
            </Button>
        </Card>
    </Modal>
    );
};

async function handleStatusChange(
    newCourseStatus: ICourseStatusesData, 
    setUpdated: Dispatch<SetStateAction<boolean>>,
    handleClose: () => void,
    id: string
){
    const newStatus: IRequestChangeCourseStatusData = {
        status: newCourseStatus
    };

    try {
        await CourseService.changeStatus(id, newStatus);
        setUpdated(true);
        handleClose();
    } catch (error) {
        console.log("bruh");
    }
}

export default ChangeStatusModal