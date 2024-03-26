import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { ICourseRoleData } from '../../types/coursesTypes/courseTypes'

interface ICourseState {
    [courseId: string]: ICourseRoleData

}

const initialState: ICourseState = {}

export const courseSlice = createSlice({
    name: 'courseRoles',
    initialState,
    reducers: {
        setCourseRole: (state, action: PayloadAction<{ groupId: string; role: ICourseRoleData }>) => {
            const { groupId, role } = action.payload;
            state[groupId] = role;
        },
    },
})

export const { setCourseRole } = courseSlice.actions

export const selectCount = (state: RootState) => state.courseRoles

export default courseSlice.reducer