import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "counter",
    initialState: {
        User:{
            Active:false,
            Name:"",
            Email:""
        }
    },
    reducers: {
        login: (state, action) => {
            state.User.Active = action.payload.Active;
            state.User.Name = action.payload.Name
            state.User.Email = action.payload.Email
        },
    },
});

export const { login } = slice.actions

export default slice.reducer