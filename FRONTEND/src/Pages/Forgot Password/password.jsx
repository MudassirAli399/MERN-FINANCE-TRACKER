import { useForm } from "react-hook-form";
import {useSelector,useDispatch} from "react-redux"
import { UpdatePassword } from "../../Store/Slice.js";

export default function NewPasswordStep() {
  const ForgotPassword = useSelector((state)=>(state.ForgotPassword))
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formdata) => {
     const updatedData = {
        ...formdata,
        Email: ForgotPassword.Gmail
    };
    console.log(updatedData);
    const response = await fetch(
        import.meta.env.VITE_UPDATE_PASSWORD,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
        );

      const data = await response.json();
      if(data.message="Update"){
        dispatch(UpdatePassword({Email:false,OTP:false,ChangePassword:true}))
      }
      console.log(data);
  };

  return (
    <>

    {ForgotPassword.OTP?(<div className="min-h-screen flex items-center justify-center bg-[whitesmoke]">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-blue-600 mb-2">
          Reset Password
        </h1>
        <p className="text-sm text-slate-500 mb-6">Step 3 of 3 — New Password</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-700 mb-1">New Password</label>
            <input
              type="password"
              {...register("NewPassword", {
                required: "Password is required",
                minLength: { value: 8, message: "At least 8 characters" },
                
              })}
              className="w-full px-3 py-2 rounded-md bg-[whitesmoke] border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="At least 8 characters"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* <div>
            <label className="block text-sm text-slate-700 mb-1">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              className="w-full px-3 py-2 rounded-md bg-[whitesmoke] border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Re-enter password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div> */}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>):(<div>You cannot access this page</div>)}
    
    
    </>
  );
}