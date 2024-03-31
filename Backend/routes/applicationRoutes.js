const express=require("express");
const { jobSeekerDeleteApplication, jobSeekerGetAllApplications, employerGetAllApplications, postApplication } = require("../controllers/applicationController");
const { isAuthorized } = require("../middlewares/auth");
const router=express.Router();
router.get("/jobseeker/getall",isAuthorized,jobSeekerGetAllApplications);
router.get("/employer/getall",isAuthorized,employerGetAllApplications);
router.post("/delete/:id",isAuthorized,jobSeekerDeleteApplication);
router.post("/post",isAuthorized,postApplication);

module.exports=router;
