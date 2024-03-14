import Item from '../item';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { AuthService } from '../authService';
import { IResponseLoginData } from '../../../types/userTypes/registrationTypes';
import { setTokenToLocalStorage } from '../../../helpers/tokenHelper';
import { useAppDispatch } from '../../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { login, roles } from '../../../store/user/userSlice';

export const Login = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [data, setData] = useState<IResponseLoginData>({
        email: '',
        password: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.id]: e.target.value
        });
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const userData = {
                email: data.email,
                password: data.password,
            }
            const loginResponse = await AuthService.login(userData)
            if (loginResponse) {
                setTokenToLocalStorage(loginResponse.token);
                dispatch(login(loginResponse));
                const userRoles = await AuthService.getUserRole();

                if (userRoles !== undefined) {
                    dispatch(roles(userRoles))
                }
                navigate("/");
            }
        }
        catch {
            console.log("bruh");
        }
    };

    return (
        <Container maxWidth="sm" sx={{ paddingTop: "80px" }}>
            <form onSubmit={handleLogin}>
                <Item elevation={24}>
                    <h1>Вход</h1>
                    <TextField
                        sx={{ marginBottom: 2 }}
                        fullWidth
                        id="email"
                        label="Email"
                        variant="outlined"
                        onChange={handleChange}
                    />
                    <TextField
                        sx={{ marginBottom: 2 }}
                        fullWidth id="password"
                        label="Пароль"
                        variant="outlined"
                        onChange={handleChange}
                    />
                    <Button fullWidth size="large" variant="contained" type="submit">Войти</Button>
                </Item>
            </form>
        </Container>
    );
};

export default Login;