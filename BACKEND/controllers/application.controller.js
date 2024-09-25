import {Application} from "../models/application.model.js";
import {Job} from "../models/job.model.js";


export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const { id: jobId } = req.params;
    if (!jobId) {
      return res
        .status(400)
        .json({ message: "Job Id is required", success: false });
    }

    const existingApplication = await Application.findOne({ job: jobId });
    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).json({ message: "Job not found", success: false });
    }
    const newApplication = await Application.create({
      applicant: userId,
      job: jobId,
      status: "pending",
    });

    job.applications.push(newApplication._id);
    await job.save();
 
    return res.status(200).json({
      message: "Application submitted successfully",
      success: true,
      newApplication,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;

    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });

    if (!application) {
      return res
        .status(400)
        .json({ message: "No application found", success: false });
    }

    return res.status(200).json({ success: true, application });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getApplicant = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
        options: { sort: { createdAt: -1 } },
      },
    });

    if (!job) {
      return res.status(400).json({ message: "No job found", success: false });
    }
    return res.status(200).json({ success: true, job });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicantId = req.params.id;
    if (!status) {
      return res
        .status(400)
        .json({ message: "Please provide status", success: false });
    }
    const application = await Application.findById(applicantId);
    if (!application) {
      return res
        .status(400)
        .json({ message: "No application found", success: false });
    }
    application.status = status.toLowerCase();
    await application.save();

    return res
      .status(200)
      .json({ message: "Application status updated", success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
