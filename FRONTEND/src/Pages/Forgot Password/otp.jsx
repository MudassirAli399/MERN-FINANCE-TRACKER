import { useForm } from "react-hook-form";
import {useSelector,useDispatch} from "react-redux"
import {UpdatePassword} from "../../Store/Slice.js"
import { Navigate } from "react-router-dom";

export default function OtpStep() {
  const ForgotPassword = useSelector((state)=>(state.ForgotPassword))
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const resendnow = () =>{
    dispatch(UpdatePassword({Email:false,OTP:false,ChangePassword:false}))
  }
  const onSubmit = async (formdata) => {
    const response = await fetch(
        import.meta.env.VITE_OTP_VERIFIED,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formdata),
        }
        );

      const data = await response.json();
      console.log(data);
      if(data.message="found"){
        dispatch(UpdatePassword({Email:true,OTP:true,ChangePassword:false}))}
  };
  if(!ForgotPassword.Email){
    return <Navigate to="/forgot-password" replace={true} />
  }
  if(ForgotPassword.OTP){
    return <Navigate to="/forgot-password/new-password" replace={true} />
  }
  return (
    <>
    {ForgotPassword.Email ? ( <div className="min-h-screen flex items-center justify-center bg-[whitesmoke]">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-blue-600 mb-2">
          Reset Password
        </h1>
        <p className="text-sm text-slate-500 mb-6">Step 2 of 3 — Verify OTP</p>

        <p className="text-sm text-slate-500 mb-4">
          Enter the code sent to your email
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-700 mb-1">OTP Code</label>
            <input
            type="number"
              {...register("VerifyOTP", {
                required: "OTP is required",
                minLength: { value: 6, message: "Enter the 6-digit code" },
                maxLength: { value: 6, message: "Enter the 6-digit code" },
              })}
              className="w-full px-3 py-2 rounded-md bg-[whitesmoke] border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 tracking-widest text-center"
              placeholder="••••••"
              maxLength={6}
            />
            {errors.otp && (
              <p className="text-red-500 text-xs mt-1">{errors.otp.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition"
          >
            Verify OTP
          </button>

          <p className="text-center text-sm text-slate-500">
            Didn't get a code?{" "}
            <button onClick={resendnow}><span className="text-blue-600 font-medium cursor-pointer hover:underline">
              Resend
            </span></button>
          </p>
        </form>
      </div>
    </div>) : (<div>You can't access this page</div>)}
    
    </>
  );
  
}