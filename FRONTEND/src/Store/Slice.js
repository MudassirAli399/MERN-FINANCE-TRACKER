import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "counter",
    initialState: {
        User:{
            Active:false,
            Name:"",
            Email:""
        },
        ForgotPassword:{
            Gmail:"",
            Email : false,
            OTP: false,
            ChangePassword: false
        }
    },
    reducers: {
        login: (state, action) => {
            state.User.Active = action.payload.Active;
            state.User.Name = action.payload.Name
            state.User.Email = action.payload.Email
        },
        UpdatePassword: (state, action) => {
            state.ForgotPassword.Gmail = action.payload.Gmail? action.payload.Gmail : state.ForgotPassword.Gmail
            state.ForgotPassword.Email = action.payload.Email
            state.ForgotPassword.OTP = action.payload.OTP
            state.ForgotPassword.ChangePassword = action.payload.ChangePassword
        },
    },
});

export const { login , UpdatePassword} = slice.actions

export default slice.reducer