const express = require("express");
const router = express.Router();

const {
    createCourse,
    showAllCourses,
    getCourseDetails
} = require("../controllers/Course");

const {auth, isInstructor, isStudent, isAdmin} = require("../middlewares/auth");

const {
    createCategory, showAllCategory, categoryPageDetails
} = require("../controllers/Category");

const {
    createRating, getAllRating, getAverageRating
} = require("../controllers/RatingAndReview");

const {createSection, updateSection , deleteSection} = require("../controllers/Section");

const {createSubSection} = require("../controllers/SubSection");




router.post("/createCourse", auth, isInstructor, createCourse);
router.get("/showAllCourses",   showAllCourses);
router.get("/courseDetails",  getCourseDetails);
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategory", showAllCategory);
router.get("/categoryPageDetails", auth, categoryPageDetails);
router.post("/createRating", auth, isStudent,  createRating);
router.get("/getAllRating", getAllRating);
router.get("/getAverageRating", getAverageRating);
router.post("/createSection", auth, isInstructor, createSection);
router.put("/updateSection", auth, isInstructor, updateSection);
router.delete("/deleteSection", auth, isInstructor, deleteSection);
router.post("/createSubSection", auth, isInstructor, createSubSection);

module.exports = router;