import { AuthService } from "../components/auth/authService"
import { useAppDispatch } from "../store/hooks"
import { AppDispatch } from "../store/store"
import { login, logout } from "../store/user/userSlice"
import { getTokenFromLocalStorage } from "./tokenHelper"

export const checkAuth = async (dispatch: AppDispatch) => {
 //   const dispatch = useAppDispatch()


    const token = getTokenFromLocalStorage()
    try {
        if (token) {
            const data = await AuthService.getUserInfo()

            if (data) {
                dispatch(login(data))
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