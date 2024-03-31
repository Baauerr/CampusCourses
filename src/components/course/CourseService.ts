import { instance } from "../../api/axios"
import { IRequestCreateCourseData, IRequestGroupsCreateData } from "../../types/groupsTypes/groupCourses"
import { IRequestAddNewTeacher, IRequestChangeCourseStatusData, IRequestChangeUserStatusData, IRequestSetMarkData, IResponseCourseInfoData } from "../../types/coursesTypes/courseTypes"
import { ICreateNotificationData } from "../../types/coursesTypes/createNotificationType"

export const CourseService = {

    async editGroup(info: IRequestGroupsCreateData, id: string) { 
        const { data } = await instance.put(`groups/${id}`, info)
        return data
    },

    async deleteCourse(id: string) { 
        const {data} = await instance.delete(`courses/${id}`)
        if (data){
            return data
        }
    },

    async getCourseInfo(id?: string): Promise<IResponseCourseInfoData | undefined> { 
        const {data} = await instance.get(`courses/${id}/details`)
        if (data){
            return data
        }
    },

    async createNotification(createNotificationData?: ICreateNotificationData, id?: string) { 
        const {data} = await instance.post(`courses/${id}/notifications`, createNotificationData)
        if (data){
            return data
        }
    },

    async changeCourseInfo(createData: IRequestCreateCourseData, id?: string){ 
        const {data} = await instance.put(`courses/${id}`, createData)
        if (data){
            return data
        }
    },

    async changeStatus(id: string, status: IRequestChangeCourseStatusData) { 
        const {data} = await instance.post(`courses/${id}/status`, status)
        if (data){
            return data
        }
    },

    async addTeacher(id: string, teacherId: IRequestAddNewTeacher) { 
        const {data} = await instance.post(`courses/${id}/teachers`, teacherId)
        if (data){
            return data
        }
    },
    async signUpForCourse(id: string) { 
        const {data} = await instance.post(`courses/${id}/sign-up`)
        if (data){
            return data
        }
    },

    async setUserStatus(status: IRequestChangeUserStatusData, courseId?: string, studentId?: string) { 
        const {data} = await instance.post(`courses/${courseId}/student-status/${studentId}`, status)
        if (data){
            return data
        }
    },

    async setUserMark(markInfo: IRequestSetMarkData, courseId?: string, studentId?: string) { 
        console.log(studentId)
        const {data} = await instance.post(`courses/${courseId}/marks/${studentId}`, markInfo)
        if (data){
            return data
        }
    },
}
