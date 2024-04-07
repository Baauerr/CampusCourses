import { Grid, useMediaQuery } from '@mui/material';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { AuthService } from '../auth/authService';
import { useAppDispatch } from '../../store/hooks';
import { logout } from '../../store/user/userSlice';
import { CSSProperties, useEffect } from 'react';

interface StyleProps {
    style?: CSSProperties;
  }

export const UserAccountBlock = ({ style }: StyleProps) => {

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
        console.log("Ошибка при выходе из аккаунта");
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