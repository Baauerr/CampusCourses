import * as yup from 'yup';

export const registrationValidationSchema = yup.object().shape({
    email: yup.string().email('Введите корректный email').required('Email обязателен для заполнения'),
    password: yup.string().min(6, 'Пароль должен содержать минимум 6 символов')
        .required('Пароль обязателен для заполнения'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Пароли должны совпадать'),
    birthDate: yup.date()
        .max(new Date(), 'Дата рождения не может быть больше текущей даты')
        .min(new Date('1900-01-01'), 'Дата рождения не может быть раньше 1900 года')
        .required('Дата рождения обязательна для заполнения'),
    fullName: yup.string().required("ФИО обязательно для заполенния")
});

export default registrationValidationSchema;