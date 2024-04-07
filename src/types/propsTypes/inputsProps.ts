import { FormikProps } from "formik";
import { IRequestCreateCourseData, TypeOfCourses } from "../groupsTypes/groupCourses";
import { IResponseUsersData } from "../userTypes/userGettingTypes";
import { ICourseRoleData, typesOfModal } from "../coursesTypes/courseTypes";

export interface InputProps {
    formik: FormikProps<IRequestCreateCourseData>;
};

export interface InputsNameProps extends InputProps {
    serverError: string;
}

export interface SelectTeacherProps extends InputProps {
    users?: IResponseUsersData[];
    typeOfModal: typesOfModal;
}

export interface CourseInputProps extends InputsNameProps {
    typeOfModal: typesOfModal;
    users?: IResponseUsersData[];
    role?: ICourseRoleData;
}