import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {UpdateTransaction} from "../Store/Slice.js"
import {useNavigate} from "react-router-dom"
export default function AddTransaction() {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const response = await fetch(
        import.meta.env.VITE_ADD_TRANSACTION,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            transInfo : data
          }),

        }
      );

      const output = await response.json();

      if(output)

      console.log(output);
      if(output.status==200){
        dispatch(UpdateTransaction({StartFetch:true,Popup:false}));
        pagereload();
      }

    // console.log(data);
    // alert(JSON.stringify(data));
  };
  const popup = ()  =>{
                    console.log("clicked");
                       dispatch(UpdateTransaction({Popup:false}))
                       
  }

  return (
    <div className="border-2 border-black h-screen w-1/3 bg-white absolute md:top-[25%] bottom-2  left-[40%] lg:top-2 ">

      {/* Top blue bar */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-500" />

      <div className="px-8 py-7 flex flex-col h-full">

        {/* Heading */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Add Transaction</h2>
          <p className="text-sm text-slate-400 mt-1">
            Enter the details of your transaction below
          </p>
        </div>

        <div className="h-px bg-slate-100 mb-6" />

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 flex-1">

          {/* Amount */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Amount</label>
            <input
              type="number"
              placeholder="0.00"
              {...register("amount")}
              className="w-full px-3 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Date</label>
            <input
              type="date"
              {...register("date")}
              className="w-full px-3 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Description</label>
            <input
              type="text"
              placeholder="e.g. Weekly grocery run"
              {...register("description")}
              className="w-full px-3 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* Type and Category */}
          <div className="grid grid-cols-2 gap-4">

            {/* Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Type</label>
              <select
                {...register("type")}
                className="w-full px-3 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-400 transition"
              >
                <option value="">Select type</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>

              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Category</label>
              <select
                {...register("category")}
                className="w-full px-3 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-400 transition"
              >
                <option value="">Select category</option>
                <option value="groceries">Groceries</option>
                <option value="rent">Rent</option>
                <option value="entertainment">Entertainment</option>
                <option value="expense">Other</option>

              </select>
            </div>

          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-6 border-t border-slate-100 mt-auto">
            <button
              type="button"
              onClick={popup} 
              className="flex-1 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition"
            >
              Add Transaction
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}