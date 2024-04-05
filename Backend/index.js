const express=require("express");
const app=express();
require("dotenv").config();
const cloudinary = require("./config/cloudinary");
const cookieParser=require("cookie-parser");
const fileUpload=require("express-fileupload");
const userRoutes=require("./routes/userRoutes");
const applicationRoutes=require("./routes/applicationRoutes");
const jobRoutes=require("./routes/jobRoutes");
const dbConnection =require("./database/dbConnection");
const {errorMiddleware}=require("./middlewares/error");
cloudinary.cloudinaryconnect();
const port=process.env.PORT;
const cors=require("cors");
dbConnection();
app.use(cors({
    // origin:[process.env.FRONTEND_URL],
    // methods:["GET","POST","DELETE","PUT"],
    // credentials:true
    origin:'https://job-area-nine.vercel.app/', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}));
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/temp/"
}));
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/application",applicationRoutes);
app.use("/api/v1/job",jobRoutes);
app.use(errorMiddleware);
app.listen(port,()=>{
    console.log(`running ${port}`);
})
