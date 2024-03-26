import semesterHelper from '../../helpers/coursesHelper/semesterHelper';
import { Skeleton } from '@mui/material';
import statusColorHelper from '../../helpers/coursesHelper/statusColorHelper';
import statusTranslator from '../../helpers/coursesHelper/statusHelper';
import { Typography, Card, Button, Grid } from '@mui/material';
import { ICourseRoleData, ICourseStatusesData, IResponseCourseInfoData, typesOfModal } from '../../types/coursesTypes/courseTypes';
import CreateCourseModal from '../groups/concretteGroup/createCourseModal';
import { SetStateAction, useEffect, useState } from 'react';
import { getUserCourseRole } from '../../helpers/coursesHelper/courseRoleHelper';
import { UsersInfoTabs } from './userTab';

export interface InfoPanelProps {
    courseInfo?: IResponseCourseInfoData;
    setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
    courseRole?: ICourseRoleData
}

export const InfoPanel = ({ courseInfo, setUpdated, courseRole }: InfoPanelProps) => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    console.log(courseRole)

    if (!courseInfo) {
        return (
            <div>
                <Skeleton variant="text" width={200} height={30} animation="wave" />
                <Card variant="outlined">
                    <Skeleton variant="rectangular" width={500} height={200} animation="wave" />
                </Card>
            </div>
        );
    }

    return (
        <div>
            <Grid item container xs={12} md={12} sx={{ marginBottom: "10px" }} direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h5" fontWeight="bold" fontFamily={'Roboto, sans-serif'}>
                    Основные данные курса
                </Typography>
                {courseRole?.isMainTeacher &&
                    <Grid item container xs={12} md={6} justifyContent="flex-end">
                        <Button variant="contained" color="warning" onClick={handleOpen}>
                            Редактировать
                        </Button>
                        <Button variant="contained" color="error" onClick={handleOpen} sx={{ marginLeft: '10px' }}>
                            Удалить
                        </Button>
                    </Grid>}
            </Grid>
            <Card variant="outlined" sx={{ padding: "10px" }}>
                <Grid container item xs={12} md={12} direction="row" justifyContent="space-between" alignItems="center">
                    <Grid container xs={12} md={6} item direction="column">
                        <Typography fontSize={20} fontWeight="bold" textAlign="left">Статус курса</Typography>
                        <Typography fontSize={15} fontWeight="bold" textAlign="left" color={statusColorHelper(courseInfo.status)}>{statusTranslator(courseInfo.status)}</Typography>
                    </Grid>
                    {courseRole?.isMainTeacher &&
                        <Button variant="contained" color={"warning"} onClick={handleOpen}>
                            Изменить
                        </Button>
                    }
                    {courseRole?.isGuest && courseInfo.status === ICourseStatusesData.OpenForAssigning &&
                        <Button variant="contained" sx={{backgroundColor: 'green', color: "white",}}>
                            Записаться на курс
                        </Button>
                    }
                </Grid>
            </Card>
            <Card variant="outlined" sx={{ padding: "10px" }}>
                <Grid container item xs={12} md={12} direction="row">
                    <Grid container item xs={6} md={6} direction="column">
                        <Typography fontSize={20} fontWeight="bold" textAlign="left" >Учебный год</Typography>
                        <Typography fontSize={15} textAlign="left" >{courseInfo.startYear}</Typography>
                    </Grid>
                    <Grid container item xs={6} md={6} direction="column">
                        <Typography fontSize={20} fontWeight="bold">Семестр</Typography>
                        <Typography fontSize={15} >{semesterHelper(courseInfo.semester)}</Typography>
                    </Grid>
                </Grid>
            </Card>
            <Card variant="outlined" sx={{ padding: "10px" }}>
                <Grid container item xs={12} md={12} direction="row">
                    <Grid container item xs={6} md={6} direction="column">
                        <Typography fontSize={20} fontWeight="bold" textAlign="left">Всего мест</Typography>
                        <Typography fontSize={15} textAlign="left">{courseInfo.maximumStudentsCount}</Typography>
                    </Grid>
                    <Grid container item xs={6} md={6} direction="column">
                        <Typography fontSize={20} fontWeight="bold">Студентов зачислено</Typography>
                        <Typography fontSize={15}>{courseInfo.studentsEnrolledCount}</Typography>
                    </Grid>
                </Grid>
            </Card>
            <Card variant="outlined" sx={{ padding: "10px" }}>
                <Grid container item xs={12} md={12} direction="column">
                    <Typography fontSize={20} fontWeight="bold" textAlign="left">Заявок на рассмотрении</Typography>
                    <Typography fontSize={15} textAlign="left">{courseInfo.studentsInQueueCount}</Typography>
                </Grid>
            </Card>
            <CreateCourseModal open={open} handleClose={handleClose} setUpdated={setUpdated} typeOfModal={typesOfModal.editCourse} role={courseRole} currentCourseInfo={courseInfo} />
        </div>
    )
}