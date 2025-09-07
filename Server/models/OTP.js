const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const otp = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires: 5*60
    }

});


async function sendVerificationEmail(email, otp){
    try{
        const mailResponse = await mailSender(email, "Verification email from Learnify", otp);
        console.log("Email sent successfully: ",mailResponse);
    }
    catch(err){
        console.log("error occured while sending email : ",err);
        throw err;
    }
}

otp.pre("save", async function(next){
    await sendVerificationEmail(this.email, this.otp);
    next();
})


module.exports = mongoose.model("OTP", otp);