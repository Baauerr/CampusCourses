import { Dispatch, SetStateAction } from "react";
import { ICourseRoleData, IResponseCourseInfoData, typesOfModal } from "../coursesTypes/courseTypes";
import { IUserRolesData } from "../userTypes/roleTypes";

export interface CreateCourseModalProps {
    open: boolean;
    handleClose: () => void;
    setUpdated: Dispatch<SetStateAction<boolean>>;
    typeOfModal: typesOfModal
    role?: ICourseRoleData
    currentCourseInfo?: IResponseCourseInfoData
};

export interface EditCourseButtonProps {
    roles: IUserRolesData | null;
    groupName: string;
    setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
    id: string
};

export interface DeleteGroupModalProps {
    name: string
    openDelete: boolean;
    handleCloseDelete: () => void;
    setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
    deleteRequestFunction: () => Promise<void>;
    redirectPath?: string;
};

export interface EditGroupModalProps {
    id: string
    groupName: string
    openEdit: boolean;
    handleClose: () => void;
    setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};
