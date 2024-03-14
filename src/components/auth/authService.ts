import { IResponseLoginData } from "../../types/userTypes/registrationTypes"
import { IAuthRequestData } from "../../types/userTypes/registrationTypes"
import { instance } from "../../api/axios"
import { IResponseRegistrationData } from "../../types/userTypes/registrationTypes"
import { removeTokenFromLocalStorage } from "../../helpers/tokenHelper"
import { IUserRolesData } from "../../types/userTypes/roleTypes"
import { IResponseAccountInfoData } from "../../types/userTypes/accountTypes"

export const AuthService = {

    async registration(userData: IResponseRegistrationData): Promise<IAuthRequestData | undefined> {
        try {
            const { data } = await instance.post<IAuthRequestData>(`registration`, userData)
            return data
        } catch (err) {
            console.error(err)
        }
    },

    async login(userData: IResponseLoginData): Promise<IAuthRequestData | undefined> {
        try {
            const { data } = await instance.post<IAuthRequestData>(`login`, userData)
            return data
        } catch (err) {
            console.error(err)
        }
    },

    async getUserInfo() { 
        const {data} = await instance.get('profile')
        if (data){
            return data
        }
    },

    async getProfileInfo(): Promise<IResponseAccountInfoData | undefined> { 
        const {data} = await instance.get('profile')
        if (data){
            return data
        }
    },

    async getUserRole(): Promise<IUserRolesData | undefined> { 
        const {data} = await instance.get('roles')
        try{
            return data
        }
        catch {
            console.log("bruh")
        }
        
    },

    async logout() {
        await instance.post('logout');
        removeTokenFromLocalStorage();
    }
}
