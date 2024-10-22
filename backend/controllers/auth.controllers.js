
import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.utils.js";
import {
  sendForgotPasswordEmail,
  sendResetPasswordEmail,
  sendVerifyEmail,
  sendWelcomeEmail,
} from "../utils/mailer.utils.js";

export const signin = async (req, res) => {
  const { username, password } = req.body;

  // Ensure all required fields are provided
  if (!username || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid Credentials" });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: "Invalid Credentials" });
    }

    // Token generation and last login update
    generateTokenAndSetCookie(user._id, res);
    user.lastlogin = Date.now();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ success: false, message: "Login failed", error: error.message });
  }
};

export const signup = async (req, res) => {
  const { fullname, username, password, gender } = req.body;

  // Ensure all required fields are provided
  if (!username || !fullname || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    // Check if user exists
    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.status(400).json({ success: false, message: "Username already exists" });
    }

    const avatarLink = gender === "male"
      ? `https://avatar.iran.liara.run/public/boy?username=${username}`
      : `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = new User({
      fullname,
      username,
      gender,
      profilePic: avatarLink,
      password: hashedPassword,
    });

    await user.save();

    // Generate token and set cookie (if applicable)
    generateTokenAndSetCookie(user._id, res);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: { ...user._doc, password: undefined }, // Don't send back password
    });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ success: false, message: "Signup failed", error: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    const resetPasswordToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;
    user.resetPasswordToken = resetPasswordToken;
    user.resetTokenExpiresAt = resetTokenExpiresAt;

    await user.save();
    
    const data = {
      fullname: user.fullname,
      email: user.email,
      reseturi: `${process.env.CLIENT_URI}/reset-password/${resetPasswordToken}`,
    };

    await sendForgotPasswordEmail(data);

    return res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error sending reset password link",
      error: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid token or token expired" });
    }

    user.password = await bcryptjs.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetTokenExpiresAt = undefined;

    await user.save();
    
    const data = {
      fullname: user.fullname,
      email: user.email,
    };

    await sendResetPasswordEmail(data);

    return res.status(200).json({ success: true, message: "Password reset successful" });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error resetting password",
      error: error.message,
    });
  }
};

export const checkAuth = async (req, res) => {
  const userId = req.userId; 
  try {
    const user = await User.findById(userId); 

    // console.log(user);

    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    return res.status(200).json({
      success: true,
      message: "User authorized",
      user: { ...user._doc, password: undefined },  
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "Server error", error });
  }
};



export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfuly" });
};