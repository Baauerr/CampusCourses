import { Typography, Box, Card, Grid, Button } from '@mui/material';
import { IAcceptanceStatusesData, ICourseRoleData, ICourseStudentsData } from '../../types/coursesTypes/courseTypes';
import { acceptanceColor, acceptanceTranslator, markColor, markTranslator } from '../../helpers/coursesHelper/studentsHelper';

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
                        <Box key={student.id}>
                            <Card variant="outlined"  sx={{ padding: "10px"}}>
                                <Grid container item xs={12} md={12} direction="row" alignItems="center">
                                    <Grid container item xs={12} md={6} direction="column">
                                        <Typography fontSize={20} fontWeight="bold" textAlign="left" >{student.name}</Typography>
                                        <Typography fontSize={15} textAlign="left">Статус -  <span style={{ color: acceptanceColor(student.status) }}>{acceptanceTranslator(student.status)}</span></Typography>
                                        <Typography fontSize={15} textAlign="left" >{student.email}</Typography>
                                    </Grid>
                                    {((student.status === IAcceptanceStatusesData.Accepted && student.email === email) || (role?.isTeacher && student.status === IAcceptanceStatusesData.Accepted)) &&
                                        <Grid container item xs={12} md={6} direction="row">
                                            <Grid container item xs={12} md={6} direction="column">
                                                <Typography fontSize={20} fontWeight="bold">Промежуточная аттестация</Typography>
                                                <Typography fontSize={15} color={markColor(student.midtermResult)}>{markTranslator(student.midtermResult)}</Typography>
                                            </Grid>
                                            <Grid container item xs={12} md={6} direction="column">
                                                <Typography fontSize={20} fontWeight="bold">Финальная аттестация</Typography>
                                                <Typography fontSize={15} color={markColor(student.finalResult)}>{(markTranslator(student.finalResult))}</Typography>
                                            </Grid>
                                        </Grid>
                                    }
                                    {(student.status === IAcceptanceStatusesData.InQueue && role?.isTeacher) &&
                                            <Grid container item xs={12} md={6} justifyContent={{ xs: 'flex-start', md: 'flex-end' }} marginTop={1} direction="row">
                                                <Button variant="contained" color={"primary"} sx={{marginRight: { xs: 2, md: 0 }, marginBottom: { xs: 2, md: 0 }}}>
                                                    Принять
                                                </Button>
                                                <Button variant="contained" sx={{marginLeft: { xs: 0, md: 2 }, marginBottom: { xs: 2, md: 0 }}} color={"error"}>
                                                    Отклонить
                                                </Button>
                                            </Grid>
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
