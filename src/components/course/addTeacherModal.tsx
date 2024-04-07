import { Typography, Card, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import { style } from '../modalWindows/styles';
import { CourseService } from './CourseService';
import 'react-quill/dist/quill.snow.css';
import { ICourseStudentsData, ICourseTeachersData, IRequestAddNewTeacher } from '../../types/coursesTypes/courseTypes';
import { IResponseUsersData } from '../../types/userTypes/userGettingTypes';
import { InputLabel } from '@mui/material';
import Select from 'react-select';
import 'react-quill/dist/quill.snow.css';
import { getPotentialTeachers } from '../../helpers/coursesHelper/potentialTeachersHelpers';

type EditModalProps = {
    id?: string
    openEdit: boolean;
    handleClose: () => void;
    setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
    teachersArray: ICourseTeachersData[];
    studentsArray: ICourseStudentsData[];
};

type Option = { value: string; label: string };

export const AddTeacherModal = ({ openEdit, handleClose, setUpdated, id, teachersArray, studentsArray }: EditModalProps) => {

    const [potentialTeachers, setPotentialTeachers] = useState<Option[]>();
    const [selectedUser, setSelectedUser] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleClick = async () => {
        try {
            if (id) {
                setLoading(true);
                const newTeacher: IRequestAddNewTeacher = {
                    userId: selectedUser
                };
                await CourseService.addTeacher(id, newTeacher);
                setUpdated(true);
                handleClose();
            }
        } catch (error) {
            console.error("Ошибка при добавлении учителей:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const users: IResponseUsersData[] = await getPotentialTeachers(teachersArray, studentsArray);
                setPotentialTeachers(users.map(user => ({ value: user.id, label: user.fullName })));
            } catch (error) {
                console.error("Ошибка при получении потенциальных учителей:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [teachersArray, studentsArray]);

    const handleSelectChange = (selectedOption: Option | null) => {
        if (selectedOption) {
            setSelectedUser(selectedOption.value);
        }
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
            <Typography id="modal-modal-title" fontWeight="bold" variant="h5" sx={{ marginBottom: "10px" }}>Добавление преподавателя на курс</Typography>
            <InputLabel htmlFor="mainTeacherId" sx={{ marginTop: 1 }}>Выберите преподавателя</InputLabel>
            <Select
                options={potentialTeachers}
                id="mainTeacherId"
                onChange={handleSelectChange}
            />
            <Button variant="contained" color={"primary"} onClick={handleClick} sx={{ marginTop: "10px" }} disabled={!selectedUser || loading}>
                {loading ? 'Добавление...' : 'Добавить'}
            </Button>
        </Card>
    </Modal>
    );
};


export default AddTeacherModal