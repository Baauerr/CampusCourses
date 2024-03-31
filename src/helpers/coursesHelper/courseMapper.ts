import { IResponseCourseInfoData } from "../../types/coursesTypes/courseTypes";
import { IRequestCreateCourseData } from "../../types/groupsTypes/groupCourses";

export const courseMapper = (courseInfo: IResponseCourseInfoData): IRequestCreateCourseData => {
    const updateCourseInfo: IRequestCreateCourseData = {
        name: courseInfo.name,
        startYear: courseInfo.startYear,
        maximumStudentsCount: courseInfo.maximumStudentsCount,
        semester: courseInfo.semester,
        annotations: courseInfo.annotations,
        requirements: courseInfo.requirements,
    }
    return updateCourseInfo
}

