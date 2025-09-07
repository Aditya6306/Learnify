const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
require("dotenv").config();

exports.createCourse = async (req,res) => {
    try{
        //fetch data
        const {courseName, courseDescription, whatYouWillLearn, price, category} = req.body;

        const thumbnail = req.files.thumbnailImage;

        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail){
            return res.status(400).json({
                success:false,
                message:'All fields are required'
            })
        }

        //check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor Details : ",instructorDetails);
        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:'Instructor Details not found'
            })
        }

        //check given tag is valid or not
        const categoryDetails = await Category.findById(category);
        
        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:'Category Details not found'
            })
        }

        if (!thumbnail.tempFilePath) {
            return res.status(400).json({
                success: false,
                message: "Thumbnail file is missing a temp path"
            });
        }
        
        

        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        console.log("categoryDetails found");

        //create an entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn,
            price,
            category:categoryDetails._id,
            thumbNail:thumbnailImage.secure_url
        })

        //add the new course to the user Schema of Instructor
        await User.findByIdAndUpdate({
            _id:instructorDetails._id
        },
        {
            $push:{
                courses:newCourse._id
            }
        },
        {new:true}
        )

        //update the tag schema


        return res.status(200).json({
            success:true,
            message:"Course created successfully",
            data:newCourse
        })
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"something went wrong while creating course"
        })
    }
}


//show all courses

exports.showAllCourses= async(req,res) => {
    try{
        const allCourses = await Course.find({} , 
            {   courseName:true,
                price:true,
                thumbnail:true,
                instructor:true,
                ratingAndReviews:true,
                studentsEnrolled:true
            }
        ).populate("instructor").exec();
        return res.status(200).json({
            success:true,
            message:"data for all courses fetched successfully",
            data:allCourses
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"something went wrong while fetching course"
        })
    }
}

//getCourseDetails

exports.getCourseDetails = async (req,res) =>{
    try{
        //get id
        const {courseId} = req.body;
        //find Course Details
        const courseDetails = await Course.find(
            {_id:courseId})
            .populate(
                {
                    path:"instructor",
                    populate:{
                        path:"additionalDetails"
                    }
                }
            )
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path:"courseContent",
                populate:{
                    path:"subSection"
                }
            })
            .exec();
        
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:`could not find the course with course id ${courseId}`
            })
        }
        return res.status(200).json({
            success:true,
            message:'Course Details fetched successfully',
            courseDetails
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"something went wrong while fetching course",
            error:err.message
        })
    }
}

