import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Store/Slice.js";
export default function Login() {
  const user = useSelector((state) => state.User);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if(user.Active){
      alert("You are already logged in")
    }
    else {
      try {
        console.log(JSON.stringify(data));
        const response = await fetch(
          import.meta.env.VITE_LOGIN_ACCOUNT,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
          }
        );
        const output = await response.json();
        console.log(output);
        dispatch(login({
          Active: true,
          Name: output.RequiredData.Name,
          Email: output.RequiredData.Email
        }))
        
        
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[whitesmoke]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-semibold text-blue-600 mb-2">Login</h1>

        <div>
          <label className="block text-sm text-slate-700 mb-1">Email</label>
          <input
            {...register("Email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            })}
            className="w-full px-3 py-2 rounded-md bg-[whitesmoke] border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="jane@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-slate-700 mb-1">Password</label>
          <input
            type="password"
            {...register("Password", { required: "Password is required" })}
            className="w-full px-3 py-2 rounded-md bg-[whitesmoke] border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition"
        >
          Login
        </button>
        <p className="text-center text-sm text-slate-500 pt-1">
          Forgot?Click here:-{" "}
          <Link to="/forgot-password" className="text-blue-600 font-medium cursor-pointer hover:underline">
            Forgot password
          </Link>
        </p>
        <p className="text-center text-sm text-slate-500 pt-1">
          Don't have an account?{" "}
          <Link to="/create" className="text-blue-600 font-medium cursor-pointer hover:underline">
            Create account
          </Link>
        </p>
      </form>
    </div>
  );
}