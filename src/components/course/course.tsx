import { Typography, Container, Grid } from '@mui/material';
import { Dispatch, useEffect, useState } from 'react';
import { ICourseRoleData, IResponseCourseInfoData } from '../../types/coursesTypes/courseTypes';
import { CourseService } from './CourseService';
import { useParams } from 'react-router-dom';
import { InfoPanel } from './infoPanel';
import { CourseInfoTabs } from './courseInfoTabs';
import { getUserCourseRole } from '../../helpers/coursesHelper/courseRoleHelper';
import { UsersInfoTabs } from './userTab';
import { AuthService } from '../auth/authService';

export const Course = () => {

    const [courseInfo, setCourseInfo] = useState<IResponseCourseInfoData>();

    const { id } = useParams();
    const [updated, setUpdated] = useState(true)
    const [courseRoles, setCourseRole] = useState<ICourseRoleData>();

    useEffect(() => {
        if (updated) {
            if (id){ 
                fetchCourseData(setCourseInfo, setCourseRole, id);
                setUpdated(false);
            }
        }
    }, [updated]);

    return (
        <Container maxWidth="lg">
            <Grid item xs={12} md={12}>
                    <Typography
                        variant="h2"
                        fontWeight="bold"
                        fontFamily={'Roboto, sans-serif'}
                        sx={{
                            marginBottom: "20px",
                            maxWidth: "100%",
                            overflowWrap: "break-word"
                        }}
                    >
                        {courseInfo?.name}
                    </Typography>
                <InfoPanel courseInfo={courseInfo} setUpdated={setUpdated} courseRole={courseRoles} courseId={id} />
                <CourseInfoTabs courseInfo={courseInfo} setUpdated={setUpdated} courseRole={courseRoles} />
                {courseInfo && (
                    <UsersInfoTabs
                        setUpdated={setUpdated}
                        roles={courseRoles}
                        teachersArray={courseInfo.teachers}
                        studentsArray={courseInfo.students}
                        courseId={id}
                    />
                )}
            </Grid>
        </Container>
    )
}


async function fetchCourseData (
    setCourseInfo: Dispatch<React.SetStateAction<IResponseCourseInfoData | undefined>>,
    setCourseRole: Dispatch<React.SetStateAction<ICourseRoleData | undefined>>,
    id: string
) {
    try {
        const info = await CourseService.getCourseInfo(id);
        const roles = await AuthService.getUserRole();
        if (info && roles) {
            setCourseInfo(info);
            if (roles !== null) {
                if (id) {
                    const courseRoles = await getUserCourseRole(info.students, info.teachers, roles, id);
                    setCourseRole(courseRoles)
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
};



