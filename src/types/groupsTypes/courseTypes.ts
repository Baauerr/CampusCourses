import { ISemesterData } from "../coursesTypes/courseTypes";

export interface IRequestCreateCourseData {
    name: string,
    startYear: number, 
    maximumStudentsCount: number,
    semester: ISemesterData, 
    mainTeacherId: string,
    annotations: string,
    requirements: string,
}