const {catchAsyncError} = require("./catchAsyncError");
const { errorHandler } = require("../middlewares/error");
const Application = require("../models/applicationSchema");
const Job= require("../models/jobSchema");
const cloudinary = require("cloudinary");
exports.employerGetAllApplications= catchAsyncError(async(req,res,next)=>{
      const {role}= req.user;
      if(role==="Job Seeker")
      {
        return next(new errorHandler("job seeker can not get the applications",400));
      }
      console.log("hey");
      const{_id} =req.user;
      const applications = await Application.find({'employerId.user':_id});
      res.status(200).json({
          success:true,
          applications
      });
})
exports.jobSeekerGetAllApplications= catchAsyncError(async(req,res,next)=>{
    const {role}= req.user;
    if(role==="Employer")
    {
      return next(new errorHandler("Employer can not get the applications",400));
    }
    const{_id} =req.user;
    const applications = await Application.find({'applicantId.user':_id});
    res.status(200).json({
        success:true,
        applications
    });
})
exports.jobSeekerDeleteApplication= catchAsyncError(async(req,res,next)=>{
    const {role}= req.user;
    if(role==="Employer")
    {
      return next(new errorHandler("Employer can not delete the application",400));
    }
    const {id} = req.params;
    console.log(id);
    const application = await Application.findById(id);
    if(!application)
          return next(new errorHandler("application is not found",400));
    await application.deleteOne();
          res.status(200).json({
              success:true,
              message:"application deleted successfully"
          })
})
exports.postApplication = catchAsyncError(async(req,res,next)=>{
    const {role}= req.user;
    if(role==="Employer")
    {
      return next(new errorHandler("Employer can not delete the application",400));
    }
    if(!req.files || Object.keys(req.files).length ===0)
    return next(new errorHandler("Resume file required",400));
  const {resume} = req.files;
 
  const allowedFormats = ["image/png","image/jpeg","image/webp"];
  if(!allowedFormats.includes(resume.mimetype))
           return next(new errorHandler("Invalid file type. please send resume in PNG , JPG or WEBP format",400));
  const cloudinaryResponse = await cloudinary.uploader.upload(
          resume.tempFilePath
  );
  if(!cloudinaryResponse || cloudinaryResponse.error)
     {
        console.error("Cloudinary Error",cloudinaryResponse.error ||" unknown cloudinary error");
        return next(new errorHandler("failed to upload resume",400));
     }
  const {name,email,coverLetter,phone,address,jobId}=req.body;
  const applicantId={
      user:req.user._id,
      role:"Job Seeker"
  }
  if(!jobId)
  return next(new errorHandler("job not found",400));
   const jobDetails= await Job.findById(jobId);
   if(!jobDetails)
       return next(new errorHandler("job not found",400));
      const employerId={
        user:jobDetails.postedBy,
        role:"Employer"
      }
   if(!name||!email||!coverLetter||!phone||!address||!applicantId||!employerId||!resume)
         return next(new errorHandler("please fill all field",400));
   
  
      const application = await Application.create({
        name,
        email,
        coverLetter,
        phone,
        address,
        resume:{
           public_id:cloudinaryResponse.public_id,
           url: cloudinaryResponse.secure_url
        },
        applicantId,
        employerId
       })
    res.status(200).json({
        success:true,
        message:"Application submitted",
        application
    });
    
  
})