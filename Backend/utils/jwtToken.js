const sendToken = (user,statusCode,res,message)=>{
      console.log(`user is ${user}`);
       const token = user.getJwtToken();
       const options={
         expires: new Date(
            Date.now()+process.env.COOKIE_EXPIRE*24*60*60*1000
         ),
        //  httpOnly:true,
         secure:false
       }
       res.status(statusCode).cookie("token",token,options).json({
           success:true,
           user,
           message,
           token
       })
}
module.exports={sendToken};