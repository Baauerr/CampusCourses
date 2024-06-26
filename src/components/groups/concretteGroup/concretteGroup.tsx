import Grid from '@mui/material/Grid';
import { Typography, Card, Container, Link as MuiLink, Button } from '@mui/material';
import { GroupsService } from '../groupsService';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IRequestCoursesData, TypeOfCourses } from '../../../types/groupsTypes/groupCourses';
import { useLocation, useParams } from 'react-router-dom';
import statusColorHelper from '../../../helpers/coursesHelper/statusColorHelper';
import { cardHoverStyles } from '../coursesGroups/coursesGroup';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { CreateCourseModal } from './createCourseModal';
import seasonTranslator from '../../../helpers/coursesHelper/semesterHelper';
import statusTranslator from '../../../helpers/coursesHelper/statusHelper';
import { typesOfModal } from '../../../types/coursesTypes/courseTypes';

type ConcretteGroupProps = {
    typeOfCourses: TypeOfCourses;
};

export const ConcretteGroup = ( { typeOfCourses }: ConcretteGroupProps) => {

    const [groups, setGroupsInfo] = useState<IRequestCoursesData[]>();
    const [open, setOpen] = useState(false);
    const [updated, setUpdated] = useState(true)
    const [groupName, setGroupName] = useState<string>();
    const { id } = useParams();
    const location = useLocation();
    const roles = useSelector((state: RootState) => state.user.roles);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const fetchData = async () => {
        await fetchGroupsData(typeOfCourses, setGroupsInfo, id);
    };

    useEffect(() => {
        if (updated || location) {
            fetchData();
        }
        setUpdated(false)
    }, [updated, location]);

    useEffect(() => {
        const setName = async () => {
            const groupName = await getGroupName(id)
            setGroupName(groupName)
        }
        if (updated) {
            setName()
        }
    }, []);

    return (
        <Container maxWidth="lg" >
            {typeOfCourses === TypeOfCourses.All && <Typography variant="h4" fontWeight="bold" fontFamily={'Roboto, sans-serif'} sx={{ marginBottom: "5px" }}>
                Группа - {groupName}
            </Typography>}
            {typeOfCourses === TypeOfCourses.Teaching && <Typography variant="h4" fontWeight="bold" fontFamily={'Roboto, sans-serif'} sx={{ marginBottom: "5px" }}>
                Преподаваемые курсы
            </Typography>}
            {typeOfCourses === TypeOfCourses.My && <Typography variant="h4" fontWeight="bold" fontFamily={'Roboto, sans-serif'} sx={{ marginBottom: "5px" }}>
                Мои курсы
            </Typography>}
            {(roles?.isAdmin && typeOfCourses === TypeOfCourses.All) && <Button variant="contained" sx={{ marginBottom: "10px" }} onClick={handleOpen}>
                Создать
            </Button>}
            <Grid item xs={12} md={12} container justifyContent="center">
                {groups?.map((item) =>
                (

                    <Card variant="outlined" sx={{ ...cardHoverStyles }} key={item.id} >
                        <MuiLink
                            component={RouterLink}
                            to={`/courses/${item.id}`}
                            underline="none"
                            key={item.id}
                            color={'black'}
                        >
                            <Grid
                                container
                                item xs={12}
                                md={12}
                                justifyContent="space-between"
                                alignItems={{ xs: 'centerHorizontally', sm: 'center', md: 'center', lg: 'center' }}
                            >
                                <Typography fontSize={20} fontWeight="bold" textAlign="left" alignSelf="flex-start">{item.name}</Typography>
                                <Typography fontSize={15} fontWeight="bold" textAlign="right" color={statusColorHelper(item.status)} alignSelf="flex-end">{statusTranslator(item.status)}</Typography>
                            </Grid>
                            <Typography fontSize={13}>Учебный год - {item.startYear}</Typography>
                            <Typography fontSize={13} sx={{ marginBottom: "10px" }}>Семестр - {seasonTranslator(item.semester)}</Typography>
                            <Typography fontSize={13} color="text.secondary">Мест всего - {item.maximumStudentsCount}</Typography>
                            <Typography fontSize={13} color="text.secondary">Мест свободно - {item.remainingSlotsCount}</Typography>
                        </MuiLink>
                    </Card>

                ))}
            </Grid>
            <CreateCourseModal setUpdated={setUpdated} open={open} handleClose={handleClose} typeOfModal={typesOfModal.createCourse} />
        </Container>
    )
}

async function fetchGroupsData (
    typeOfCourses: TypeOfCourses,
    setGroupsInfo: Dispatch<SetStateAction<IRequestCoursesData[] | undefined>>,
    id?: string,
) {
    try {
        let groupsInfo: IRequestCoursesData[] | undefined
        console.log(typeOfCourses)
        switch (typeOfCourses) {
            case TypeOfCourses.All: 
                groupsInfo = await GroupsService.getCourses(id);
                break;
            case TypeOfCourses.My:
                groupsInfo = await GroupsService.getMyCourses();
                break;
            case TypeOfCourses.Teaching:
                groupsInfo = await GroupsService.getTeachingCourses();
                break;
        }
        if (groupsInfo !== undefined) {
            setGroupsInfo(groupsInfo)
        }
        else {
            throw Error()
        }
    } catch (error) {
        console.error(error);
    }
}

const getGroupName = async (id?: string): Promise<string | undefined> => {

    const allGroups = await GroupsService.getCoursesGroups();

    const neededGroup = allGroups?.find(group => group.id === id)

    return neededGroup?.name
}
