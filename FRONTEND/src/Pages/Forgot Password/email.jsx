import { useForm } from "react-hook-form";
import { UpdatePassword } from "../../Store/Slice.js";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import React from "react";

export default function EmailStep() {

    const Active = useSelector(
        (state) => state.User.Active
    );

    const ForgotPassword = useSelector(
        (state) => state.ForgotPassword
    );

    const dispatch = useDispatch();

    const [loading, setLoading] =
    React.useState(false);

    const {
        register,
        handleSubmit,
        formState:{ errors }
    } = useForm();

    const onSubmit = async(formdata)=>{

        try{

            setLoading(true);

            if(Active){

                alert(
                    "You are logged in"
                );

                return;
            }

            console.log(
                JSON.stringify(formdata)
            );

            const response =
            await fetch(
                import.meta.env.VITE_VERIFY_EMAIL,
                {
                    method:"POST",

                    headers:{
                        "Content-Type":
                        "application/json"
                    },

                    body:JSON.stringify(
                        formdata
                    )
                }
            );

            const data =
            await response.json();

            console.log(data);

            if(
                data.message==="found"
            ){

                dispatch(
                    UpdatePassword({

                        Gmail:
                        formdata.verifyEmail,

                        Email:true,
                        OTP:false,
                        ChangePassword:false

                    })
                );

            }

            else{

                alert(
                    "Email not found"
                );

            }

        }

        catch(error){

            console.log(error);

            alert(
                "Something went wrong"
            );

        }

        finally{

            setLoading(false);

        }

    };

    if(ForgotPassword.Email){

        return (
            <Navigate
                to="/forgot-password/otp"
                replace={true}
            />
        );

    }

    return (

        <div className="min-h-screen flex items-center justify-center bg-[whitesmoke]">

            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">

                <h1 className="text-2xl font-semibold text-blue-600 mb-2">

                    Reset Password

                </h1>

                <p className="text-sm text-slate-500 mb-6">

                    Step 1 of 3 — Enter Email

                </p>

                <form
                    onSubmit={
                        handleSubmit(
                            onSubmit
                        )
                    }
                    className="space-y-4"
                >

                    <div>

                        <label className="block text-sm text-slate-700 mb-1">

                            Email

                        </label>

                        <input

                            {...register(
                                "verifyEmail",
                                {
                                    required:
                                    "Email is required",

                                    pattern:{
                                        value:
                                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

                                        message:
                                        "Enter valid email"
                                    }
                                }
                            )}

                            className="w-full px-3 py-2 rounded-md bg-[whitesmoke] border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"

                            placeholder="jane@example.com"

                        />

                        {errors.verifyEmail && (

                            <p className="text-red-500 text-xs mt-1">

                                {
                                    errors
                                    .verifyEmail
                                    .message
                                }

                            </p>

                        )}

                    </div>

                    <button

                        disabled={loading}

                        type="submit"

                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition disabled:opacity-50"

                    >

                        {
                            loading
                            ?
                            "Sending..."
                            :
                            "Send OTP"
                        }

                    </button>

                </form>

            </div>

        </div>

    );
}