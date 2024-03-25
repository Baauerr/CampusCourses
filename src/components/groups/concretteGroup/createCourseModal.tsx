
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
import { ICourseRoleData, IResponseCourseInfoData, typesOfModal } from '../../../types/coursesTypes/courseTypes';
import { IRequestCreateCourseData } from '../../../types/groupsTypes/groupCourses';
import { courseMapper } from '../../../helpers/coursesHelper/courseMapper';

type CreateModalProps = {
    open: boolean;
    handleClose: () => void;
    setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
    typeOfModal: typesOfModal
    role?: ICourseRoleData
    currentCourseInfo?: IResponseCourseInfoData
};

export const CreateCourseModal = ({ open, handleClose, setUpdated, typeOfModal, role, currentCourseInfo }: CreateModalProps) => {

    const [serverError, setServerError] = useState<string>('');
    const [users, setUsers] = useState<IResponseUsersData[]>()

    const [newCourseInfo, setCourseInfo] = useState<IRequestCreateCourseData>({
        name: '',
        startYear: 2024,
        maximumStudentsCount: 1,
        semester: "Autumn",
        requirements: '',
        annotations: '',
        mainTeacherId: '',
    });

    const { id } = useParams();

    const initialValues: IRequestCreateCourseData = {
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


    const submitValues = async (values: IRequestCreateCourseData, setSubmitting: { (isSubmitting: boolean): void; (arg0: boolean): void; }) => {
        try {
            if (typeOfModal === typesOfModal.createCourse) {
                await GroupsService.createCourse(values, id);
            }
            else if (typeOfModal === typesOfModal.editCourse) {
                await CourseService.changeCourseInfo(values, id);
            }
            console.log("jija")
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