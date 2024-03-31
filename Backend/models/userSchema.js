const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const userSchema=mongoose.Schema({
     name:{
        type:String,
        required:[true,"must provide your name"],
        minLength:[3,"must contain 3 characters"],
        maxLenght:[30,"must contain 30 characters"]
       },
     email:{
         type:String,
         required:[true,"must provide email"],
         validate:[validator.isEmail,"please provide valid email"]
     },
     phone:{
        type:Number,
        required:[true,"pls provide mobile number"]
     },
     password:{
        type:String,
        required:[true,"please provide your password"],
        minLength:[8,"must contain 8 characters"],
        maxLenght:[32,"must contain 32 characters"],
        select:false
     },
     role:{
        type:String,
        required:[true,"please provide your role"],
        enum:["Job Seeker","Employer"]
     },
     createdAt:{
        type:Date,
        default:Date.now(),
     }
});

// password hashing
userSchema.pre("save",async function(next){
     if(!this.isModified("password"))
          next();
     this.password=await bcrypt.hash(this.password,10);
})

// password comparing
userSchema.methods.comparePassword=async function(enteredPassword){
     return await bcrypt.compare(enteredPassword,this.password);
}

// generating jwt token
userSchema.methods.getJwtToken=function(){
   return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{ 
         expiresIn: process.env.JWT_EXPIRE
      });
}
 
module.exports= mongoose.model("User",userSchema);

