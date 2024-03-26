import * as yup from 'yup';

export const createCourseValidation = yup.object().shape({
    name: yup.string().required("Название обязательно для заполнения"),
    maximumStudentsCount: yup.number()
        .min(1, "На курсе должно быть минимум 1 место")
        .required("Количество мест обязательно для заполнения"),
    startYear: yup.number()
        .min(2000, 'Курс не должен начаться раньше 2024 года')
        .max(2050, 'Курс не должен начаться позднее 2099 года')
        .required('Начало курса обязательно для заполнения'),
    requirements: yup.string()
        .required('Требования обязательны для заполнения'),
    annotations: yup.string()
        .required('Аннотации обязательны для заполнения'),
});

export default createCourseValidation;