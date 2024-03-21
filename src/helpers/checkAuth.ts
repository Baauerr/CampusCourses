import { AuthService } from "../components/auth/authService"
import { AppDispatch } from "../store/store"
import { login, logout, roles } from "../store/user/userSlice"
import { getTokenFromLocalStorage } from "./tokenHelper"

export const checkAuth = async (dispatch: AppDispatch) => {

    const token = getTokenFromLocalStorage()
    try {
        if (token) {
            const data = await AuthService.getUserInfo()
            const userRoles = await AuthService.getUserRole()
            if (data && userRoles) {
                dispatch(login(data))
                dispatch(roles(userRoles));
            }
            else {
                dispatch(logout())
            }
        }
    }
    catch {
    }
}

export default checkAuth;