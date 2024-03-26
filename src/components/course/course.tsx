import { Typography, Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { ICourseRoleData, IResponseCourseInfoData } from '../../types/coursesTypes/courseTypes';
import { CourseService } from './CourseService';
import { useParams } from 'react-router-dom';
import { InfoPanel } from './infoPanel';
import { CourseInfoTabs } from './courseInfoTabs';
import { getUserCourseRole } from '../../helpers/coursesHelper/courseRoleHelper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { UsersInfoTabs } from './userTab';
import { setCourseRole } from '../../store/course/courseSlice';

export const Course = () => {

    const [courseInfo, setCourseInfo] = useState<IResponseCourseInfoData>();

    const { id } = useParams();
    const [updated, setUpdated] = useState(true)
    const dispatch = useDispatch();
    const roles = useSelector((state: RootState) => state.user.roles);
    let courseRole: ICourseRoleData | undefined = id ? useSelector((state: RootState) => state.courseRoles[id]) : undefined;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const info = await CourseService.getCourseInfo(id);
                if (info !== undefined) {
                    setCourseInfo(info);
                    if (roles) {
                        const courseRoles = await getUserCourseRole(info.students, info.teachers, roles);
                        if (id) {
                            dispatch(setCourseRole({ groupId: id, role: courseRoles }))
                        }
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };

        if (updated) {
            fetchData();
            setUpdated(false);
        }
    }, [updated]);


    return (
        <Container maxWidth="lg">
            <Grid item xs={12} md={12}>
                <Typography variant="h2" fontWeight="bold" fontFamily={'Roboto, sans-serif'} sx={{ marginBottom: "20px" }}>{courseInfo?.name}</Typography>
                <InfoPanel courseInfo={courseInfo} setUpdated={setUpdated} courseRole={courseRole} />
                <CourseInfoTabs courseInfo={courseInfo} setUpdated={setUpdated} />
                {courseInfo && (
                    <UsersInfoTabs
                        setUpdated={setUpdated}
                        roles={courseRole}
                        teachersArray={courseInfo.teachers}
                        studentsArray={courseInfo.students}
                    />
                )}
            </Grid>

        </Container>
    )
}

export const TeachersTab = () => {
    return (
        <div>

        </div>
    )
}




