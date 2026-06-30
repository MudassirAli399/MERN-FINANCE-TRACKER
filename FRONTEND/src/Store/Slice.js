import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "counter",
    initialState: {
        Budget:{
            Created : false,
            fetched : false,
            Data : []
        },
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
        UpdateBudget : (state, action) => {
            state.Budget.Created = action.payload.Created ? action.payload.Created : state.Budget.Created
            state.Budget.fetched = action.payload.fetched ? action.payload.fetched : state.Budget.fetched
            state.Budget.Data = action.payload.Data ? action.payload.Data : state.Budget.Data
        }
        
    },
});

export const { login , UpdatePassword,UpdateBudget} = slice.actions

export default slice.reducer