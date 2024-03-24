import { instance } from "../../api/axios"
import { IResponseAccountInfoData } from "../../types/userTypes/accountTypes"
import { IRequestGroupsCreateData } from "../../types/groupsTypes/groupCourses"
import { IResponseCourseInfoData } from "../../types/coursesTypes/courseTypes"
import { ICreateNotificationData } from "../../types/coursesTypes/createNotificationType"

export const CourseService = {

    async editGroup(info: IRequestGroupsCreateData, id: string) { 
        const { data } = await instance.put(`groups/${id}`, info)
        return data
    },

    async deleteGroup(id: string): Promise<IResponseAccountInfoData | undefined> { 
        const {data} = await instance.delete(`groups/${id}`)
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

}
