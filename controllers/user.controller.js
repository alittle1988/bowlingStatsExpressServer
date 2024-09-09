import User from "../models/user.model.js";
import mongoose from "mongoose";

export const getUsers = async (req, res) => {
  try {
    const user = await User.find({});
    // find a way to remove password from sending back to user
    console.log(user);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log("error in fetching Users:", error.message);
    res.status(500).json({ success: false, message: "Server Error " });
  }
};

export const getUser = async (req, res) => {
  const { password } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "User does not exist!" });
  }
  try {
    const user = await User.findById(id);
    if (user.password === password) {
      res.status(200).json({ success: true, data: user });
    } else {
      res.status(401).json({ success: false, message: "Invalid Password" });
    }
  } catch (error) {
    console.log("error in fetching User:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createUser = async (req, res) => {
  const user = req.body;

  if (!user.userName || !user.firstName || !user.lastName || !user.password) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }
  const newUser = new User(user);

  try {
    await newUser.save();
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    console.error("Error in Create User:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid User Id" });
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "User deleted" });
  } catch (error) {
    console.error("error in deleting prodcut:", error.message);
    res.status(404).json({ success: false, message: "Product not found" });
  }
};
