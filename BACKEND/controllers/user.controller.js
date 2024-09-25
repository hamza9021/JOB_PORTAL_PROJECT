import { User } from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullName, email, password, role, phoneNumber } = req.body;
    if (!fullName || !email || !password || !role) {
      return res.status(400).json({
        message: "All Fields Should Be Filled",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({
        message: "User already exists with this email",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullName,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      message: "Account Created Successfully",
      success: true,
    });
  } catch (e) {
    console.log(e.message);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "All Fields Should Be Filled",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Incorrect Email Or Password",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(404).json({
        message: "Incorrect Email Or Password",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(404).json({
        message: "Account Does Not Exist With Current Role",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome Back ${user.fullName}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logout Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    let skillsArray = [];
    if (skills) {
      skillsArray = skills.split(",");
    }

    const userId = req.id; // MIDDLEWARE AUTHENTICATION

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Update user properties if provided
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    await user.save();

    const updatedUser = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile Updated Successfully",
      user: updatedUser,
      success: true,
    });
  } catch (error) {
    console.error("Error updating profile:", error.message);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
