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
    "Failed" = "Провалена",
    "Passed" = "Сдана",
    "NotDefined" = "Оценка не выставлена"
}

export enum IAcceptanceStatusesData {
    "InQueue" = "В очереди",
    "Declined" = "Отклонено",
    "Accepted" = "Принято"
}

export enum ISemesterData{
    "Spring" = "Весна",
    "Autumn" = "Осень"
}

export enum ICourseStatusesData{
    "Created" = "Создан",
    "Finished" = "Закрыт",
    "Started" = "В процессе обучения",
    "OpenForAssigning" = "Открыт для записи"
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
