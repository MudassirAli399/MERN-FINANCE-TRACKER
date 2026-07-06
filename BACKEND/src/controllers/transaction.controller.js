import asynchandler from "../utils/Asynchandler.js"
import transaction from "../models/transaction.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";


const addtransaction = asynchandler(async(req,res)=>{

    const { transInfo } = req.body;

    if(!transInfo){

        return res.send(
            ApiError(
                400,
                "All fields are required"
            )
        );
    }

    const Transaction =
    await transaction.findOne({
        UserId:req.id
    });

    if(!Transaction){

        return res.send(
            ApiError(
                400,
                "Transaction not found"
            )
        );
    }

    const month =
    Transaction.CurrentMonth;

    // get old array
    let oldTransactions =
    Transaction.AllTransactions.get(month) || [];

    console.log(oldTransactions);

    // add new transaction
    oldTransactions.push(transInfo);

    // update map
    Transaction.AllTransactions.set(
        month,
        oldTransactions
    );

    Transaction.markModified(
        "AllTransactions"
    );

    await Transaction.save();

    return res.send(
        ApiResponse(
            200,
            "Transaction added",
            Transaction
        )
    );

});

const showtransaction = asynchandler(async(req,res)=>{

    const Transaction =
    await transaction.findOne({
        UserId:req.id
    });

    const month =
    Transaction.CurrentMonth;

    

    const data = Transaction.AllTransactions.get(month)

  const categories = await transaction.aggregate([
{
    $match:{
        UserId:req.id
    }
},
{
    $project:{
        _id:0,
        Transaction:{
            $getField:{
                field:month,
                input:"$AllTransactions"
            }
        }
    }
},
{
    $unwind:"$Transaction"
},
{
    $group:{
        _id:{
            $toLower:"$Transaction.category"
        },

        transactions:{
            $push:"$Transaction"
        },

        totalAmount:{
            $sum:{
                $toInt:"$Transaction.amount"
            }
        }
    }
},
{
    $group:{
        _id:null,

        data:{
            $push:{
                data:[
                    {
                        k:"$_id",
                        v:"$totalAmount"
                    },
                    {
                        k:{
                            $concat:[
                                "$_id",
                                "Transactions"
                            ]
                        },
                        v:"$transactions"
                    }
                ]
            }
        }
    }
},
{
    $project:{
        data:{
            $reduce:{
                input:"$data",
                initialValue:[],
                in:{
                    $concatArrays:[
                        "$$value",
                        "$$this.data"
                    ]
                }
            }
        }
    }
},
{
    $replaceRoot:{
        newRoot:{
            $arrayToObject:"$data"
        }
    }
}
]);

   const Type = await transaction.aggregate([
{
    $match:{
        UserId:req.id
    }
},
{
    $project:{
        _id:0,
        Transaction:{
            $getField:{
                field:month,
                input:"$AllTransactions"
            }
        }
    }
},
{
    $unwind:"$Transaction"
},
{
    $group:{
        _id:{
            $toLower:"$Transaction.type"
        },

        transactions:{
            $push:"$Transaction"
        },

        totalAmount:{
            $sum:{
                $toInt:"$Transaction.amount"
            }
        }
    }
},
{
    $group:{
        _id:null,

        data:{
            $push:{
                data:[
                    {
                        k:"$_id",
                        v:"$totalAmount"
                    },
                    {
                        k:{
                            $concat:[
                                "$_id",
                                "Transactions"
                            ]
                        },
                        v:"$transactions"
                    }
                ]
            }
        }
    }
},
{
    $project:{
        data:{
            $reduce:{
                input:"$data",
                initialValue:[],
                in:{
                    $concatArrays:[
                        "$$value",
                        "$$this.data"
                    ]
                }
            }
        }
    }
},
{
    $replaceRoot:{
        newRoot:{
            $arrayToObject:"$data"
        }
    }
}
]);


    if(!Transaction){

        return res.send(
            ApiError(
                400,
                "Transaction not found"
            )
        );
    }

    return res.send(
        ApiResponse(
            200,
            "Transaction found",
            {
                "OriginalData" : data,
                "Types" : Type[0],
                "Categories" : categories[0],
                "Month" : month
            }
        )
    );

})

export {addtransaction,showtransaction}