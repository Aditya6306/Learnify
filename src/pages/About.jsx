import React from 'react'
import {HighlightText} from '../components/core/HomePage/HighlightText'
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import Quote from '../components/core/About/Quote'
import FoundingStory from "../assets/Images/FoundingStory.png"
import StatsComponent from '../components/core/About/StatsComponent'
import LearningGrid  from '../components/core/About/LearningGrid'

export const About = () => {
  return (
    <div className='w-full text-white'>

        {/* Section 1 */}

        <section className='w-10/12 mx-auto '>
            <div className='flex flex-col items-center '>
                <header className='flex flex-col items-center justify-center  text-white mt-16 text-4xl w-8/12 '>
                    <p >Driving Innovation in Online Education for a</p>
                     
                    <HighlightText text={"Brighter Future"} />
                    <p className='text-2xl'>
                    Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                    </p>
                </header>
                <div className='flex justify-between mx-auto  '>
                    <img src={BannerImage1}></img>
                    <img src={BannerImage2}></img>
                    <img src={BannerImage3}></img>
                </div>
            </div>
        </section>
        {/* section 2 */}
        <section>
            <Quote />
        </section>

        {/* Section 3 */}

        <section>
            <div className='flex flex-col'>
                <div className='flex flex-row'>
                    <div className='flex flex-col'>
                        <h1>Our Founding Story</h1>
                        <p>
                            Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                        </p>
                        <p>
                            As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                        </p>
                    </div>
                    <div>
                        <img src={FoundingStory}></img>
                    </div>
                </div>
                <div className='flex flex-row'>
                    <div className='flex flex-col'>
                        <h1>Our Vision</h1>
                        <p>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                    </div>
                    <div className='flex flex-col'>
                        <HighlightText text={"Our Mission"}></HighlightText>
                        <p>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                    </div>
                </div>
            </div>
        </section>

        <StatsComponent></StatsComponent>

        <section>
            <LearningGrid></LearningGrid>
        </section>
    </div>
  )
}

