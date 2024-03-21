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

}
