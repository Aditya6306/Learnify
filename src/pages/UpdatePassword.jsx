import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { resetPassword } from '../services/operations/authAPI';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const UpdatePassword = () => {

    const {loading} = useSelector( (state) => state.auth);
    const [showPassword, setShowPassword] = useState(false); 
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
    const dispatch = useDispatch();
    const location = useLocation();
    const [formData, setFormData] = useState({
        password:"",
        confirmPassword:""
    })

    const {password, confirmPassword} = formData;

    const handleOnChange =(e) => {
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name] : e.target.value
            }
        ))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password, confirmPassword, token));
    }

  return (
    <div>
        {
            loading ? (
                <div>
                    Loading...
                </div>
            ) : (
                <div className='text-richblue-5'>
                    <h1 className=''>Choose new Password</h1>
                    <p>Almost done, Enter your password and you are all set.</p>
                    <form onSubmit={handleOnSubmit}>
                        <label>
                            <p>New Password</p>
                            <input
                                required
                                type = {showPassword ? "text" : "password"}
                                name = 'password'
                                value={password}
                                onChange = {handleOnChange}
                                placeholder='password'
                            />
                            <span onClick={()=>setShowPassword((prev) => !prev)}>
                                {
                                    showPassword ? (
                                        <IoMdEyeOff fonSize={24} />
                                    ) : (
                                        <IoEye />
                                    )
                                }
                            </span>
                        </label>

                        <label>
                            <p>Confirm New Password</p>
                            <input
                                required
                                type = {showConfirmPassword ? "text" : "password"}
                                name = 'confirmPassword'
                                value={confirmPassword}
                                onChange = {handleOnChange}
                                placeholder='confirm password'
                            />
                            <span onClick={()=>setShowConfirmPassword((prev) => !prev)}>
                                {
                                    showConfirmPassword ? (
                                        <IoMdEyeOff fontSize={24} />
                                    ) : (
                                        <IoEye />
                                    )
                                }
                            </span>
                        </label>
                        <button type='submit'>
                            Reset Password
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

export default UpdatePassword