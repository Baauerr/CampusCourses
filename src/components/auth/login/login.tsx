import Item from '../item';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { AuthService } from '../authService';
import { useAppDispatch } from '../../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { login, roles } from '../../../store/user/userSlice';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { setTokenToLocalStorage } from '../../../helpers/tokenHelper';

export const Login = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [serverError, setServerError] = useState<string>('');

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: yup.object({
            email: yup.string().email('Введите корректный email').required('Email обязателен для заполнения'),
            password: yup.string().required('Пароль обязателен для заполнения'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const loginResponse = await AuthService.login(values);

                if (loginResponse) {
                    setServerError('');
                    setTokenToLocalStorage(loginResponse.token)
                    dispatch(login(loginResponse));

                    const userRoles = await AuthService.getUserRole();

                    if (userRoles !== undefined) {
                        dispatch(roles(userRoles));
                    }

                    navigate("/groups/");
                }
            } catch (error: any) {
                if (error.response && error.response.status === 400) {
                    setServerError('Неверный логин или пароль');
                }
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <Container maxWidth="sm">
            <form onSubmit={formik.handleSubmit}>
                <Item elevation={24} sx = {{borderRadius: '15px'}}>
                    <h1>Вход</h1>
                    <TextField
                        sx={{ marginBottom: 2 }}
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        variant="outlined"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email) || !!serverError}
                        helperText={(formik.touched.email && formik.errors.email)}
                    />
                    <TextField
                        sx={{ marginBottom: 2 }}
                        fullWidth
                        id="password"
                        name="password"
                        label="Пароль"
                        variant="outlined"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password) || !!serverError}
                        helperText={(formik.touched.password && formik.errors.password) || serverError}
                    />
                    <Button fullWidth size="large" variant="contained" type="submit" disabled={formik.isSubmitting}>Войти</Button>
                </Item>
            </form>
        </Container>
    );
};

export default Login;