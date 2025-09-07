const Category = require("../models/Category");

exports.createCategory = async(req,res) => {
    try{
        //fetch data
        const {name, description} = req.body;
        
        //validate data
        if(!name || !description){
            return res.status(500).json({
                success:true,
                messge:'All fields are required'
            })
        }

        //create entry in DB
        const categoryDetails = await Category.create({
            name:name,
            description:description
        })
        console.log(categoryDetails);
        return res.status(200).json({
            success:true,
            messge:'Tag created successfully'
        })

    }
    catch(err){
        return res.status(500).json({
            success:false,
            messge:err.message
        })
    }    
}


//get All tags handler function 

exports.showAllCategory = async(req,res) => {
    try{
        const allCategory = await Category.find({}, {name:true, description:true});
        return res.status(200).json({
            success:true,
            messge:"All tags returned successfully",
            allCategory
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            messge:err.message
        })
    }
}

//category page details

exports.categoryPageDetails = async(req,res) => {
    try{
        //get category Id
        const {categoryId} =req.body;

        //get courses for specified category
        const selectedCategory = await Category.findById(categoryId).populate("coursses").exec();
        //validation
        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                messge:'data not found'
            })
        }
        //get courses for different categories
        const differentCategories = await Category.find({
            _id:{$ne:categoryId}
        }).populate("courses").exec();
        //get top selling courses -> HW
        //return response
        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differentCategories,
            },
            
            messge:"All categories returned successfully",
            
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            messge:err.message
        })
    }
}