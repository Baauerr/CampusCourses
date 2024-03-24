
import { Typography, Card, Button, InputLabel } from '@mui/material';
import { CoursesService } from '../groupsService';
import { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { style } from '../coursesGroups/editGroupModal';
import { useFormik } from "formik";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import createCourseValidation from '../../../helpers/validations/createCourseValidation';
import { useParams } from 'react-router-dom';
import { IResponseUsersData } from '../../../types/userTypes/userGettingTypes';


type CreateModalProps = {
    open: boolean;
    handleClose: () => void;
    setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};


export const CreateCourseModal = ({ open, handleClose, setUpdated }: CreateModalProps) => {

    const [serverError, setServerError] = useState<string>('');
    const [users, setUsers] = useState<IResponseUsersData[]>()

    const { id } = useParams();

    interface FormData {
        name: string;
        startYear: number;
        maximumStudentsCount: number;
        semester: string;
        requirements: string;
        annotations: string;
        mainTeacherId: string;
    }
    const initialValues: FormData = {
        name: '',
        startYear: 2024,
        maximumStudentsCount: 1,
        semester: "Autumn",
        requirements: '',
        annotations: '',
        mainTeacherId: '',
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: createCourseValidation,
        onSubmit: async (values, { setSubmitting }) => {
            submitValues(values, setSubmitting);
        },
    });

    const submitValues = async (values: FormData, setSubmitting: { (isSubmitting: boolean): void; (arg0: boolean): void; }) => {
        try {
            await CoursesService.createCourse(values, id);
            setUpdated(true);
            handleClose();
        } catch (error: any) {
            if (error.response) {
                setServerError('Такое название уже занято');
                formik.setFieldError('name', 'Такое название уже занято');
            } else {
                console.error(error);
                setServerError('Произошла ошибка. Попробуйте еще раз.');
            }
        } finally {
            setSubmitting(false);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersInfo = await CoursesService.getUsers();
                if (usersInfo !== undefined) {
                    setUsers(usersInfo)
                }
                else {
                    throw Error("bruh")
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);
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
            <Typography id="modal-modal-title" fontWeight="bold" variant="h5" sx={{ marginBottom: 2 }}>Создать курс</Typography>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="name"
                    label="Название курса"
                    variant="outlined"
                    {...formik.getFieldProps("name")}
                    error={formik.touched.name && (Boolean(formik.errors.name) || !!serverError)}
                    helperText={(formik.touched.name && formik.errors.name) || serverError}
                />
                <TextField
                    sx={{ marginTop: 2 }}
                    fullWidth id="startYear"
                    label="Год начала курса"
                    type="number"
                    variant="outlined"
                    {...formik.getFieldProps("startYear")}
                    error={
                        formik.touched.startYear && Boolean(formik.errors.startYear)
                    }
                    helperText={formik.touched.startYear && formik.errors.startYear}
                />
                <TextField
                    sx={{ marginTop: 2 }}
                    variant="outlined"
                    fullWidth
                    id="maximumStudentsCount"
                    type="number"
                    label="Общее количество мест"
                    {...formik.getFieldProps("maximumStudentsCount")}
                    error={
                        formik.touched.maximumStudentsCount && Boolean(formik.errors.maximumStudentsCount)
                    }
                    helperText={
                        formik.touched.maximumStudentsCount && formik.errors.maximumStudentsCount
                    }
                />
                <InputLabel id="demo-row-radio-buttons-group-label" sx= {{marginTop: 1}}>Семестр</InputLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    {...formik.getFieldProps("semester")}
                >
                    <FormControlLabel value="Autumn" control={<Radio />} label="Осенний" />
                    <FormControlLabel value="Spring" control={<Radio />} label="Весенний" />
                </RadioGroup>
                <InputLabel sx={{marginTop: 1}}>Требования (обязательно)</InputLabel>
                <QuillField name="requirements" setFieldValue={formik.setFieldValue} value={formik.values.requirements} />
                <InputLabel sx={{ marginTop: 1 }}>Аннотации (обязательно)</InputLabel>
                <QuillField name="annotations" setFieldValue={formik.setFieldValue} value={formik.values.annotations} />
                <InputLabel htmlFor="mainTeacherId" sx={{marginTop: 1}}>Основной преподаватель курса</InputLabel>
                <Select
                    variant="outlined"
                    id="mainTeacherId"
                    fullWidth
                    {...formik.getFieldProps("mainTeacherId")}
                    error={
                        formik.touched.mainTeacherId && Boolean(formik.errors.mainTeacherId)
                    }
                >
                    {users?.map((item) =>
                    (
                        <MenuItem key={item.id} value={item.id}>{item.fullName}</MenuItem>
                    ))}
                </Select>
                <Button fullWidth size="large" variant="contained" type="submit" sx={{ marginTop: 2 }}>
                    Создать
                </Button>
            </form>
        </Card>
    </Modal>
    );
};

const QuillField = ({ name, setFieldValue, value }: { name: string, setFieldValue: Function, value: string }) => {
    const handleChange = (content: string) => {
        setFieldValue(name, content);
    };

    return (
        <div>
            <ReactQuill
                theme="snow"
                value={value}
                onChange={handleChange}
            />
        </div>
    );
}

export default CreateCourseModal