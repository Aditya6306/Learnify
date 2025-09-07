import React from 'react';
import { CTAButton } from './Button';
import { HighlightText } from './HighlightText';
import { FaArrowRight } from "react-icons/fa";
import {TypeAnimation} from 'react-type-animation'


export const CodeBlocks = ({
    position, heading, subheading, ctabutton1, ctabutton2, codeblock, backgroundGradient, codeColor
}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10`}>

        {/* section 1 */}
        <div className='w-[50%] flex flex-col gap-8'>
            {heading}
            <div className='text-richblack-300 font-bold '>
                {subheading} 
            </div>

            <div className='flex flex-row'>
                <CTAButton active={ctabutton1.active} linkto={ctabutton1.linkto}>
                    <div className='flex flex-row gap-2 items-center'>
                        {ctabutton1.btnText}
                        <FaArrowRight/>
                    </div>
                </CTAButton>
                <CTAButton active={ctabutton2.active} linkto={ctabutton2.linkto}>
                    
                        {ctabutton1.btnText}
                        
                    
                </CTAButton>
            </div>

            
        </div>

        {/* Section 2 */}

        <div className='h-fit flex flex-row text-[10px] w-[50%] border border-white py-4 lg:w-[500px]'>
                <div className='text-center flex flex-col  w-[10%]  text-richblack-400 font-inter font-bold text-[16px]'>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                </div>

                <div className={`w-[90%] flex flex-col gap-2 font-bold  ${codeColor} pr-2 font-inter text-[16px]`}>
                    <TypeAnimation 
                        sequence = {[codeblock, 2000, ""]}
                        // speed={70}
                        repeat= {Infinity}
                        cursor={true}
                        style={
                            {
                                whiteSpace:"pre-line",
                                display:"block"
                            }
                        }
                        omitDeletionAnimation={true}
                    >
                        
                    </TypeAnimation>
                </div>
            </div>

    </div>
  )
}
