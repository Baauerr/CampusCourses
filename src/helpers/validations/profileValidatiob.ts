import * as yup from 'yup';

export const profileValidationSchema = yup.object().shape({
    fullName: yup.string().required("ФИО обязательно для заполенния"),
    birthDate: yup.date()
        .max(new Date(), 'Дата рождения не может быть больше текущей даты')
        .min(new Date('1900-01-01'), 'Дата рождения не может быть раньше 1900 года')
        .required('Дата рождения обязательна для заполнения'),
});

export default profileValidationSchema;