const User = require("../models/User");
const OTP = require("../models/OTP");
const Profile = require("../models/Profile");


const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
require("dotenv").config();



//send OTP
exports.sendOTP = async (req, res) => {
    try{
        const {email} =req.body;

        const checkUserPresent = await User.findOne({email})

        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:"User already registered"
            })
        }

        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        });
        console.log("otp GENERATED : ",otp);
        let result = await OTP.findOne({otp:otp});

        while(result){
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            });
            result = await OTP.findOne({otp : otp});

            
        }

        const otpPayload = {email, otp};

        const otpBody = await OTP.create(otpPayload);
        console.log("otp body", otpBody);

        res.status(200).json({
            success:true,
            message:"otp send successfully",
            otp
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }

    

}

//signUp

exports.signup = async(req,res)=>{

    try{
            //data fetch from request ki body

        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            // contactNumber,
            otp
        } = req.body;

        //validate karlo

        if(!firstName || !lastName || !email || !password || !confirmPassword || !accountType  || !otp){
            return res.status(403).json({
                success:false,
                message:"All fields are required"
            })
        }

        



        //2 passwords match karo
        if(password !== confirmPassword) {
            return res.status(400).json({
                success:false,
                message:"password and confirmPassword Value does not match, please try again"
            });
        }

        //check user already exist or not 
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User is already registered"
            })
        }

        //find most recent Otp stored for the user
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log("recent otp", recentOtp);
        
        //validate Otp
        if(recentOtp.length == 0){
            return res.status(400).json({
                success:false,
                message:"OTP not found"
            });
        }
        else if(Number(otp) !== recentOtp[0].otp){
            return res.status(400).json({
                success:false,
                message:"Invalid Otp"
            });
        }

        //hash pashword
        const hashedPassword = await bcrypt.hash(password, 10);

        //create entry in db

        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth: null,
            about : null,
            contactNumber:null
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            // contactNumber,
            password:hashedPassword,
            accountType,
            additionalDetails:profileDetails._id,
            image:`http://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })

        //return res
        return res.status(200).json({
            success:true,
            message:`user is registered Successfully`,
            user
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"user cannot be registered. please try again"
        })
    }



}


//login

exports.login = async(req,res) => {
    try{
        //get data from req body
        const {email, password} = req.body;

        //validation on data
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:`All fields are required, plese try again`
            })
        }
        //user check exist or not
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User does not registered, plese signup first"
            })
        }
        //generate JWT, after password matching
        if(await bcrypt.compare(password, user.password)){
            
            const payload = {
                email : user.email,
                id:user._id,
                accountType:user.accountType
            }
            
            const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:"2h"});
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly : true,
            }
            //create cookie and send response
            res.cookie("token", token, options).status(200).json({
                success:true,
                token,
                user
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:'Password is incorrect'
            })
        }
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"login failur"
        })
    }
}


//changePassword

exports.changePassword = async (req, res) => {
    try{
        
        //get data from request body
        const {email}=req.body;

        //get oldPassword, newPassword, confirm newPassword,
        const {oldPassword, newPassword, confirmNewPassword} = req.body;

        //validation
        //const passwordExist = await User.findOne({oldPassword});
        if(newPassword !== confirmNewPassword){
            return res.status(400).json({
                success:false,
                message:"new password and confirm new password fields do not match"
            })
        }

        //update pwd in DB
        const setNewPassword = await User.updateOne({password:oldPassword}, { $set : { password : newPassword}});
        if(!setNewPassword){
            return res.status(403).json({
                success:false,
                message:"old password does not found"
            })
        }

        //return response
        return res.status(500).json({
            success:true,
            message:"password changed successfully"
        })
    }
    catch(err){
        console.log(err);
        res.status(400).json({
            success:false.value,
            message:"error while changing password"
        })
    }

    
}