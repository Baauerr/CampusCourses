import { Typography, Container, Grid, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { IResponseCourseInfoData } from '../../types/coursesTypes/courseTypes';
import { CourseService } from './CourseService';
import { useParams } from 'react-router-dom';
import { InfoPanel } from './infroPanel';
import { CourseInfoTabs } from './courseInfoTabs';

export const Course = () => {

    const [courseInfo, setCourseInfo] = useState<IResponseCourseInfoData>();

    const { id } = useParams();
    const [updated, setUpdated] = useState(true)

    useEffect(() => {
        if (updated) {
            const fetchData = async () => {
                try {
                    const info = await CourseService.getCourseInfo(id);
                    if (info !== undefined) {
                        setCourseInfo(info);
                    }
                } catch (error) {
                    console.error(error);
                }
            };
            fetchData();
        }
        setUpdated(false)
    }, [updated]);

    return (
        <Container maxWidth="lg">
            <Grid item xs={12} md={12}>
                <Typography variant="h2" fontWeight="bold" fontFamily={'Roboto, sans-serif'} sx={{ marginBottom: "20px" }}>{courseInfo?.name}</Typography>
                <InfoPanel courseInfo={courseInfo} />
                <CourseInfoTabs courseInfo={courseInfo} setUpdated={setUpdated} />
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

export const StudentsTab = () => {
    return (
        <div>

        </div>
    )
}



