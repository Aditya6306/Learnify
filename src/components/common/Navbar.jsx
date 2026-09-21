import React, { useEffect, useState } from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link , useLocation, matchPath } from 'react-router-dom'
import {NavbarLinks} from "../../data/navbar-links"
import { BsChevronDown } from "react-icons/bs"
import { categories } from '../../services/apis'
import { apiConnector } from '../../services/apiconnector'

import {AiOutlineShoppingCart} from 'react-icons/ai'
import { ProfileDropdown } from '../core/ProfileDropdown'
import {useSelector} from 'react-redux'

export const Navbar = () => {

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const {totalItems} = useSelector((state) => state.cart);
    

    const [loading,setLoading] = useState(false);

    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname)
    }
    const [subLinks,setSubLinks] = useState([]);

    // console.log("printing from navbar....", user)
    // console.log("printing token from navbar....", localStorage.getItem("token"))
    // console.log("printing user from navbar....", localStorage.getItem("user"))

    const fetchSublinks = async() => {
           console.log("inside fetch sublinks.....................................");
           console.log(categories.CATEGORIES_API);

            setLoading(true);
            try{
                const res = await apiConnector("GET",categories.CATEGORIES_API);
                console.log("printing SubLinks", res);
                setSubLinks(res.data);
            }
            catch(err){
                console.log("could not fetch Categories.", err)
            }
            setLoading(false);
        
    }

    useEffect(()=>{
        fetchSublinks();
    },[])

  return (
    <div className='h-14  flex justify-center items-center border-b-[1px] border-b-richblack-700'>
        <div className=' w-11/12 flex justify-between items-center max-w-maxContent '>
            <Link to="/">
            <img src={logo} alt="Logo" width={160} height={32} loading="lazy"></img>
            </Link>

            <nav>
                <ul className='flex gap-x-6 text-richblack-25'>
                    {
                        NavbarLinks.map((link,index)=>(
                            <li key={index}>
                                {link.title === "Catalog" ? (
                                    <div className='relative flex items-center gap-1 group'>
                                        <p> {link.title}</p>
                                        <BsChevronDown />

                                        <div className='invisible absolute left- [50%] top-[50%] translate-x-[-50%] translate-y-[50%] lg:w-[300px] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100'>
                                        <div className='absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none bg-richblack-5'
                                             >
                                        </div>
                                        
                                        {
                                            (subLinks && subLinks.length) ? (
                                                subLinks.map((subLink, index) => (
                                                    <Link to={`${subLink.categoryId}`} key={index}>
                                                        <p>{subLink.categoryName}</p>
                                                    </Link>
                                                ))
                                            ) : (
                                                <div></div>
                                            )
                                        }

                                        
                                        </div>

                                    </div> 
                                    // <div className={`flex flex-col relative group cursor-pointer items-center gap-1 ${matchRoute("/catalog/:catalogName") ? "text-yellow-25" : "text-richblack-25"}`}>
                                    //     <div className='flex'>
                                    //     {link.title}
                                    //     <BsChevronDown />
                                    //     </div>
                                        
                                    //     <div className='invisible absolue left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-hover:translate-y-[1.65em] lg:w-[300px]'>
                                    //         <div className='absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none bg-richblack-5'
                                    //         >
                                    //         </div>

                                    //         {/* {
                                    //             loading ? (
                                    //                 <p className='text-center'>Loading...</p>
                                    //             ) : (subLinks && subLinks.length) ? (
                                    //                 {subLinks?.filter}
                                    //             ) : ()
                                    //         } */}
                                    //     </div>
                                    // </div>
                                ) 
                                : (
                                    <Link to={link.path}>
                                        <p className={`${
                                            matchRoute(link.path) ? "text-yellow-25" : "text-richblack-25"
                                        }`}>
                                            {link.title}
                                        </p>
                                    </Link>
                                )}
                            </li>
                        ))
                    }
                </ul>
            </nav>


            {/* Login/signup/dashboard  */}
            <div className=' items-center gap-x-4 flex'>
                     {
                        user && user?.accountType != "Instructor" && (
                            <Link to="/dashboard/cart" className='relative'>
                                <AiOutlineShoppingCart />
                                {
                                    totalItems > 0 && (
                                        <span>
                                            {
                                                totalItems
                                            }
                                        </span>
                                    )
                                }
                            </Link>
                        )
                     }
                     {
                        token === null && (
                            
                           <Link to="/login">
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md '>
                                Log in
                                </button>
                                
                           </Link>
                           
                        )
                     }
                     {
                        token === null && (
                           <Link to="/signup">
                                <button  className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md '>
                                    Sign Up
                                </button>
                           </Link>
                        )
                     }
                     {
                        token !== null && (
                            
                            <ProfileDropdown />
                        )
                     }

            </div>

        </div>
    </div>
  )
}
