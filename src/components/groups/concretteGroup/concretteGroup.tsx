import Grid from '@mui/material/Grid';
import { Typography, Card, Container, Link as MuiLink, Button} from '@mui/material';
import { CoursesService } from '../groupsService';
import { useEffect, useState } from 'react';
import { IRequestCoursesData } from '../../../types/coursesTypes/groupCourses';
import { useParams } from 'react-router-dom';
import seasonTranslator from '../../../helpers/coursesHelper/semesterHelper';
import statusColorHelper from '../../../helpers/coursesHelper/statusColorHelper';
import statusTranslator from '../../../helpers/coursesHelper/statusHelper';
import { cardHoverStyles } from '../coursesGroups/coursesGroup';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { CreateCourseModal } from './createCoursModal';

export const ConcretteGroup = () => {

    const [groups, setGroupsInfo] = useState<IRequestCoursesData[]>();
    const [open, setOpen] = useState(false);
    const [updated, setUpdated] = useState(true)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { id } = useParams();

    const roles = useSelector((state: RootState) => state.user.roles);

    useEffect(() => {
        if (updated){
            const fetchData = async () => {
                try {
                    const groupsInfo = await CoursesService.getCourses(id);
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
        }
        setUpdated(false)
    }, [updated]);

    return (
        <Container maxWidth="lg">
            <Grid item xs={12} md={12}>
                <Typography variant="h4" fontWeight="bold" fontFamily={'Roboto, sans-serif'} sx={{ marginBottom: "5px" }}>Группа -  </Typography>
                {roles?.isAdmin && <Button variant="contained" sx={{ marginBottom: "10px" }} onClick={handleOpen}>
                        Создать
                    </Button>}
                {groups?.map((item) =>
                (
                    <MuiLink
                        component={RouterLink}
                        to={`/groups/${item.id}`}
                        underline="none"
                        key={item.id}
                        color={'black'}
                    >

                        <Card variant="outlined" sx={{ ...cardHoverStyles }} key={item.id}>
                            <Grid container item xs={12} md={12} justifyContent="space-between">
                                <Typography fontSize={20} fontWeight="bold" textAlign="left" alignSelf="flex-start">{item.name}</Typography>
                                <Typography fontSize={15} fontWeight="bold" textAlign="right" color={statusColorHelper(item.status)} alignSelf="flex-end">{statusTranslator(item.status)}</Typography>
                            </Grid>
                            <Typography fontSize={13}>Учебный год - {item.startYear}</Typography>
                            <Typography fontSize={13} sx={{ marginBottom: "10px" }}>Семестр - {seasonTranslator(item.semester)}</Typography>
                            <Typography fontSize={13} color="text.secondary">Мест всего - {item.maximumStudentsCount}</Typography>
                            <Typography fontSize={13} color="text.secondary">Мест свободно - {item.remainingSlotsCount}</Typography>
                        </Card>
                    </MuiLink>
                ))}
            </Grid>
            <CreateCourseModal setUpdated={setUpdated} open={open} handleClose={handleClose} />
        </Container>
    )
}