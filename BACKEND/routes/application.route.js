import express from "express";
import {applyJob,getAppliedJobs,getApplicant,updateStatus} from "../controllers/application.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";


const router = express.Router();


//Apply for a job
router.route("/apply/:id").get(isAuthenticated,applyJob);
router.route("/appliedJobs").get(isAuthenticated,getAppliedJobs);
router.route("/:id/applicant").get(isAuthenticated,getApplicant);
router.route("/status/:id/update").put(isAuthenticated,updateStatus);


export default router;