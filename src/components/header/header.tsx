import AppBar from '@mui/material/AppBar';
import { createTheme, ThemeProvider, Grid, Box, Drawer, useMediaQuery } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { AuthService } from '../auth/authService';
import { useAppDispatch } from '../../store/hooks';
import { logout } from '../../store/user/userSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { CSSProperties, useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 700,
        },
      },
    },
  },
});

const Head = () => {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setIsDrawerOpen(open);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar sx={{ backgroundColor: '#002C54' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" component="div" sx={{ display: 'flex', alignItems: 'stretch', gap: '10px' }}>
            Кампусные курсы
            <Grid sx={{ display: { lg: 'block', xs: 'none', md: 'none' } }}>
              <UserRolePanel />
            </Grid>
          </Typography>
          <Box sx={{ display: { sm: 'block', lg: 'none' } }}>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Grid sx={{ display: { lg: 'block', xs: 'none', md: 'none' } }}>
            <UserPanel />
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Grid sx={{ marginBottom: "30px" }}>
            <UserRolePanel />
          </Grid>
          <UserPanel />
        </Box>
      </Drawer>
    </ThemeProvider >
  );
}


interface StyleProps {
  style?: CSSProperties;
}

export const UserPanel = ({ style }: StyleProps) => {

  const isMdScreen = useMediaQuery('(max-width:1200px)');

  const isAuth = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const userInfo = await AuthService.getProfileInfo();
      if (userInfo) {
        localStorage.setItem("email", userInfo.email)
      }
    };
    if (isAuth) {
      fetchData();
    }
  }, [isAuth]);

  const handleClick = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await AuthService.logout();
      dispatch(logout());
      navigate("/");
    } catch {
      console.log("bruh");
    }
  };

  if (!isAuth) {
    return (
      <Grid
        sx={{
          flexDirection: { xs: 'column', md: 'column', lg: 'row' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Link to="/registration">
          <Button
            variant="text"
            sx={{
              color: isMdScreen ? 'black' : 'white',
              marginRight: { xs: 0, md: 2, lg: 0 }
            }}
          >
            Регистрация
          </Button>
        </Link>
        <Link to="/login" >
          <Button
            variant="text"
            sx={{
              color: isMdScreen ? 'black' : 'white',
              marginRight: { xs: 0, md: 2, lg: 0 }
            }}
          >
            Вход
          </Button>
        </Link>
      </Grid>
    );
  } else {
    return (
      <Grid sx={style}>
        <Link to="/profile">
          <Button
            variant="text"
            sx={{
              color: isMdScreen ? 'black' : 'white',
            }}
          >
            {localStorage.getItem("email")}
          </Button>
        </Link>
        <Button
          variant="text"
          sx={{
            color: isMdScreen ? 'black' : 'white',
          }}
          onClick={handleClick}
        >
          Выйти
        </Button>
      </Grid>
    );
  }
};


const UserRolePanel = () => {
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

export default Head;

