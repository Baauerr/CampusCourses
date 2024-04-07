import { ICourseRoleData, IResponseCourseInfoData, typesOfModal } from "../coursesTypes/courseTypes";

export interface CreateCourseModalProps {
    open: boolean;
    handleClose: () => void;
    setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
    typeOfModal: typesOfModal
    role?: ICourseRoleData
    currentCourseInfo?: IResponseCourseInfoData
};