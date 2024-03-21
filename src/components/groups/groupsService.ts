import { instance } from "../../api/axios"
import { IResponseAccountInfoData } from "../../types/userTypes/accountTypes"
import { IRequestGroupsCreateData, IResponseGroupsCoursesData } from "../../types/coursesTypes/groupCourses"

export const CoursesService = {

    async getCoursesGroups(): Promise<IResponseGroupsCoursesData[] | undefined> {
            const { data } = await instance.get<IResponseGroupsCoursesData[]>(`groups`)
            return data
    },

    async createGroup(info: IRequestGroupsCreateData) { 
        const { data } = await instance.post('groups', info)
        return data
    },

    async editGroup(info: IRequestGroupsCreateData) { 
        const { data } = await instance.put('groups', info)
        return data
    },

    async getProfileInfo(): Promise<IResponseAccountInfoData | undefined> { 
        const {data} = await instance.get('profile')
        if (data){
            return data
        }
    },

}
