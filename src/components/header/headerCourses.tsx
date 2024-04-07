import { Grid, Box, useMediaQuery } from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';



export const UserCourseBlock = () => {
    const roles = useSelector((state: RootState) => state.user.roles);
    const isAuth = useAuth();
    const isMdScreen = useMediaQuery('(max-width:1200px)');
  
    if (isAuth) {
      return (
        <Grid container sx={{ flexDirection: { xs: 'column', sm: 'column', lg: 'row' } }}>
          <Box>
            <Link to="/groups/">
              <Button
                variant="text"
                sx={{
                  color: isMdScreen ? 'black' : 'white',
                }}
              >Группы курсов</Button>
            </Link>
          </Box>
          <Box >
            {roles?.isStudent && (
              <Link to="/courses/my/">
                <Button
                  variant="text"
                  sx={{
                    color: isMdScreen ? 'black' : 'white',
                  }}
                >Мои курсы</Button>
              </Link>
            )}
          </Box>
          <Box sx={{ display: { xs: 'block', sm: 'block', lg: 'initial' } }}>
            {roles?.isTeacher && (
              <Link to="/courses/teaching/">
                <Button
                  variant="text"
                  sx={{
                    color: isMdScreen ? 'black' : 'white',
                  }}
                >Преподаваемые курсы</Button>
              </Link>
            )}
          </Box>
        </Grid>
      )
    }
  }