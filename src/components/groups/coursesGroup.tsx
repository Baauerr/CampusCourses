import Grid from '@mui/material/Grid';
import { Typography, Card, Container, Link as MuiLink, Button } from '@mui/material';
import { CoursesService } from './groupsService';
import { IResponseGroupsCoursesData } from "../../types/coursesTypes/groupCourses"
import { SetStateAction, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { RootState } from '../../store/store';
import { useAuth } from '../../hooks/useAuth';
import { useSelector } from 'react-redux';
import CreateModal from './createGroupModal';
import EditModal from './editGroupModal';
import { IUserRolesData } from '../../types/userTypes/roleTypes';

const cardHoverStyles = {
    width: '100%',
    padding: '10px',
    marginBottom: 0.3,
    '&:hover': {
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.6)',
    },
};



export const CoursesGroup = () => {

    const [groups, setGroupsInfo] = useState<IResponseGroupsCoursesData[]>();
    const [open, setOpen] = useState(false);
    const [updated, setUpdated] = useState(true)

    const roles = useSelector((state: RootState) => state.user.roles);
    const isAuth = useAuth();


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (updated) {
            const fetchData = async () => {
                try {
                    const groupsInfo = await CoursesService.getCoursesGroups();
                    setGroupsInfo(groupsInfo)
                } catch (error) {
                    console.error(error);
                }
            };
            fetchData();
        }
        setUpdated(false)
    }, [updated]);

    if (isAuth) {
        return (
            <Container maxWidth="lg">

                <Grid item xs={12} md={12}>
                    <Typography variant="h4" fontWeight="bold" fontFamily={'Roboto, sans-serif'} sx={{ marginBottom: "10px" }}>Группы кампусных курсов</Typography>
                    {roles?.isAdmin && <Button variant="contained" sx={{ marginBottom: "10px" }} onClick={handleOpen}>
                        Создать
                    </Button>}
                    {groups?.map((item) =>
                    (

                        <Card variant="outlined" sx={{ ...cardHoverStyles }} key = {item.id}>
                            <Grid container alignItems="center" spacing={1}>

                                <Grid item xs={12} sm={8}>
                                    <MuiLink
                                        component={RouterLink}
                                        to={`/course/${item.id}`}
                                        underline="none"
                                        key={item.id}
                                        color={'black'}
                                    >
                                        <Typography>{item.name}</Typography>
                                    </MuiLink>
                                </Grid>
                                <EditButtons roles={roles} groupName={item.name} handleClose={handleClose} setUpdated={setUpdated} id = {item.id}/>
                            </Grid>
                        </Card>

                    ))}
                </Grid>
                <CreateModal setUpdated={setUpdated} open={open} handleClose={handleClose} />
            </Container>
        )
    }
}

type EditButtonsProps  = {
    roles: IUserRolesData | null;
    groupName: string;
    handleClose: () => void;
    setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
    id: string
};

const EditButtons = ({ roles, setUpdated, handleClose, groupName, id }: EditButtonsProps) => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);

    const handleDelete = async () => {
        try {
            await CoursesService.deleteGroup(id);
            setUpdated(true);
        } catch (error) {
            console.error("no");
        }
    };

    return (
        <>
            {roles?.isAdmin && (
                <>
                    <Grid item xs={12} lg={2}>
                        <Button variant="contained" color="warning" onClick={handleOpen}>
                            Редактировать
                        </Button>
                    </Grid>
                    <Grid item xs={12} lg={2}>
                        <Button variant="contained" color="error" onClick={handleDelete}>
                            Удалить
                        </Button>
                    </Grid>
                
                </>
            )} 
            <EditModal setUpdated={setUpdated} open={open} handleClose={handleClose} groupName={groupName} id = {id} />
        </>
    );
};


