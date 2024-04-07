import { Typography, Card, Button } from '@mui/material';
import { Dispatch, useEffect, useState } from 'react';
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
import { markTypeTranslator } from '../../helpers/coursesHelper/marksHelper';
import { setMarkModalProps } from '../../types/propsTypes/corsePropsTypes';

export const SetGradeModal = ({ open, handleClose, setUpdated, courseId, studentId, oldGrade, markType }: setMarkModalProps) => {

    const initialGrade: IResultsStatusesData = oldGrade || IResultsStatusesData.NotDefined;
    const [newMark, setGrade] = useState<IResultsStatusesData>(initialGrade);

    const handleClick = async (markType?: MarkType) => {
        if (markType && courseId && studentId)
            await setGradeClick(markType, newMark, courseId, studentId, setUpdated, handleClose);
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


const setGradeClick = async (
    markType: MarkType,
    newMark: IResultsStatusesData,
    courseId: string,
    studentId: string,
    setUpdated: Dispatch<React.SetStateAction<boolean>>,
    handleClose: () => void
) => {
    const mark: IRequestSetMarkData = {
        markType: markType,
        mark: newMark
    };
    try {
        await CourseService.setUserMark(mark, courseId, studentId);
        setUpdated(true);
        handleClose();
    } catch (error) {
        console.log("Не удалось поставить оценку", error);
    }
}

export default SetGradeModal