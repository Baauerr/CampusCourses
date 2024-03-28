import { Typography, Card, Button } from '@mui/material';
import { SetStateAction, useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import { style } from '../modalWindows/styles';
import { CourseService } from './CourseService';
import 'react-quill/dist/quill.snow.css';
import { ICourseStatusesData, ICourseStudentsData, ICourseTeachersData, IRequestAddNewTeacher } from '../../types/coursesTypes/courseTypes';
import { IResponseUsersData } from '../../types/userTypes/userGettingTypes';
import { InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import 'react-quill/dist/quill.snow.css';
import { GroupsService } from '../groups/groupsService';

type EditModalProps = {
    id?: string
    openEdit: boolean;
    handleClose: () => void;
    setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
    teachersArray: ICourseTeachersData[];
    studentsArray: ICourseStudentsData[];
};

export const AddTeacherModal = ({ openEdit, handleClose, setUpdated, id, teachersArray, studentsArray }: EditModalProps) => {

    const [potentialTeachers, setUsers] = useState<IResponseUsersData[]>();
    const [selectedUser, setSelectedUser] = useState<string>();

    const handleClick = async () => {

        const newTeacher: IRequestAddNewTeacher = {
            userId: selectedUser
        }

        try {
            if (id) {
                await CourseService.addTeacher(id, newTeacher);
                setUpdated(true);
                handleClose();
            }
        } catch (error) {
            console.log("bruh");
        }
    };

    useEffect(() => {

        const fetchData = async () => {
            console.log("jija")
            try {
                const users: IResponseUsersData[] = await getPotentialTeachers(teachersArray, studentsArray);
                setUsers(users);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData()
    }, []);

    const handleSelectChange = (event: { target: { value: string; }; }) => {
        setSelectedUser(event.target.value as string);
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
                variant="outlined"
                id="newTeacherId"
                fullWidth
                onChange={handleSelectChange}
            >
                {potentialTeachers?.map((item) =>
                    <MenuItem key={item.id} value={item.id}>{item.fullName}</MenuItem>
                )}
            </Select>
            <Button variant="contained" color={"primary"} onClick={handleClick} sx={{ marginTop: "10px" }}>
                добавить
            </Button>
        </Card>
    </Modal>
    );
};

const getPotentialTeachers = async (teachersArray: ICourseTeachersData[], studentsArray: ICourseStudentsData[]): Promise<IResponseUsersData[]> => {
    const allUsers: IResponseUsersData[] | undefined = await GroupsService.getUsers();

    if (!allUsers) {
        return [];
    }

    const potentialTeachers: IResponseUsersData[] = allUsers.filter(user =>
        !teachersArray.some(teacher => teacher.name === user.fullName) &&
        !studentsArray.some(student => student.name === user.fullName)
    );

    return potentialTeachers;
}


export default AddTeacherModal