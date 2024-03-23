import * as yup from 'yup';

export const createCourseValidation = yup.object().shape({
    name: yup.string().required("Название обязательно для заполнения"),
    maximumStudentsCount: yup.number()
        .min(1)
        .required("На курсе должно быть минимум 1 место"),
    startYear: yup.number()
        .min(2024, 'Курс не должен начаться раньше 2024 года')
        .max(2099, 'Курс не должен начаться позднее 2099 года')
        .required('Начало курса обязательно для заполнения'),
    requirements: yup.string()
        .required('Требования обязательны для заполнения'),
    annotations: yup.string()
        .required('Аннотации обязательны для заполнения'),
});

export default createCourseValidation;