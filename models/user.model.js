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
    games: {
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
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("user", userSchema);

export default User;
