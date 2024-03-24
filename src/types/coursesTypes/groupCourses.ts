export interface IResponseGroupsCoursesData {
    id: string,
    name: string
}

export interface IRequestGroupsCreateData {
    name: string
}

export interface IRequestCoursesData {
    id: string,
    name: string,
    startYear: number, 
    maximumStudentsCount: number,
    remainingSlotsCount: number, 
    status: string, 
    semester: string
}

export interface IRequestCreateCourseData {
    name: string,
    startYear: number, 
    maximumStudentsCount: number,
    semester: string, 
    mainTeacherId: string,
    annotations: string,
    requirements: string,
}

