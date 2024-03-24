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

}

export enum IAcceptanceStatusesData {

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