
import React from 'react';
import { FaArrowRight } from "react-icons/fa";
import {Link } from "react-router-dom";
import { HighlightText } from '../components/core/HomePage/HighlightText';
import {CTAButton} from "../components/core/HomePage/Button";
import {CodeBlocks} from "../components/core/HomePage/codeBlocks";
import banner from "../assets/Images/banner.mp4";
import { TimelineSection } from '../components/core/HomePage/TimelineSection';
import { LearningLanguageSection } from '../components/core/HomePage/LearningLanguageSection';
import { InstructionSection } from '../components/core/HomePage/InstructionSection';
import { ExploreMore } from '../components/core/HomePage/ExploreMore';

export const Home = () => {
  return (
    <div >
        {/* section 1 */}
        <div className='relative mx-auto flex flex-col w-11/12 items-center text-white justify-between mt-16 p-1 max-w-maxContent'>
            
            <Link to={"/signup"}>
                <div className='group mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit'>
                    <div className='flex flex-row items-center rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900 gap-2'>                    
                        <p>Become an Instructor</p>
                        <FaArrowRight />
                    </div>
                </div>
                    
            </Link>

            <div className='text-center text-4xl font-semibold mt-7'>
                Empower Your Future with  
                <HighlightText text={"Coding Skills"} />
            </div >
            
            <div className='w-[90%] text-center text-lg font-bold text-richblack-300 mt-4'>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
            </div>

            <div className='flex flex-row gap-7 mt-8'>
                <CTAButton active={true} linkto={"/signup"}> 
                    Learn More
                </CTAButton>
                <CTAButton active={false} linkto={"/login"}>
                    Book a Demo
                </CTAButton>
            </div>

            <div className='shadow-blue-200 mx-3 my-12'>
                <video muted loop autoPlay>
                    <source src={banner} type="video/mp4"></source>
                </video>
            </div>

            {/* code section 1 */}

            <div>
                
                <CodeBlocks
                    position={"lg:flex-row "}
                    heading={<div className='text-4xl font-semibold'>
                        Unlock Your
                        <HighlightText text={"coding [potential]"}></HighlightText>
                        with our online courses
                    </div>}
                    subheading = {"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."} 
                    ctabutton1={
                        {btnText:"try it yourself",
                            linkto:"/signup",
                            active:true
                        }

                    }
                    ctabutton2={
                        {btnText:"try it yourself",
                            linkto:"/signup",
                            active:false
                        }

                    }
                    codeblock={
                        `<!DOCTYPE html>\n<html>\n<head>\n<title>Page Title</title>\n</head>\n<body>\n<h1>Heading</h1>\n<p>My first paragraph.</p>\n</body>\n</html>`
                    }
                    codeColor={`text-yellow-25`}
                >
                    
                </CodeBlocks>
            </div>

            {/* code section 2 */}

            <div>
                
                <CodeBlocks
                    position={"lg:flex-row-reverse "}
                    heading={<div className='text-4xl font-semibold'>
                        Unlock Your
                        <HighlightText text={"coding [potential]"}></HighlightText>
                        with our online courses
                    </div>}
                    subheading = {"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."} 
                    ctabutton1={
                        {btnText:"try it yourself",
                            linkto:"/signup",
                            active:true
                        }

                    }
                    ctabutton2={
                        {btnText:"try it yourself",
                            linkto:"/signup",
                            active:false
                        }

                    }
                    codeblock={
                        `<!DOCTYPE html>\n<html>\n<head>\n<title>Page Title</title>\n</head>\n<body>\n<h1>Heading</h1>\n<p>My first paragraph.</p>\n</body>\n</html>`                        
                    }
                    codeColor={`text-yellow-25`}
                >
                    
                </CodeBlocks>
            </div>

            <ExploreMore></ExploreMore>
            
        </div>
        

        {/* section 2 */}
        <div className='bg-pure-greys-5 text-richblack-700'>
            <div className='homepage_bg h-[310px]'>
                <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
                    <div className='h-[150px]'></div>
                    <div className='flex flex-row gap-7 text-white'>
                        
                        <CTAButton active={true} linkto={"/signup"}>
                        
                            <div className='flex items-center gap-3'>
                                Explore full Catalog
                                <FaArrowRight></FaArrowRight>
                            </div>
                        </CTAButton>
                        <CTAButton active={false} linkto={"/signup"}>
                        
                            <div className='flex items-center gap-3'>
                                Learn More
                                
                            </div>
                        </CTAButton>
                    </div>
                </div>
            </div>

            <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between'>
                    <div className='flex flex-row gap-5 mb-10 mt-[95px]'>
                        <div className='text-4xl font-semibold w-[45%] '>
                            Get the skills you need for a
                            <HighlightText text={"job that is in demand"}></HighlightText>
                        </div>

                        <div className='flex flex-col items-start gap-10 w-[40%]'>
                            <div className='text-[16px]'>
                            The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </div>
                            <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
                        </div>
                    </div>
            </div>

            <TimelineSection></TimelineSection>

            <LearningLanguageSection></LearningLanguageSection>
        </div>

        {/* section 3 */}
        <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white'>
                <InstructionSection></InstructionSection>

                <h2 className="text-center text-4xl font-semibold mt-10">Reviews from other learners</h2>
        </div>


        {/* section 4 */}
    </div>
  )
}

// export default Home;




