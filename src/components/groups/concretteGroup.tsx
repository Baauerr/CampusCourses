import Grid from '@mui/material/Grid';
import { Typography, Card, Container  } from '@mui/material';
import { CoursesService } from './groupsService';
import { IResponseGroupsCoursesData } from "../../types/coursesTypes/groupCourses"
import { useEffect, useState } from 'react';

export const ConcretteGroup = () => {

    const [groups, setGroupsInfo] = useState<IResponseGroupsCoursesData[]>();

    useEffect(() => {

        const fetchData = async () => {
            try {
                const groupsInfo = await CoursesService.getCoursesGroups();
                if (groupsInfo !== undefined) {
                    setGroupsInfo(groupsInfo)
                }
                else {
                    throw Error("bruh")
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <Container maxWidth="lg">
            <Grid item xs = {12} md={12}>
                <Typography variant="h4" fontWeight="bold" fontFamily={'Roboto, sans-serif'}  sx={{ marginBottom: "20px" }}>Группы кампусных курсов</Typography>
                {groups?.map((item) =>
                (
                    <Card variant="outlined" sx={{ padding: "10px" }} key={item.id}>
                        <Typography>{item.name}</Typography>
                    </Card>
                ))}     
            </Grid>
        </Container>
    )
}