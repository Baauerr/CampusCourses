import { instance } from "../../api/axios"
import { IRequestCoursesData, IRequestCreateCourseData, IRequestGroupsCreateData, IResponseGroupsCoursesData } from "../../types/groupsTypes/groupCourses"
import { IResponseUsersData } from "../../types/userTypes/userGettingTypes"
import { IRequestChangeCourseStatusData } from "../../types/coursesTypes/courseTypes"

export const GroupsService = {

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

    async deleteGroup(id: string): Promise<void> {
        const { data } = await instance.delete(`groups/${id}`)
        if (data) {
            return data
        }
    },

    async getCourses(id?: string): Promise<IRequestCoursesData[] | undefined> {
        const { data } = await instance.get(`groups/${id}`)
        if (data) {
            return data
        }
    },

    async getMyCourses(): Promise<IRequestCoursesData[] | undefined> {
        const { data } = await instance.get(`courses/my`)
        if (data) {
            return data
        }
    },
    async getTeachingCourses(): Promise<IRequestCoursesData[] | undefined> {
        const { data } = await instance.get(`courses/teaching`)
        if (data) {
            return data
        }
    },

    async createCourse(createData: IRequestCreateCourseData, id?: string) {
        console.log(createData)
        const { data } = await instance.post(`groups/${id}`, createData)
        if (data) {
            return data
        }
    },

    async getUsers(): Promise<IResponseUsersData[] | undefined> {
        const { data } = await instance.get('users')
        if (data) {
            return data
        }
    },

    async changeStatus(id: string, status: IRequestChangeCourseStatusData) {
        const { data } = await instance.post(`courses/${id}/status`, status)
        if (data) {
            return data
        }
    },

}
