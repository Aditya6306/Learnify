const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async(req,res) => {
    try{
        //fetch data
        const {sectionName, courseId} =req.body;

        //data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:'Missing properties'
            })
        }
        //create Section
        const newSection = await Section.create({sectionName});

        //update course with section objectId
        const updatedCourse= await Course.findByIdAndUpdate(courseId, {$push:{courseContent:newSection._id}},
            {new:true}
        )
        //return response
        return res.status(200).json({
            success:true,
            message:'Section created successfully',
            updatedCourse
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"something went wrong while creating Section",
            error:err.message
        })
    }
}

//Update Section

exports.updateSection = async(req,res) => {
    try{
        //data input
        const {sectionName, sectionId} = req.body;

        //data validation
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:'Missing properties'
            })
        }

        //update data
        const section = await Section.findByIdAndUpdate(sectionId, {sectionId}, {new:true})

        //return response
        return res.status(200).json({
            success:true,
            message:'Section updated successfully'
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"something went wrong while updating Section",
            error:err.message
        })
    }
}


//delete section 

exports.deleteSection = async(req, res) => {
    try{
        // get id - assuming that we are sending id in params
        const {sectionId} = req.params;
        //use findByIdAnddelete
        await Section.findByIdAndDelete(sectionId);

        //return response
        return res.status(200).json({
            success:true,
            message:'Section deleted successfully'
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"something went wrong while deleting Section",
            error:err.message
        })
    }
}