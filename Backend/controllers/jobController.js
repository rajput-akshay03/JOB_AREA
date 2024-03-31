const {catchAsyncError} = require("./catchAsyncError");
const Job= require("../models/jobSchema");
const { errorHandler } = require("../middlewares/error");
exports.getAllJobs= catchAsyncError(async(req,res,next)=>{
       const jobs= await Job.find({expired:false});
       res.status(200).json({
          success:true,
          jobs
       })
}
)
exports.postJob = catchAsyncError(async(req,res,next)=>{
       const {role} = req.user;
       if(role=== "Job Seeker")
            return next(new errorHandler("job seeker can not post the job",400));
       const {title,description,country,category,city,location,fixedSalary,salaryFrom,salaryTo}= req.body;
       if(!title||!description||!country||!category||!city||!location)
            return next(new errorHandler("please provide full details",400));
       if((!salaryFrom ||! salaryTo)&& !fixedSalary)
            return next(new errorHandler("please provide salary details",400));
       if(salaryFrom && salaryTo && fixedSalary)
            return next(new errorHandler("can not take fixed salary and range salary at same time",400));
        const postedBy= req.user._id;
       const job = await Job.create({
        title,description,country,category,city,location,fixedSalary,salaryFrom,salaryTo,postedBy
       });
       res.status(200).json({
          success:true,
          message:"job posted successfully",
          job
       })
})

exports.getmyJobs = catchAsyncError(async(req,res,next)=>{
          const {role}=req.user;
          if(role=== "Job Seeker")
            return next(new errorHandler("job seeker is not allowed to access this resource",400));
          const myJobs= await Job.find({postedBy:req.user._id});
          res.status(200).json({
             success:true,
             myJobs
          });
})
exports.updateJob = catchAsyncError(async(req,res,next)=>{
    const {role}=req.user;
    if(role=== "Job Seeker")
    return next(new errorHandler("job seeker is not allowed to access this resource",400));
    const {id}=  req.params;
    let job = await Job.findById(id);
    if(!job)
    {
        return next(new errorHandler("Oops,job not found",400)); 
    }
    job = await Job.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        success:true,
        job,
        message:"job updated successfully"
     });
})
exports.deleteJob= catchAsyncError(async(req,res,next)=>{
    const {role}=req.user;
    if(role=== "Job Seeker")
    return next(new errorHandler("job seeker is not allowed to access this resource",400));
    const {id}=  req.params;
    let job = await Job.findById(id);
    if(!job)
        return next(new errorHandler("Oops,job not found",400)); 
    await job.deleteOne();
    res.status(200).json({
        success:true,
        message:"job deleted successfully"
    })
}
)
exports.getSingleJob = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    try {
      const job = await Job.findById(id);
      if (!job) {
        return next(new errorHandler("Job not found.", 404));
      }
      res.status(200).json({
        success: true,
        job,
      });
    } catch (error) {
      return next(new errorHandler(`Invalid ID / CastError`, 404));
    }
  });