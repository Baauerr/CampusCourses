import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import courseRolesReducer from './course/courseSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    courseRoles: courseRolesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch