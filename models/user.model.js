import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    sessions: {
      type: Array,
      required: true,
    },
    hand: {
      type: String,
      required: false,
    },
    goalAvg: {
      type: Number,
      required: false,
    },
    ballWeight: {
      type: Number,
      required: false,
    },
    gamesPlayed: {
      type: Number,
      required: false,
    },
    profileImg: {
      type: String,
      required: false,
    },
    average: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("user", userSchema);

export default User;
