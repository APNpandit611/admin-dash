import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        token:null
        // role: null
    },
    reducers: {
        login:(state, action) => {
            state.user = action.payload.user;
     
            // state.role = action.payload.role;
        },
        logout:(state) => {
            state.user = null;
            // state.role = null;
        }
    }
})

export const { login, logout } = userSlice.actions;
export default userSlice.reducer; 