import { Typography, Card, Button, Grid } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { style } from '../modalWindows/styles';
import { CourseService } from './CourseService';
import { useParams } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { CreateModalProps } from '../../types/propsTypes/corsePropsTypes';

export const CreateNotification = ({ open, handleClose, setUpdated }: CreateModalProps) => {

    const [textValue, setTextValue] = useState<string>('');
    const [isChecked, setIsChecked] = useState(false);



    const { id } = useParams();

    const handleClick = async () => {
        if (id) {
            await handleCreating(textValue, isChecked, setUpdated, handleClose, id);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTextValue(event.target.value);
    };

    const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
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
            <Typography id="modal-modal-title" fontWeight="bold" variant="h5" sx={{ marginBottom: "10px" }}>Создать уведомление</Typography>
            <TextField
                sx={{ marginBottom: 1.5 }}
                fullWidth
                id="name"
                name="name"
                label="Текст"
                variant="outlined"
                onChange={handleChange}
            />
            <Grid direction="column" item container xs={12} md={12}>
                <FormControlLabel
                    control={<Checkbox checked={isChecked} onChange={handleCheckBoxChange} />}
                    label="Важное уведомление"
                    labelPlacement="end"
                    sx={{ marginBottom: "10px" }}
                />
                <Button variant="contained" onClick={handleClick}>
                    создать
                </Button>
            </Grid>
        </Card>
    </Modal>
    );
};

async function handleCreating(
    textValue: string,
    isChecked: boolean,
    setUpdated: Dispatch<SetStateAction<boolean>>,
    handleClose: () => void,
    id: string
) {
    try {
        const text = textValue;
        const isImportant = isChecked;

        await CourseService.createNotification({ text, isImportant }, id);

        setUpdated(true);
        handleClose();
    } catch (error) {
        console.log("Ошибка при создании уведомления");
    }
}