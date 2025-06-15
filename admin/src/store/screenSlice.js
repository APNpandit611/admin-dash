import { createSlice } from "@reduxjs/toolkit";

const screenSlice = createSlice({
    name: "screen",
    initialState: {
        mode: false
    },
    reducers: {
        changeMode:(state, action) => {
            state.mode = action.payload.mode;
        }
    }
})

export const { changeMode } = screenSlice.actions;
export default screenSlice.reducer;