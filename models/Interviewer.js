import mongoose from "mongoose"

const InterviewerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  company: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  expertise: [
    {
      type: String,
      enum: ["dsa", "os", "hr", "dbms"],
      required: true,
    },
  ],
  availability: {
    type: Boolean,
    default: true,
  },
  rating: {
    type: Number,
    default: 5.0,
    min: 1,
    max: 5,
  },
  totalInterviews: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Interviewer || mongoose.model("Interviewer", InterviewerSchema)
