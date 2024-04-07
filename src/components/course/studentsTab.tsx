import { Typography, Box, Card, Grid, Button } from '@mui/material';
import { IAcceptanceStatusesData, ICourseStudentsData, IRequestChangeUserStatusData, IResultsStatusesData, MarkType } from '../../types/coursesTypes/courseTypes';
import { acceptanceColor, acceptanceTranslator, markColor, markTranslator } from '../../helpers/coursesHelper/studentsHelper';
import { CourseService } from './CourseService';
import { useState } from 'react';
import SetGradeModal from './setGradeModal';
import { StudentsPanelProps } from '../../types/propsTypes/corsePropsTypes';

export interface MarkInfo {
    markValue: IResultsStatusesData
    markType: MarkType
    studentId: string
}

export const StudentsTab = ({ value, index, studentsList, role, courseId, setUpdated }: StudentsPanelProps) => {

    const email = localStorage.getItem("email")

    const [open, setOpen] = useState(false);
    const [markInfo, setMarkInfo] = useState<MarkInfo>();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChangeStatus = async (studentId: string, newStatus: IAcceptanceStatusesData, courseId?: string) => {
        const status: IRequestChangeUserStatusData = {
            status: newStatus
        }
        await CourseService.setUserStatus(status, courseId, studentId);
        setUpdated(true);
    }

    const handleSetMark = (oldGrade: IResultsStatusesData, markType: MarkType, studentId: string) => {
        if (oldGrade && markType) {
            const mark: MarkInfo = {
                markValue: oldGrade,
                markType: markType,
                studentId: studentId
            }
            setMarkInfo(mark);
            handleOpen();
        }
    }

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
                            <Card variant="outlined" sx={{ padding: "10px" }}>
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
                                                <Typography
                                                    fontSize={15}
                                                    color={markColor(student.midtermResult)}
                                                    onClick={() => {
                                                        if (role?.isTeacher) {
                                                            handleSetMark(student.midtermResult, MarkType.Midterm, student.id);
                                                        }
                                                    }}
                                                    style={role?.isTeacher ? { cursor: 'pointer' } : { cursor: 'default' }}
                                                >
                                                    {markTranslator(student.midtermResult)}
                                                </Typography>
                                            </Grid>
                                            <Grid container item xs={12} md={6} direction="column">
                                                <Typography fontSize={20} fontWeight="bold">Финальная аттестация</Typography>
                                                <Typography
                                                    fontSize={15}
                                                    color={markColor(student.finalResult)}
                                                    onClick={() => {
                                                        if (role?.isTeacher) {
                                                            handleSetMark(student.finalResult, MarkType.Final, student.id);
                                                        }
                                                    }}
                                                    style={role?.isTeacher ? { cursor: 'pointer' } : { cursor: 'default' }}
                                                >
                                                    {(markTranslator(student.finalResult))}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    }
                                    {(student.status === IAcceptanceStatusesData.InQueue && role?.isTeacher) &&
                                        <Grid container item xs={12} md={6} justifyContent={{ xs: 'flex-start', md: 'flex-end' }} marginTop={1} direction="row">
                                            <Button
                                                variant="contained"
                                                color={"primary"}
                                                sx={{
                                                    marginRight: { xs: 2, md: 0 },
                                                    marginBottom: { xs: 2, md: 0 }
                                                }}
                                                onClick={() => handleChangeStatus(student.id, IAcceptanceStatusesData.Accepted, courseId)}
                                            >
                                                Принять
                                            </Button>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    marginLeft: { xs: 0, md: 2 },
                                                    marginBottom: { xs: 2, md: 0 }
                                                }}
                                                color={"error"}
                                                onClick={() => handleChangeStatus(student.id, IAcceptanceStatusesData.Declined, courseId)}
                                            >
                                                Отклонить
                                            </Button>
                                        </Grid>
                                    }
                                </Grid>
                            </Card>
                            {open && <SetGradeModal open={open} handleClose={handleClose} courseId = {courseId} studentId = {markInfo?.studentId} setUpdated={setUpdated} oldGrade={markInfo?.markValue} markType={markInfo?.markType} />}
                        </Box>
                    ))}
                </Box>
            )}
        </div>
    )
}
