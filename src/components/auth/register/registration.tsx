import Item from '../item';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from '@mui/x-date-pickers';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { ChangeEvent, useState } from 'react';
import { IResponseRegistrationData } from '../../../types/userTypes/registrationTypes';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../authService';
import { useAppDispatch } from '../../../store/hooks';
import { login } from '../../../store/user/userSlice';
import { roles } from '../../../store/user/userSlice';
import { setTokenToLocalStorage } from '../../../helpers/tokenHelper';
import React from 'react';

export const Registration = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const [data, setData] = useState<IResponseRegistrationData>({
        email: '',
        password: '',
        birthDate: '',
        confirmPassword: '',
        fullName: '',
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.id]: e.target.value
        });
    };

    const handleDateChange = (date: string | null) => {
        if (date) {
            setData({
                ...data,
                birthDate: date,
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        

        if (data.password == data.confirmPassword) {
            try {
                const userData = {
                    email: data.email,
                    password: data.password,
                    birthDate: data.birthDate,
                    confirmPassword: data.confirmPassword,
                    fullName: data.fullName,
                }
                const registrationResponse = await AuthService.registration(userData)
                if (registrationResponse) {
                    setTokenToLocalStorage(registrationResponse.token);
                    dispatch(login(registrationResponse));
                    const userRoles = await AuthService.getUserRole();
                    
                    if (userRoles !== undefined){
                        dispatch(roles(userRoles))
                    }
        
                    navigate("/");
                }
            }
            catch {
                console.log("bruh");
            }
        }
    };

    return (
        <Container maxWidth="sm" sx={{ paddingTop: "80px" }}>
            <Item elevation={24}>
                <form onSubmit={handleSubmit}>
                    <h1>Регистрация</h1>
                    <TextField
                        sx={{ marginBottom: 2 }}
                        fullWidth id="email"
                        label="Email"
                        variant="outlined"
                        onChange={handleChange}
                    />
                    <TextField
                        sx={{ marginBottom: 2 }}
                        fullWidth id="fullName"
                        label="ФИО"
                        variant="outlined"
                        onChange={handleChange}
                    />
                    <PickDate onChange={handleDateChange} />
                    <TextField
                        sx={{ marginBottom: 2 }}
                        fullWidth id="password"
                        label="Пароль"
                        variant="outlined"
                        onChange={handleChange}
                    />
                    <TextField
                        sx={{ marginBottom: 2 }}
                        fullWidth id="confirmPassword"
                        label="Повторите пароль"
                        variant="outlined"
                        onChange={handleChange}
                    />
                    <Button fullWidth size="large" variant="contained" type="submit">
                        Зарегистрироваться
                    </Button>
                </form>
            </Item>
        </Container>
    );
};

export default Registration;

export const PickDate = ({ onChange }: { onChange: (date: string | null) => void }, dateInfo?: string) => {
    const [value, setValue] = useState<string | null>(null);

    const handleDateChange = (newValue: string | null) => {
        setValue(newValue);
        onChange(newValue);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
                sx={{ marginBottom: 2 }}
                fullWidth
                id="birthDate"
                label="День рождения"
                value={dateInfo}
                format="DD.MM.YYYY"
                onChange={handleDateChange}
            />
        </LocalizationProvider>
    );
};


