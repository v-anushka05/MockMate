import mongoose from "mongoose"

const InterviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  interviewerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Interviewer",
    required: true,
  },
  subject: {
    type: String,
    enum: ["dsa", "os", "hr", "dbms"],
    required: true,
  },
  scheduledDate: {
    type: Date,
    required: true,
  },
  scheduledTime: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["scheduled", "completed", "cancelled", "no-show"],
    default: "scheduled",
  },
  meetingLink: {
    type: String,
    required: true,
  },
  feedback: {
    overall: String,
    strengths: [String],
    improvements: [String],
    score: {
      type: Number,
      min: 0,
      max: 100,
    },
    categories: [
      {
        name: String,
        score: {
          type: Number,
          min: 0,
          max: 10,
        },
      },
    ],
  },
  notes: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Interview || mongoose.model("Interview", InterviewSchema)
