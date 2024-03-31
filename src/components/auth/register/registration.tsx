import Item from '../item';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../authService';
import { useAppDispatch } from '../../../store/hooks';
import { login } from '../../../store/user/userSlice';
import { roles } from '../../../store/user/userSlice';
import { setTokenToLocalStorage } from '../../../helpers/tokenHelper';
import { useFormik } from "formik";
import { registrationValidationSchema } from '../../../helpers/validations/registrationValidation';
import { useState } from 'react';

export const Registration = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const [serverError, setServerError] = useState<string>('');

    interface FormData {
        email: string;
        password: string;
        birthDate: string;
        confirmPassword: string;
        fullName: string;
    }
    const initialValues: FormData = {
        email: '',
        password: '',
        birthDate: '',
        confirmPassword: '',
        fullName: '',
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: registrationValidationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const registrationResponse = await AuthService.registration(values);
                if (registrationResponse) {
                    setTokenToLocalStorage(registrationResponse.token);

                    dispatch(login(registrationResponse));
                    const userRoles = await AuthService.getUserRole();

                    if (userRoles !== undefined) {
                        dispatch(roles(userRoles));
                    }

                    navigate("/groups/");
                }
            } catch (error: any) {
                if (error.response && error.response.data.message === "User with this email is already registered.") {
                    setServerError('Такой email уже занят');
                    formik.setFieldError('email', 'Такой email уже занят');
                } else {
                    console.error(error);
                    setServerError('Произошла ошибка. Попробуйте еще раз.');
                }
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <Container maxWidth="sm">
            <Item elevation={24} sx = {{borderRadius: '15px'}}>
                <form onSubmit={formik.handleSubmit}>
                    <h1>Регистрация</h1>
                    <TextField
                        fullWidth
                        id="email"
                        label="Email"
                        variant="outlined"
                        {...formik.getFieldProps("email")}
                        error={formik.touched.email && (Boolean(formik.errors.email) || !!serverError)}
                        helperText={(formik.touched.email && formik.errors.email) || serverError}
                    />
                    <TextField
                        sx={{ marginTop: 2 }}
                        fullWidth id="fullName"
                        label="ФИО"
                        variant="outlined"
                        {...formik.getFieldProps("fullName")}
                        error={
                            formik.touched.fullName && Boolean(formik.errors.fullName)
                        }
                        helperText={formik.touched.fullName && formik.errors.fullName}
                    />
                    <TextField
                        sx={{ marginTop: 2 }}
                        variant="outlined"
                        fullWidth
                        id="birthDate"
                        label="Дата рождения"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        {...formik.getFieldProps("birthDate")}
                        error={
                            formik.touched.birthDate && Boolean(formik.errors.birthDate)
                        }
                        helperText={
                            formik.touched.birthDate && formik.errors.birthDate
                        }
                    />
                    <TextField
                        sx={{ marginTop: 2 }}
                        fullWidth id="password"
                        label="Пароль"
                        variant="outlined"
                        type = "password"
                        {...formik.getFieldProps("password")}
                        error={
                            formik.touched.password && Boolean(formik.errors.password)
                        }
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <TextField
                        sx={{ marginTop: 2 }}
                        fullWidth
                        id="confirmPassword"
                        label="Повторите пароль"
                        variant="outlined"
                        type = "password"
                        {...formik.getFieldProps("confirmPassword")}
                        error={
                            formik.touched.confirmPassword &&
                            Boolean(formik.errors.confirmPassword)
                        }
                        helperText={
                            formik.touched.confirmPassword &&
                            formik.errors.confirmPassword
                        }
                    />
                    <Button fullWidth size="large" variant="contained" type="submit" sx={{ marginTop: 2 }}>
                        Зарегистрироваться
                    </Button>
                </form>
            </Item>
        </Container >
    );
};

export default Registration;



