import React from 'react';
import  {HighlightText}  from './HighlightText';
import know_your_progress from "../../../assets/Images/Know_your_progress.png";
import compare_with_others from "../../../assets/Images/Compare_with_others.png";
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png";
import { CTAButton } from './Button';

export const LearningLanguageSection = () => {
  return (
    <div className='mt-[130px]'>
        <div className='flex flex-col gap-5 w-11/12 items-center mx-auto'>

            <div className='text-4xl font-semibold text-center'>
                Your Swiss knife for 
                <HighlightText text={"learning any language"}></HighlightText>
            </div>

            <div className='text-center text-richblack-600 mx-auto text-base font-medium w-[70%]'>
            The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
            </div>

            <div className='flex flex-row items-center justify-center mt-5 '>
                <img src={know_your_progress} alt="know your progress" className='object-contain -mr-32'></img>
                <img src={compare_with_others} alt="compare_with_others" className='object-contain  '></img>
                <img src={plan_your_lesson} alt="plan_your_lesson " className='object-contain -ml-36'></img>
                
            </div>

            <div className='w-fit'>
                <CTAButton active ={true} linkto={"/signup"}>
                    <div>
                        Learn More
                    </div>
                </CTAButton>
            </div>
        </div>
    </div>
  )
}
