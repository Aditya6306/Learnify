const RatingAndReview = require("../models/ratingAndReviews");
const Course = require("../models/Course");
const { trusted } = require("mongoose");

//createRating
exports.createRating = async(req,res) => {
    try{
        //get userid
        const userId = req.user.id;
        //fetch data from req body
        const {rating , review, courseId} =req.body;
        //check if user is enrolled or not 
        const courseDetails = await Course.findOne(
            {_id:courseId , studentEnrolled:{
                $eleMatch: {$eq: userId}
            }}

        );
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:'Student is not enrolled in this course'
            })
        }
        //check if user already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne({
            user:userId,
            course:courseId
        })
        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:'user already reviewed the course'
            }) 
        }
        //create rating and reviews
        const ratingReview = await RatingAndReview.create({
            rating, review, course:courseId,
            user:userId
        });

        //update the course with rating/review
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},
            {
                $push: {
                    ratingAndReviews: ratingReview._id
                }
            },
            {new:true}
        )
        console.log(updatedCourseDetails);

        //return response
        return res.status(200).json({
            success:true,
            message:'Rating and review created successfully',
            ratingReview
        })
    }
    catch(err){
        console.log(err);
        return res.status(404).json({
            success:false,
            message:'Something went wrong while creating Rating and review'
        })
    }
}

//get Average Rating
exports.getAverageRating = async(req,res) => {
    try{
        //get Course Id
        const courseId = req.body.courseId;
        //calculate Average Rating
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId)
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg : "$rating"}
                }
            }
        ])
        // return response
        if(result.length > 0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating
            })
        }

        //if no rating/review exist
        return res.status(200).json({
            success:true,
            message:"average rating is 0, no rating given till now",
            averageRating:0
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while Average Rating and review'
        })
    }
}

//getAllRating

exports.getAllRating = async(req,res) => {
    try{
        const allReviews = await RatingAndReview.find({}).sort({rating:"desc"})
        .populate({
            path:"user",
            select:"firstName lastName email image"
        })
        .populate({
            path:"course",
            select:"courseName"
        })
        .exec();

        return res.status(200).json({
            success:true,
            message:"all reviews fetched successfully"
            
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while getting Rating and review'
        })
    }
}