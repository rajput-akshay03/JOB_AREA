const {catchAsyncError}=require("../controllers/catchAsyncError");
const { errorHandler } = require("./error");
const jwt=require("jsonwebtoken");
const User = require("../models/userSchema");
const isAuthorized= catchAsyncError(async(req,res,next)=>{
      const { token } = await req.cookies;
      console.log(token);
      console.log('fjhf');
      if (!token) {
        return next(new errorHandler("User Not Authorized", 401));
      }
      const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
      req.user= await User.findById(decoded.id);
      next();
})
module.exports={isAuthorized};
