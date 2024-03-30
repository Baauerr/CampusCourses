import Grid from '@mui/material/Grid';
import { Typography, Card, Container, Link as MuiLink, Button } from '@mui/material';
import { GroupsService } from '../groupsService';
import { useEffect, useState } from 'react';
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

export const ConcretteGroup = ({ typeOfCourses }: ConcretteGroupProps) => {

    const [groups, setGroupsInfo] = useState<IRequestCoursesData[]>();
    const [open, setOpen] = useState(false);
    const [updated, setUpdated] = useState(true)
    const [typeOfCourse, setTypeOfCourse] = useState<TypeOfCourses>();
    const [groupName, setGroupName] = useState<string>();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { id } = useParams();
    const location = useLocation();
    const roles = useSelector((state: RootState) => state.user.roles);

    const fetchData = async () => {
        try {
            let groupsInfo: IRequestCoursesData[] | undefined
            switch (typeOfCourses) {
                case TypeOfCourses.All:
                    groupsInfo = await GroupsService.getCourses(id);
                    break;
                case TypeOfCourses.My:
                    setTypeOfCourse(typeOfCourse)
                    groupsInfo = await GroupsService.getMyCourses();
                    break;
                case TypeOfCourses.Teaching:
                    setTypeOfCourse(typeOfCourse)
                    groupsInfo = await GroupsService.getTeachingCourses();
                    break;
            }
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
    }, [updated]);

    return (
        <Container maxWidth="lg">
            <Grid item xs={12} md={12}>
                { typeOfCourses === TypeOfCourses.All && <Typography variant="h4" fontWeight="bold" fontFamily={'Roboto, sans-serif'} sx={{ marginBottom: "5px" }}>
                    Группа - {groupName}
                </Typography>}
                { typeOfCourses === TypeOfCourses.Teaching && <Typography variant="h4" fontWeight="bold" fontFamily={'Roboto, sans-serif'} sx={{ marginBottom: "5px" }}>
                    Преподаваемые курсы
                </Typography>}
                { typeOfCourses === TypeOfCourses.My && <Typography variant="h4" fontWeight="bold" fontFamily={'Roboto, sans-serif'} sx={{ marginBottom: "5px" }}>
                    Мои курсы
                </Typography>}
                {(roles?.isAdmin && typeOfCourses === TypeOfCourses.All) && <Button variant="contained" sx={{ marginBottom: "10px" }} onClick={handleOpen}>
                    Создать
                </Button>}
                {groups?.map((item) =>
                (
                    <MuiLink
                        component={RouterLink}
                        to={`/courses/${item.id}`}
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
            <CreateCourseModal setUpdated={setUpdated} open={open} handleClose={handleClose} typeOfModal={typesOfModal.createCourse} />
        </Container>
    )
}

const getGroupName = async (id?: string): Promise<string | undefined> => {

    const allGroups = await GroupsService.getCoursesGroups();

    const neededGroup = allGroups?.find(group => group.id === id)

    return neededGroup?.name
}