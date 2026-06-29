import nodemailer from "nodemailer";

const sendEmail = async(email, otp)=>{

    const transporter = nodemailer.createTransport({

        service:"gmail",

        auth:{
            user:process.env.EMAIL,
            pass:process.env.EMAIL_PASSWORD
        }

    });

    await transporter.sendMail({

        from:process.env.EMAIL,

        to:email,

        subject:"Password Reset OTP",

        html:`
            <h2>Password Reset</h2>
            <p>Your OTP is:</p>
            <h1>${otp}</h1>
            <p>Expires in 5 minutes</p>
        `
    });

};

export default sendEmail;