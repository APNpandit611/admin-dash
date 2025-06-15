import { createSlice } from "@reduxjs/toolkit";

const chargerSlice = createSlice({
    name: "charger",
    initialState: [],
    reducers: {
        addCharger:(state, action) => {
            state.charger.push(action.payload)
        }
    }
})

export const { addCharger } = chargerSlice.actions
export default chargerSlice.reducer;