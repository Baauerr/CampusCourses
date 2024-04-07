
import { Typography, Card, Button } from '@mui/material';
import { GroupsService } from '../groupsService';
import { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from "formik";
import 'react-quill/dist/quill.snow.css';
import createCourseValidation from '../../../helpers/validations/createCourseValidation';
import { useParams } from 'react-router-dom';
import { IResponseUsersData } from '../../../types/userTypes/userGettingTypes';
import { style } from '../../modalWindows/styles';
import { CourseInputs } from './createInputComponents';
import { CourseService } from '../../course/CourseService';
import { typesOfModal } from '../../../types/coursesTypes/courseTypes';
import { IRequestCreateCourseData } from '../../../types/groupsTypes/groupCourses';
import { courseMapper } from '../../../helpers/coursesHelper/courseMapper';
import { CreateCourseModalProps } from '../../../types/propsTypes/groupsPropsTypes';

export const CreateCourseModal = ({ open, handleClose, setUpdated, typeOfModal, role, currentCourseInfo }: CreateCourseModalProps) => {

    const [serverError, setServerError] = useState<string>('');
    const [users, setUsers] = useState<IResponseUsersData[]>()

    const initialValues: IRequestCreateCourseData = {
        name: '',
        startYear: 2024,
        maximumStudentsCount: 1,
        semester: "Autumn",
        requirements: '',
        annotations: '',
        mainTeacherId: '',
    };

    const [newCourseInfo, setCourseInfo] = useState<IRequestCreateCourseData>(initialValues);

    const { id } = useParams();

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: createCourseValidation,
        onSubmit: async (values, { setSubmitting }) => {
            submitValues(values, setSubmitting);
        },
    });

    useEffect(() => {
        if (currentCourseInfo !== undefined) {
            const mappedCourseInfo = courseMapper(currentCourseInfo)
            setCourseInfo(mappedCourseInfo)
        }
    }, []);

    if (typeOfModal == typesOfModal.editCourse) {
        useEffect(() => {
            formik.setValues(newCourseInfo);
        }, [newCourseInfo]);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersInfo = await GroupsService.getUsers();
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

    const submitValues = async (values: IRequestCreateCourseData, setSubmitting: { (isSubmitting: boolean): void; (arg0: boolean): void; }) => {
        try {
            if (typeOfModal === typesOfModal.createCourse) {
                await GroupsService.createCourse(values, id);
            }
            else if (typeOfModal === typesOfModal.editCourse) {
                await CourseService.changeCourseInfo(values, id);
            }
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
            <Typography id="modal-modal-title" fontWeight="bold" variant="h5" sx={{ marginBottom: 2 }}>
                {typeOfModal === typesOfModal.createCourse ? "Создать курс" : "Редактировать курс"}
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <CourseInputs formik={formik} typeOfModal={typeOfModal} serverError={serverError} users={users} role={role} />
                <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    type="submit"
                    sx={{ marginTop: 2 }}
                    color={typeOfModal === typesOfModal.createCourse ? "primary" : "warning"}
                >
                    {typeOfModal === typesOfModal.createCourse ? "Создать" : "Редактировать"}
                </Button>
            </form>
        </Card>
    </Modal>
    );
};

export default CreateCourseModal