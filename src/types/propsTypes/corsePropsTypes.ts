import { Dispatch, ReactNode } from "react";
import { ICourseRoleData, ICourseStatusesData, ICourseStudentsData, ICourseTeachersData, IResponseCourseInfoData, IResultsStatusesData, MarkType } from "../coursesTypes/courseTypes";

export interface CourseInfoTabsProps {
    studentsArray: ICourseStudentsData[];
    teachersArray: ICourseTeachersData[];
    setUpdated: Dispatch<React.SetStateAction<boolean>>;
    roles?: ICourseRoleData;
    courseId?: string
}

export interface TeachersPanelProps {
    value: string;
    index: string;
    teachersList: ICourseTeachersData[];
    studentsList: ICourseStudentsData[];
    role?: ICourseRoleData;
    courseId?: string
    setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface StudentsPanelProps {
    value: string;
    index: string;
    studentsList: ICourseStudentsData[];
    role?: ICourseRoleData;
    courseId?: string
    setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface setMarkModalProps {
    courseId?: string
    studentId?: string
    open: boolean;
    handleClose: () => void;
    setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
    oldGrade?: IResultsStatusesData
    markType?: MarkType
};

export interface InfoPanelProps {
    courseInfo?: IResponseCourseInfoData;
    setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
    courseRole?: ICourseRoleData
    courseId?: string
}

export interface EditModalProps {
    id: string
    openEdit: boolean;
    handleClose: () => void;
    setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
    courseStatus: ICourseStatusesData
};

export interface CreateModalProps {
    open: boolean;
    handleClose: () => void;
    setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface CourseInfoProps {
    courseInfo?: IResponseCourseInfoData;
    setUpdated: Dispatch<React.SetStateAction<boolean>>;
    courseRole?: ICourseRoleData;
}

export interface TabPanelProps {
    children: ReactNode,
    value: string, 
    index: string, 
    htmlString: string
}

export interface AddTeacherModalProps {
    id?: string
    openEdit: boolean;
    handleClose: () => void;
    setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
    teachersArray: ICourseTeachersData[];
    studentsArray: ICourseStudentsData[];
};




