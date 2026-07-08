import { useForm, useFieldArray } from "react-hook-form";
import { useSelector,useDispatch } from "react-redux";
import {UpdateBudget} from "../Store/Slice.js"
import { useNavigate } from "react-router-dom";
import React from "react";

export default function Addbudget() {
  const user = useSelector((state) => state.User);
  const budget = useSelector((state) => state.Budget);
  const navigate = useNavigate();
  const dispatch = useDispatch();  
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      pairs: [{ Name: "", Value: "" }], // shuru mein 1 pair (2 inputs)
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "pairs",
  });

  const onSubmit =  async (data) => {
    // data.pairs => [{ text, number }, { text, number }, ...]
    console.log(data)
    console.log(data.pairs);
    
    
    
    dispatch(UpdateBudget({Created:true}))
    
   
    alert(JSON.stringify(data.pairs, null, 2));
    try{

            console.log("I am running");

            const response = await fetch(
                import.meta.env.VITE_CREATE_BUDGET,
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    credentials:"include",
                    body:JSON.stringify({
                        StartNow:data.StartNow,
                        items:data.pairs
                    })
                        
                }
            );

            const output = await response.json();
            if(output.status==400){alert(output.message);return}

            if(output.status==201){
                dispatch(UpdateBudget({Created:true}))
                navigate("/")
            }

            console.log(output);

        }
        catch(error){
            console.log("Error:",error);
        }
  };

  budget.Created ? console.log("Budget already created") : ""

  return (
    <>
    {user.Active ? (
        budget.Created ? (<div>Budget already created</div>) 
        :
        (<div className="min-h-screen flex items-center justify-center bg-[whitesmoke] p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-5"
      >
        <h1 className="text-2xl font-semibold text-blue-600 mb-2">
          Create Budget
        </h1>

       <div className="flex items-center gap-2">
  <input
    type="checkbox"
    {...register("StartNow")}
    className="h-4 w-4"
  />

  <label className="text-sm text-slate-700">
    Start budget now?
  </label>
</div>
       

        {fields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-slate-700 mb-1">
                Name
              </label>
              <input
                type="text"
                {...register(`pairs.${index}.Name`,{required:true})}
                placeholder="Enter text"
                className="w-full px-3 py-2 rounded-md bg-[whitesmoke] border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-700 mb-1">
                Value
              </label>
              <input
                type="number"
                {...register(`pairs.${index}.Value`,{required:true})}
                placeholder="Enter number"
                className="w-full px-3 py-2 rounded-md bg-[whitesmoke] border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => append({ Name: "", Value: "" })}
          className="w-full border border-blue-600 text-blue-600 font-medium py-2 rounded-md hover:bg-blue-50 transition"
        >
          + Add Fields
        </button>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition"
        >
          Submit
        </button>
      </form>
    </div>)
    )
     :
    (<div>You are not logged in</div>)}
    
    </>
  );
}