const {catchAsyncError}=require("../controllers/catchAsyncError");
const {errorHandler}=require("../middlewares/error");
const User = require("../models/userSchema");
const {sendToken}=require("../utils/jwtToken");
exports.register = catchAsyncError(
    async(req,res,next)=>{
            console.log("akshay");
            const {name,email,phone,role,password}=req.body;
            if(!name||!email||!phone||!role||!password){
                 return next(new errorHandler("please fill form completely"));
            }
            
            const isEmail = await User.findOne({email});
            if(isEmail)
            return next(new errorHandler("email already exist"));
            const user= await User.create({
              name,
              email,
              phone,
              role,
              password
            });
           sendToken(user,200,res,"User registerd successfully");
}
) 
exports.login= catchAsyncError(
     async(req,res,next)=>{
          const {email,password,role}=req.body;
          if(!email|| !password|| !role)
          {
               return next(new errorHandler("please provide email,password,role",400));
          }
          const user=await User.findOne({email}).select("+password");
          if(!user)
          {
               return next(new errorHandler("invalid email or password",400));
          }
          const isPasswordMatched= await user.comparePassword(password);
          if(!isPasswordMatched)
          {
               return next(new errorHandler("invalid email or password",400));
          }
          if(user.role!==role)
          {
               return next(new errorHandler("no user with this role",400));
          }
          sendToken(user,200,res,"User logged in successfully");

     }
)
exports.logout= catchAsyncError(
       async(req,res,next)=>{
              res.status(201).cookie("token","",{
                 httpOnly:true,
                 expires: new Date(Date.now())
              }).json({
                 success:true,
                 message:"User logged out successfully"
              })
       }
)
exports.getUser = catchAsyncError(
     async(req,res,next)=>{
           const user= req.user;
           res.status(200).json({
               success:true,
               user
           })
     }
) 