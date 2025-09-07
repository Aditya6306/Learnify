import React from 'react'
import { useDispatch, useSelector } from 'react-redux'; 
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';

export const ForgotPassword = () => {

    const {loading} =use
    Selector((state) => state.auth);
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent));

    }
  return (
    <div className='text-richblack-5'>
        {
            loading ? (
                <div >loading...</div>
            ) : (
                <div>
                    
                        <h1>
                            {
                                !emailSent ? "Reset your Password" : "Check Your Email"
                            }
                        </h1>
                        <p>
                            {
                                !emailSent ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : `We have sent the reset email to ${email}`
                            }
                        </p>

                        <form onSubmit={handleSubmit}>
                            {
                                !emailSent && (
                                    <label>
                                        <p>Email Address</p>
                                        <input
                                            required
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={(e)=>setEmail(e.target.value)}
                                            placeholder='Enter Your Email Address'
                                        ></input>
                                    </label>
                                )
                            }
                             <button type="submit">
                            {
                                !emailSent ? "Reset Password" : "Resend Email"
                            }
                            </button>
                        </form>

                        <div>
                            <Link to="/login">
                                <p>Back to Login</p>
                            </Link>
                        </div>

                       
                    
                </div>
            )
        }
    </div>
  )
}
