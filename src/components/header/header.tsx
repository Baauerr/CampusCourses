import AppBar from '@mui/material/AppBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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
import { useEffect, useState } from 'react';

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

  return (
    <ThemeProvider theme={theme}>
      <AppBar sx={{ backgroundColor: '#002C54' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" component="div" sx={{ display: 'flex', alignItems: 'stretch', gap: '10px' }}>
            Кампусные курсы
            <UserRolePanel />
          </Typography>
          <UserPanel />
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}


export const UserPanel = () => {
  const isAuth = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [userEmail, setEmail] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      const userInfo = await AuthService.getProfileInfo();
      setEmail(userInfo?.email);
    };
    fetchData();
  }, []);

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
      <div>
        <Link to="/registration">
          <Button variant="text" sx={{ color: "white" }}>
            Регистрация
          </Button>
        </Link>
        <Link to="/login">
          <Button variant="text" sx={{ color: "white" }}>
            Вход
          </Button>
        </Link>
      </div>
    );
  } else {
    return (
      <div>
        <Link to="/profile">
          <Button variant="text" sx={{ color: "white" }}>
            {userEmail}
          </Button>
        </Link>
        <Button variant="text" sx={{ color: "white" }} onClick={handleClick}>
          Выйти
        </Button>
      </div>
    );
  }
};


const UserRolePanel = () => {

  const roles = useSelector((state: RootState) => state.user.roles);
  const isAuth = useAuth();

  console.log(roles?.isTeacher)

  if (isAuth) {
    return (
      <div>
        <Link to="/groups">
          <Button variant="text" sx={{ color: 'white' }}>Группы курсов</Button>
        </Link>
        {roles?.isStudent &&
          <Link to="/courses/my">
            <Button variant="text" sx={{ color: 'white' }}>Мои курсы</Button>
          </Link>}
        {roles?.isTeacher &&
          <Link to="/courses/teaching">
            <Button variant="text" sx={{ color: 'white' }}>Преподаваемые курсы</Button>
          </Link>}
      </div>
    )
  }
}

export default Head;

