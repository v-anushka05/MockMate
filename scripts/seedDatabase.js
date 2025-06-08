import mongoose from "mongoose"

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/mockmate"

// Interviewer Schema
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

const Interviewer = mongoose.models.Interviewer || mongoose.model("Interviewer", InterviewerSchema)

const interviewers = [
  {
    name: "John Smith",
    email: "john.smith@mockmate.com",
    company: "Google",
    position: "Senior Software Engineer",
    expertise: ["dsa", "os"],
    availability: true,
    rating: 4.8,
    totalInterviews: 150,
  },
  {
    name: "Sarah Johnson",
    email: "sarah.johnson@mockmate.com",
    company: "Microsoft",
    position: "HR Manager",
    expertise: ["hr"],
    availability: true,
    rating: 4.9,
    totalInterviews: 200,
  },
  {
    name: "Michael Chen",
    email: "michael.chen@mockmate.com",
    company: "Amazon",
    position: "Database Architect",
    expertise: ["dbms", "dsa"],
    availability: true,
    rating: 4.7,
    totalInterviews: 120,
  },
  {
    name: "Emily Davis",
    email: "emily.davis@mockmate.com",
    company: "Apple",
    position: "Systems Engineer",
    expertise: ["os", "dsa"],
    availability: true,
    rating: 4.8,
    totalInterviews: 180,
  },
  {
    name: "Robert Wilson",
    email: "robert.wilson@mockmate.com",
    company: "Meta",
    position: "HR Director",
    expertise: ["hr"],
    availability: true,
    rating: 4.9,
    totalInterviews: 220,
  },
  {
    name: "Jennifer Lee",
    email: "jennifer.lee@mockmate.com",
    company: "Netflix",
    position: "Algorithm Specialist",
    expertise: ["dsa"],
    availability: true,
    rating: 4.6,
    totalInterviews: 90,
  },
  {
    name: "David Brown",
    email: "david.brown@mockmate.com",
    company: "Twitter",
    position: "Database Engineer",
    expertise: ["dbms"],
    availability: true,
    rating: 4.7,
    totalInterviews: 110,
  },
  {
    name: "Lisa Garcia",
    email: "lisa.garcia@mockmate.com",
    company: "LinkedIn",
    position: "Technical Recruiter",
    expertise: ["hr"],
    availability: true,
    rating: 4.8,
    totalInterviews: 160,
  },
  {
    name: "James Taylor",
    email: "james.taylor@mockmate.com",
    company: "Uber",
    position: "Systems Architect",
    expertise: ["os", "dbms"],
    availability: true,
    rating: 4.5,
    totalInterviews: 85,
  },
  {
    name: "Patricia Martinez",
    email: "patricia.martinez@mockmate.com",
    company: "Airbnb",
    position: "Algorithm Engineer",
    expertise: ["dsa", "dbms"],
    availability: true,
    rating: 4.7,
    totalInterviews: 130,
  },
]

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log("✅ Connected to MongoDB")
  } catch (error) {
    console.error("❌ MongoDB connection error:", error)
    throw error
  }
}

async function seedDatabase() {
  try {
    await connectDB()

    // Clear existing interviewers
    await Interviewer.deleteMany({})
    console.log("🗑️ Cleared existing interviewers")

    // Insert new interviewers
    await Interviewer.insertMany(interviewers)

    console.log("✅ Database seeded successfully!")
    console.log(`📊 Inserted ${interviewers.length} interviewers`)

    process.exit(0)
  } catch (error) {
    console.error("❌ Error seeding database:", error)
    process.exit(1)
  }
}

seedDatabase()
