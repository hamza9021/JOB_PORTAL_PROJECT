import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirement,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;

    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirement ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const job = await Job.create({
      title,
      description,
      requirement: requirement.split(","),
      salary,
      location,
      jobType,
      experience,
      position,
      createdBy: userId,
      company: companyId,
      experienceLevel: experience,
    });

    return res
      .status(201)
      .json({ job, message: "Job created successfully", success: true });
  } catch (err) {
    console.log(err);
  }
};






export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query).populate('company').sort({ createdAt: -1 });

    if (!jobs) {
      return res.status(404).json({ message: "No jobs found", success: false });
    }

    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};





export const getJobById = async (req, res) => {
  const jobId = req.params.id;
  const job = await Job.findById(jobId).populate('company');

  if (!job) {
    return res.status(404).json({ message: "Job not found", success: false });
  }

  return res.status(200).json({ job, success: true });
};






export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;

    const jobs = await Job.find({ createdBy: adminId });

    if (!jobs) {
      return res.status(404).json({ message: "No jobs found", success: false });
    }

    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
