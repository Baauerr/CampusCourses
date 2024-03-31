import { Card, Divider } from '@mui/material';
import { Dispatch, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Skeleton } from '@mui/material';
import { ICourseRoleData, ICourseStudentsData, ICourseTeachersData } from '../../types/coursesTypes/courseTypes';
import { CreateNotification } from './createNotification';
import { StudentsTab } from './studentsTab';
import { TeachersTab } from './teachersTab';

export interface CourseInfoTabsProps {
    studentsArray: ICourseStudentsData[];
    teachersArray: ICourseTeachersData[];
    setUpdated: Dispatch<React.SetStateAction<boolean>>;
    roles?: ICourseRoleData;
    courseId?: string
}

export const UsersInfoTabs = ({ studentsArray, teachersArray, setUpdated, roles, courseId }: CourseInfoTabsProps) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [value, setValue] = useState('five');

    if (!studentsArray && !teachersArray) {
        return (
            <div>
                <Skeleton variant="text" width={200} height={30} animation="wave" />
                <Card variant="outlined">
                    <Skeleton variant="rectangular" width={500} height={200} animation="wave" />
                </Card>
            </div>
        );
    }

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <div style={{ border: '1px solid #E0E0E0', borderRadius: '4px' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                aria-label="wrapped label tabs example"
            >
                <Tab
                    value="five"
                    label="Преподаватели"
                    wrapped
                />
                <Tab value="four" label="Студенты" />
            </Tabs>
            <Divider orientation="horizontal" />
            <StudentsTab
                value={value}
                index={"four"}
                studentsList={studentsArray}
                role={roles}
                courseId={courseId}
                setUpdated={setUpdated}
            />
            <TeachersTab
                value={value}
                index={"five"}
                teachersList={teachersArray}
                role={roles}
                setUpdated={setUpdated}
                studentsList={studentsArray}
                courseId={courseId}
            />

            {open && <CreateNotification open={open} handleClose={handleClose} setUpdated={setUpdated} />}
        </div>
    )
}