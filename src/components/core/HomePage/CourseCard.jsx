import React from 'react'

export const CourseCard = ({cardData, currentCard, setCurrentCard}) => {
  return (
    <div>
        <div className={`flex flex-col gap-5 px-3 py-5 ${currentCard === cardData?.heading ? "bg-white text-black" : "bg-richblack-800 text-white"}`} onClick={()=>setCurrentCard(cardData?.heading)}>
            <p>{cardData.heading}</p>

            <p>{cardData.description}</p>

            <div className='flex flex-row'>
                <p>{cardData.level}</p>
                <p>{cardData.lessonNumber}</p>
            </div>
        </div>
    </div>
  )
}
