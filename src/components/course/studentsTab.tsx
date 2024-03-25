import { Typography, Box, Card, Grid, Button } from '@mui/material';
import { IAcceptanceStatusesData, ICourseRoleData, ICourseStudentsData } from '../../types/coursesTypes/courseTypes';
import { markTranslator } from '../../helpers/coursesHelper/studentsHelper';

export interface StudentsPanelProps {
    value: string;
    index: string;
    studentsList: ICourseStudentsData[];
    role?: ICourseRoleData;
}

export const StudentsTab = ({ value, index, studentsList, role }: StudentsPanelProps) => {

    const email = localStorage.getItem("email")

    

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {studentsList?.map((student: ICourseStudentsData) => (
                        <Box key={index}>
                            <Card variant="outlined" sx={{ padding: "10px" }}>
                                <Grid container item xs={12} md={12} direction="row"> 
                                    <Grid container item xs={6} md={6} direction="column">
                                        <Typography fontSize={20} fontWeight="bold" textAlign="left" >{student.name}</Typography>
                                        <Typography fontSize={15} textAlign="left" >Статус - {student.status}</Typography>
                                        <Typography fontSize={15} textAlign="left" >{student.email}</Typography>
                                    </Grid>
                                    {((student.status === IAcceptanceStatusesData.Accepted && student.email === email) || (role?.isTeacher)) ||
                                        <div>
                                            <Grid container item xs={6} md={6} direction="column">
                                                <Typography fontSize={20} fontWeight="bold">Промежуточная аттестация</Typography>
                                                <Typography fontSize={15} >{markTranslator(student.midtermResult)}</Typography>
                                            </Grid>
                                            <Grid container item xs={6} md={6} direction="column">
                                                <Typography fontSize={20} fontWeight="bold">Финальная аттестация</Typography>
                                                <Typography fontSize={15} >{(markTranslator(student.finalResult))}</Typography>
                                            </Grid>
                                        </div>
                                    }
                                    {(student.status === IAcceptanceStatusesData.InQueue && role?.isTeacher) &&
                                        <div>
                                            <Grid container item xs={6} md={6} direction="column">
                                                <Button variant="contained" color={"primary"}>
                                                    Принять
                                                </Button>
                                                <Button variant="contained" color={"error"}>
                                                    Отклонить
                                                </Button>
                                            </Grid>
                                        </div>
                                    }
                                </Grid>
                            </Card>
                        </Box>
                    ))}
                </Box>
            )}
        </div>
    )
}
