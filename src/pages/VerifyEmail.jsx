import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { sendOtp } from '../services/operations/authAPI'
import { signup } from '../services/operations/authAPI'
import  OTPInput from "otp-input-react";



const VerifyEmail = () => {
    const {loading, signupData} = useSelector((state) => state.auth);
    const [otp, setOtp] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
        if(!signupData){
            navigate("/signup");
        }
    }, [])
    

    const submitHandler = (e) => {
        e.preventDefault();
        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        } = signupData;
        dispatch(signup(
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
            navigate
        ));
    }

  return (
    <div>
        {
            loading ? (
                <div>Loading...</div>
            ) : (
                <div className='text-richblack-5'>
                    <h1>Verify Email</h1>
                    <p>A verification code has been sent to you. Enter the code below</p>
                    <form onSubmit={submitHandler}>
                        <OTPInput value={otp} onChange={setOtp} autoFocus OTPLength={6} otpType="number" disabled={false} secure />
                        {/* <ResendOTP onResendClick={() => console.log("Resend clicked")} /> */}
                        <button type='submit'>Verify Email</button>
                    </form>
                    <Link to="/signup">Back to Sign up</Link>
                    <button
                        onClick={()=>dispatch(sendOtp(signupData.email, navigate))}
                    >Resend it</button>
                </div>
            )
        }
    </div>
  )
}

export default VerifyEmail