import mongoose from "mongoose";
import getISTTime from "../utils/getISTTime.utils.js";

const userSchema = new mongoose.Schema({

  username: {
    type: String,
    unique: true,
   required:true
  },
  fullname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"]
  },
  profilePic: {
    type: String,
    default: ""
  },
  lastlogin: {
    type: Date,
    default: Date.now()
  },
  resetPasswordToken: String,
  resetTokenExpiresAt: Date,
  
}, {
  timestamps: { currentTime: getISTTime }
});

export const User = mongoose.model("User", userSchema);
