const mongoose = require("mongoose");

const course = new mongoose.Schema({
    courseName:{
        type:String,

    },
    courseDescription:{
        type:String
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    whatYouWillLearn:{
        type:String
    },
    courseContent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section"
        }
    ],
    ratingAndReviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReviews"
        }
    ],
    price:{
        type:Number
    },
    thumbNail:{
        type:String,
    },
    tag:{
        type:[String],
        required:true
        
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    studentEnrolled: [{
        type : mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }]
});

module.exports = mongoose.model("Course", course);