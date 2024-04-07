import { Typography, Box, Card, Grid, Button, useMediaQuery, Hidden } from '@mui/material';
import { ICourseTeachersData } from '../../types/coursesTypes/courseTypes';
import { useState } from 'react';
import AddTeacherModal from './addTeacherModal';
import Chip from '@mui/material/Chip';
import { TeachersPanelProps } from '../../types/propsTypes/corsePropsTypes';


export const TeachersTab = ({ value, index, teachersList, role, studentsList, setUpdated, courseId }: TeachersPanelProps) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
        >
            {role?.isMainTeacher &&
                <Button variant="contained" color={"primary"} sx={{ marginLeft: '25px', marginTop: '25px' }} onClick={handleOpen}>
                    Добавить преподавателя
                </Button>
            }
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {teachersList?.map((teacher: ICourseTeachersData) => (
                        <Box key={teacher.email}>
                            <Card variant="outlined" sx={{ padding: "10px" }}>
                                <Grid container item xs={12} md={12} direction="row">
                                    <Grid container item xs={12} md={12} direction="column">
                                        <Typography fontSize={20} fontWeight="bold" textAlign="left">
                                            {teacher.name}
                                            {!isSmallScreen && teacher.isMain && <Chip sx={{ maxHeight: 0.8, borderRadius: 1, marginLeft: 1 }} label="Основной" color="success" />}
                                        </Typography>
                                        <Typography fontSize={15} textAlign="left">{teacher.email}</Typography>
                                        {isSmallScreen && teacher.isMain && <Chip sx={{ maxHeight: 0.8, borderRadius: 1 }} label="Основной" color="success" />}
                                    </Grid>
                                </Grid>
                            </Card>
                        </Box>
                    ))}
                </Box>
            )}
            {open &&
                <AddTeacherModal
                    id={courseId}
                    openEdit={open}
                    handleClose={handleClose}
                    setUpdated={setUpdated}
                    teachersArray={teachersList}
                    studentsArray={studentsList}
                />}
        </div>
    )
}