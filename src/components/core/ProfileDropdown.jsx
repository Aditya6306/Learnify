import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import Dashboard from '../../pages/Dashboard'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { useDispatch } from 'react-redux'
import { logout } from '../../services/operations/authAPI'



export const ProfileDropdown = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const {user} = useSelector((state)=>state.profile)
  const ref = useRef(null)
  const [open, setOpen] = useState(false);
  useOnClickOutside(ref, ()=>setOpen(false));

  if(!user){
      console.log("No user found......");
      return null;
  } 
  
  return (

    <button className="relative text-richblack-5"  onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-1">
          <img
            className="aspect-square w-[30px] rounded-full object-cover"
            src={user?.image}>
          </img>
          <IoMdArrowDropdownCircle className="text-sm text-richblack-100" />
          
        </div>
        {
          open && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
              ref={ref}>
                <Link to="/dashboard/my-profile">Dashboard</Link>

                <div onClick={()=>{
                  setOpen(false)
                  dispatch(logout(navigate))
                }}
                >logout</div>
              
              
            </div>
          )
        }
    </button>
    
  )
}
