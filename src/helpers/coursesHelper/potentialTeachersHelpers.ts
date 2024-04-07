import { GroupsService } from "../../components/groups/groupsService";
import { ICourseStudentsData, ICourseTeachersData } from "../../types/coursesTypes/courseTypes";
import { IResponseUsersData } from "../../types/userTypes/userGettingTypes";

export const getPotentialTeachers = async (teachersArray: ICourseTeachersData[], studentsArray: ICourseStudentsData[]): Promise<IResponseUsersData[]> => {
    const allUsers: IResponseUsersData[] | undefined = await GroupsService.getUsers();

    if (!allUsers) {
        return [];
    }

    const potentialTeachers: IResponseUsersData[] = allUsers.filter(user =>
        !teachersArray.some(teacher => teacher.name === user.fullName) &&
        !studentsArray.some(student => student.name === user.fullName)
    );

    return potentialTeachers;
}