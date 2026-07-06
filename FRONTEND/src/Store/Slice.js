import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "counter",
    initialState: {
        Budget:{
            Created : false,
            fetched : false,
            Data : [],
            Categories : []
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
        },
        Transaction:{
            StartFetch : true,
            Popup : false,
            Trans : [],
            Categories:{},
            Types:{},
            Month:""
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
            state.Budget.Categories = action.payload.Categories ? action.payload.Categories : state.Budget.Categories
        },
        UpdateTransaction : (state, action) => {
            state.Transaction.Popup = action.payload.Popup ?? state.Transaction.Popup
            state.Transaction.Trans = action.payload.Trans ?? state.Transaction.Trans
            state.Transaction.StartFetch = action.payload.StartFetch ?? state.Transaction.StartFetch
            state.Transaction.Types = action.payload.Types ?? state.Transaction.Types
            state.Transaction.Categories = action.payload.Categories ?? state.Transaction.Categories
            state.Transaction.Month = action.payload.Month ?? state.Transaction.Month

        }
    },
});

export const { login , UpdatePassword,UpdateBudget,UpdateTransaction} = slice.actions

export default slice.reducer