const mongoose = require("mongoose");
require("dotenv").config();


exports.dbconnect = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => {console.log("db connected successfully")})
    .catch((err)=>{
        console.log("db connection fail");
        console.error(err);
        process.exit(1);
    })
}