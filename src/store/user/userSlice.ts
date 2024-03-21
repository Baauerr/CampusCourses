import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { IAuthRequestData } from '../../types/userTypes/registrationTypes'
import { IUserRolesData } from '../../types/userTypes/roleTypes'

interface IUSerState {
  token: IAuthRequestData | null
  isAuth: boolean 
  roles: IUserRolesData | null
}

const initialState: IUSerState = {
  token: null,
  isAuth: false, 
  roles: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IAuthRequestData>) => {
        state.token = action.payload
        state.isAuth = true
    },
    logout: (state) => {
        state.isAuth = false
        state.token = null
    },
    roles: (state, action: PayloadAction<IUserRolesData>) => {
        state.roles = action.payload
    }
  },
})

export const { login, logout, roles } = userSlice.actions

export const selectCount = (state: RootState) => state.user

export default userSlice.reducer