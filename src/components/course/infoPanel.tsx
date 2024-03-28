import semesterHelper from '../../helpers/coursesHelper/semesterHelper';
import { Skeleton } from '@mui/material';
import statusColorHelper from '../../helpers/coursesHelper/statusColorHelper';
import statusTranslator from '../../helpers/coursesHelper/statusHelper';
import { Typography, Card, Button, Grid } from '@mui/material';
import { ICourseRoleData, ICourseStatusesData, IResponseCourseInfoData, typesOfModal } from '../../types/coursesTypes/courseTypes';
import CreateCourseModal from '../groups/concretteGroup/createCourseModal';
import { SetStateAction, useState } from 'react';
import DeleteModal from '../groups/coursesGroups/deleteModal';
import { CourseService } from './CourseService';
import ChangeStatusModal from './editStatusModal';
export interface InfoPanelProps {
    courseInfo?: IResponseCourseInfoData;
    setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
    courseRole?: ICourseRoleData
    courseId?: string
}

export const InfoPanel = ({ courseInfo, setUpdated, courseRole, courseId }: InfoPanelProps) => {

    const [modalStates, setModalStates] = useState<Record<string, boolean>>({
        editCourseModal: false,
        changeStatusModal: false,
        deleteCourseModal: false,
        enterToCourse: false,
      });
      console.log(courseRole)

      const handleOpenModal = (modalId: string) => {
        setModalStates({ ...modalStates, [modalId]: true });
      };
      
      const handleCloseModal = (modalId: string) => {
        setModalStates({ ...modalStates, [modalId]: false });
      };

      const handleSendRequest = (courseId?: string) => {
        if (courseId){
            CourseService.signUpForCourse(courseId);
            setUpdated(true);
        }
      };


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
                        <Button variant="contained" color="warning" onClick={() => handleOpenModal("editCourseModal")}>
                            Редактировать
                        </Button>
                        <Button variant="contained" color="error" onClick={() => handleOpenModal("deleteCourseModal")} sx={{ marginLeft: '10px' }}>
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
                    {courseRole?.isMainTeacher && courseInfo.status !==ICourseStatusesData.Finished &&
                        <Button variant="contained" color={"warning"} onClick={() => handleOpenModal("changeStatusModal")}>
                            Изменить
                        </Button>
                    }
                    {courseRole?.isGuest && courseInfo.status === ICourseStatusesData.OpenForAssigning &&
                        <Button variant="contained" sx={{ backgroundColor: 'green', color: "white", }} onClick={() => handleSendRequest(courseId)}>
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
            <CreateCourseModal open={modalStates.editCourseModal} handleClose={() => handleCloseModal("editCourseModal")} setUpdated={setUpdated} typeOfModal={typesOfModal.editCourse} role={courseRole} currentCourseInfo={courseInfo} />
            <DeleteModal name={courseInfo.name} openDelete={modalStates.deleteCourseModal} handleCloseDelete={() => handleCloseModal("deleteCourseModal")} setUpdated={setUpdated} deleteRequestFunction={() => CourseService.deleteCourse(courseInfo.id)} redirectPath= {`/groups/`} />
            <ChangeStatusModal id={courseInfo.id} openEdit={modalStates.changeStatusModal} handleClose={() => handleCloseModal("changeStatusModal")} setUpdated={setUpdated} courseStatus={courseInfo.status}/>
        </div>
    )
}