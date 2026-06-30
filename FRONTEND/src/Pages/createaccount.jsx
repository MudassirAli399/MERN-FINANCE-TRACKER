import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../Store/Slice.js";

export default function CreateAccount() {

  const user = useSelector((state) => state.User);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {

    try {

      // Check existing account
      if (formData.Email === user.Email) {
        console.log("Account already exists");
        return;
      }

      const response = await fetch(
        import.meta.env.VITE_CREATE_ACCOUNT,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),

        }
      );

      const data = await response.json();

      console.log(data);

      dispatch(
        login({
          Active: true,
          Name: data.RequiredData.Name,
          Email: data.RequiredData.Email,
        })
      );

    } catch (error) {
      console.log(error);
    }

  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[whitesmoke]">

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm space-y-4"
        >

          <h1 className="text-2xl font-semibold text-blue-600 mb-2">
            Create Account
          </h1>

          {/* Name */}
          <div>
            <label className="block text-sm text-slate-700 mb-1">
              Name
            </label>

            <input
              {...register("Name", {
                required: "Name is required"
              })}
              className="w-full px-3 py-2 rounded-md bg-[whitesmoke] border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Jane Doe"
            />

            {errors.Name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.Name.message}
              </p>
            )}

          </div>


          {/* Email */}
          <div>
            <label className="block text-sm text-slate-700 mb-1">
              Email
            </label>

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

            {errors.Email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.Email.message}
              </p>
            )}

          </div>


          {/* Password */}
          <div>
            <label className="block text-sm text-slate-700 mb-1">
              Password
            </label>

            <input
              type="password"
              {...register("Password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "At least 8 characters",
                },
              })}
              className="w-full px-3 py-2 rounded-md bg-[whitesmoke] border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="At least 8 characters"
            />

            {errors.Password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.Password.message}
              </p>
            )}

          </div>


          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition"
          >
            Create account
          </button>


          <p className="text-center text-sm text-slate-500 pt-1">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Login account
            </Link>
          </p>

        </form>

      </div>
    </>
  );
}