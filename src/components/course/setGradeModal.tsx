import { Typography, Card, Button } from '@mui/material';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import { style } from '../modalWindows/styles';
import { CourseService } from './CourseService';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import 'react-quill/dist/quill.snow.css';
import { IRequestSetMarkData, IResultsStatusesData, MarkType } from '../../types/coursesTypes/courseTypes';

type setMarkModalProps = {
    courseId?: string
    studentId?: string
    open: boolean;
    handleClose: () => void;
    setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
    oldGrade: IResultsStatusesData
    markType: MarkType
};

export const SetGradeModal = ({ open, handleClose, setUpdated, courseId, studentId, oldGrade, markType }: setMarkModalProps) => {

    const [newMark, setGrade] = useState<IResultsStatusesData>(oldGrade);

    const handleClick = async (markType: MarkType) => {

        const mark: IRequestSetMarkData = {
            markType: markType,
            mark: newMark
        };

        try {
            await CourseService.setUserMark(mark, courseId, studentId);
            setUpdated(true);
            handleClose();
        } catch (error) {
            console.log("bruh");
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGrade(event.target.value as IResultsStatusesData); 
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
            <Typography id="modal-modal-title" fontWeight="bold" variant="h5" sx={{ marginBottom: "10px" }}>Изменить оценку для {markTypeTranslator(markType)}</Typography>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                value={newMark}
                sx={{ marginBottom: 2 }}
                onChange={handleChange}
            >
                <FormControlLabel value="Failed" control={<Radio />} label="Провал" />
                <FormControlLabel value="Passed" control={<Radio />} label="Сдано" />
            </RadioGroup>
            <Button variant="contained" color={"primary"} onClick={() => handleClick(markType)}>
                сохранить
            </Button>
        </Card>
    </Modal>
    );
};

const markTypeTranslator = (markType: MarkType): string => {
    switch(markType){
        case MarkType.Midterm:
            return "Промежуточная аттестация"
        case MarkType.Final:
            return "Финальная аттестация"
    }
}

export default SetGradeModal