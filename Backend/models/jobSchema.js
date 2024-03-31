const mongoose =require("mongoose");
const jobSchema=  mongoose.Schema({
    title: {
        type: String,
        required: [true, "please provide a title."],
        minLength: [3, "title must contain at least 3 Characters"],
        maxLength: [30, "title cannot exceed 30 Characters"],
      },
      description: {
        type: String,
        required: [true, "Please provide decription."],
        minLength: [30, "description must contain at least 30 Characters"],
        maxLength: [500, "description cannot exceed 500 Characters"],
      },
      category: {
        type: String,
        required: [true, "Please provide a category."],
      },
      country: {
        type: String,
        required: [true, "Please provide a country name."],
      },
      city: {
        type: String,
        required: [true, "Please provide a city name."],
      },
      location: {
        type: String,
        required: [true, "Please provide location."],
        minLength: [20, "Location must contian at least 20 characters!"],
      },
      fixedSalary: {
        type: Number,
        minLength: [4, "Salary must contain at least 4 digits"],
        maxLength: [9, "Salary cannot exceed 9 digits"],
      },
      salaryFrom: {
        type: Number,
        minLength: [4, "Salary must contain at least 4 digits"],
        maxLength: [9, "Salary cannot exceed 9 digits"],
      },
      salaryTo: {
        type: Number,
        minLength: [4, "Salary must contain at least 4 digits"],
        maxLength: [9, "Salary cannot exceed 9 digits"],
      },
      expired: {
        type: Boolean,
        default: false,
      },
      jobPostedOn: {
        type: Date,
        default: Date.now,
      },
      postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
})
module.exports= mongoose.model("Job",jobSchema);