import budget from "../models/budget.model.js";
import asynchandler from "../utils/Asynchandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import transaction from "../models/transaction.model.js";

const createbudget = asynchandler(async (req, res) => {
    // data collect
    const { StartNow,items } = req.body

    // data empty
    if(!items){
      return res.send(ApiError(400,"All fields are required"))
    }

    // get user id using jwt
    const Id = req.id

    // is budget available
    // is current month set to true
    
    let expiryDate= new Date()
    let currentmonth = new Date()
    let month = ""

    if(StartNow===true){

        expiryDate.setMonth(expiryDate.getMonth() + 1);

        const nextmonth = new Date()

        nextmonth.setMonth(nextmonth.getMonth() + 1);

        month = `${currentmonth.toLocaleString("default", { month: "long" })}-${nextmonth.toLocaleString("default", { month: "long" })}`

        console.log(expiryDate);
            
    }

    // calculate remaining days
    else{
         
        const today = new Date();

        expiryDate = new Date(
            today.getFullYear(),
            today.getMonth() + 1,
            0
        );  

        month=currentmonth.toLocaleString(
            "default",
            { month: "long" }
        );
    }

    // make expiry date
    // user create
    const Budget = await budget.create({
        UserId : Id,
        Items : items,
        expirydate : expiryDate,
        latest : true
    })

    // save data
    if(Budget){

        const existingtransaction = await transaction.findOne({
            UserId : Id
        })

        if(existingtransaction){

            existingtransaction.CurrentMonth=month

            existingtransaction.AllTransactions.set(
                month,
                []
            )

            existingtransaction.markModified(
                "AllTransactions"
            );

            console.log("i am runnig")

            await existingtransaction.save()
        
        }
        else{

            const transactionmap = new Map()

            transactionmap.set(month,[])

            await transaction.create({
                UserId : Id,
                CurrentMonth : month,
                AllTransactions : transactionmap
            })
        }

        return res.send(
            ApiResponse(
                201,
                "Budget created successfully",
                Budget
            )
        )
    }    
})


const showbudget = asynchandler(async(req,res)=>{
    console.log(req.id)
    const budgetToBeSent =
    await budget.findOne({
        UserId : req.id,
        latest : true
    })

    console.log(budgetToBeSent);

    const today = new Date()

    console.log(
        budgetToBeSent.expirydate
    );

    console.log(today);

    if(budgetToBeSent.expirydate <= today){

        budgetToBeSent.latest = false

        await budgetToBeSent.save()

        return res.send(
            ApiResponse(
                410,
                "Budget expired"
            )
        )
        
    }

    if(budgetToBeSent){

        return res.send(
            ApiResponse(
                200,
                "Budget found",
                budgetToBeSent
            )
        )
    }
    else{

        return res.send(
            ApiError(
                404,
                "Budget not found"
            )
        )
    }
})

export {createbudget,showbudget}