import { GroupsService } from "../../components/groups/groupsService";
import { IAcceptanceStatusesData, ICourseRoleData, ICourseStudentsData, ICourseTeachersData } from "../../types/coursesTypes/courseTypes";
import { IUserRolesData } from "../../types/userTypes/roleTypes";

export const getUserCourseRole = async (studentsArray: ICourseStudentsData[], teachersArray: ICourseTeachersData[], roles: IUserRolesData, courseId: string): Promise<ICourseRoleData> => {
    const userEmail = localStorage.getItem("email")

    const myCourses = await GroupsService.getMyCourses();

    console.log(courseId)


    const userRoles: ICourseRoleData = {
        isAdmin: false,
        isMainTeacher: false,
        isStudent: false,
        isTeacher: false,
        isPotentialStudent: false,
        isGuest: false
    };

    if (roles?.isAdmin) {
        userRoles.isAdmin = true;
        userRoles.isMainTeacher = true;
        userRoles.isTeacher = true;
        return userRoles;
    }

    const isTeacher = teachersArray.some(teacher => teacher.email === userEmail);
    if (isTeacher) {
        userRoles.isTeacher = true;
        const isMainTeacher = teachersArray.some(teacher => teacher.email === userEmail && teacher.isMain);
        if (isMainTeacher) {
            userRoles.isMainTeacher = true;
        }
        return userRoles;
    }

    const isStudent = studentsArray.some(student => student.email === userEmail && student.status === IAcceptanceStatusesData.Accepted);
    if (isStudent) {
        userRoles.isStudent = true;
        return userRoles;
    }
    const isPotentialStudent = ((!studentsArray.some(student => student.email === userEmail)) && (myCourses?.some(course => course.id === courseId)));
    console.log(!studentsArray.some(student => student.email === userEmail));
    console.log(myCourses?.some(course => course.id === courseId))
    console.log(isPotentialStudent)
    if (isPotentialStudent) {
        userRoles.isPotentialStudent = true;
        return userRoles;
    }

    userRoles.isGuest = true;
    return userRoles;
};