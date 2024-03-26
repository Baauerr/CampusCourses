import { Typography, Box, Card, Grid, Button } from '@mui/material';
import { ICourseRoleData, ICourseTeachersData } from '../../types/coursesTypes/courseTypes';
import { useState } from 'react';

export interface TeachersPanelProps {
    value: string;
    index: string;
    teachersList: ICourseTeachersData[];
    role?: ICourseRoleData;
}

export const TeachersTab = ({ value, index, teachersList, role }: TeachersPanelProps) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                                    <Grid container item xs={6} md={6} direction="column">
                                        <Typography fontSize={20} fontWeight="bold" textAlign="left">
                                            {teacher.name} {teacher.isMain ? <Button style={{ backgroundColor: 'green', color: "white", pointerEvents: 'none', maxHeight: '25px' }}>Основной</Button> : ""}
                                        </Typography>
                                        <Typography fontSize={15} textAlign="left" >{teacher.email}</Typography>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Box>
                    ))}
                </Box>
            )}
        </div>
    )
}
