export interface IResponseCourseInfoData {
    id: string,
    name: string,
    startYear: number,
    maximumStudentsCount: number,
    studentsEnrolledCount: number,
    studentsInQueueCount: number,
    requirements: string,
    annotations: string,
    status: ICourseStatusesData,
    semester: ISemesterData,
    students: ICourseStudentsData[],
    teachers: ICourseTeachersData[],
    notifications: ICourseNotificationsData[]
}

export interface ICourseStudentsData {
    id: string,
    name: string,
    email: string,
    status: IAcceptanceStatusesData,
    midtermResult: IResultsStatusesData,
    finalResult: IResultsStatusesData
}

export interface ICourseTeachersData {
    name: string,
    email: string,
    isMain: boolean
}

export interface ICourseNotificationsData {
    text: string,
    isImportant: boolean
}

export enum IResultsStatusesData {
    "Failed" = "Failed",
    "Passed" = "Passed",
    "NotDefined" = "NotDefined"
}

export enum IAcceptanceStatusesData {
    "InQueue" = "InQueue",
    "Declined" = "Declined",
    "Accepted" = "Accepted"
}

export enum ISemesterData{
    "Spring" = "Spring",
    "Autumn" = "Autumn"
}

export enum ICourseStatusesData{
    "Created" = "Created",
    "Finished" = "Finished",
    "Started" = "Started",
    "OpenForAssigning" = "OpenForAssigning"
}

export interface ICourseRoleData {
    isAdmin: boolean,
    isTeacher: boolean,
    isMainTeacher: boolean
    isStudent: boolean
    isPotentialStudent: boolean
    isGuest: boolean
}

export enum typesOfModal {
    createCourse,
    editCourse
}

export interface IRequestChangeCourseStatusData {
    status: ICourseStatusesData
}

export interface IRequestChangeUserStatusData {
    status: IAcceptanceStatusesData
}

export interface IRequestAddNewTeacher {
    userId?: string
}


export enum MarkType {
    "Midterm" = "Midterm",
    "Final" = "Final"
}

export interface IRequestSetMarkData {
    markType?: MarkType,
    mark?: IResultsStatusesData
}
