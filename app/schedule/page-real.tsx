"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { CalendarIcon, Clock } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { RealEmailService } from "@/lib/email-service-real"

const subjects = [
  { id: "dsa", label: "Data Structures & Algorithms (DSA)" },
  { id: "os", label: "Operating Systems (OS)" },
  { id: "hr", label: "Human Resources (HR)" },
  { id: "dbms", label: "Database Management Systems (DBMS)" },
]

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"]

interface Interviewer {
  id: string
  name: string
  company: string
  position: string
  expertise: string[]
  availability: boolean
}

export default function SchedulePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState("")
  const [availableInterviewers, setAvailableInterviewers] = useState<Interviewer[]>([])
  const [selectedInterviewer, setSelectedInterviewer] = useState("")
  const [isBooking, setIsBooking] = useState(false)
  const [step, setStep] = useState(1)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    if (selectedSubject && selectedDate && selectedTime) {
      // In a real app, this would fetch available interviewers from the API
      const filtered = mockInterviewers.filter(
        (interviewer) => interviewer.expertise.includes(selectedSubject) && interviewer.availability,
      )
      setAvailableInterviewers(filtered)
    } else {
      setAvailableInterviewers([])
    }
  }, [selectedSubject, selectedDate, selectedTime])

  const handleBookInterview = async () => {
    if (!selectedSubject || !selectedDate || !selectedTime || !selectedInterviewer) {
      toast({
        variant: "destructive",
        title: "Incomplete information",
        description: "Please fill in all required fields",
      })
      return
    }

    setIsBooking(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Send confirmation email using real email service
      try {
        const interviewer = mockInterviewers.find((i) => i.id === selectedInterviewer)
        if (interviewer && selectedDate && user) {
          const confirmationEmail = RealEmailService.generateInterviewConfirmationEmail(user.name, user.email, {
            subject: subjects.find((s) => s.id === selectedSubject)?.label || selectedSubject,
            interviewer: interviewer.name,
            interviewerEmail: `${interviewer.name.toLowerCase().replace(" ", ".")}@mockmate.com`,
            date: format(selectedDate, "EEEE, MMMM do, yyyy"),
            time: selectedTime,
            meetingLink: "https://meet.google.com/itd-ptkv-bge",
            expertise: interviewer.expertise.map((e) => subjects.find((s) => s.id === e)?.label || e),
          })

          const emailResult = await RealEmailService.sendEmail(confirmationEmail)

          if (emailResult.success) {
            console.log("✅ Interview confirmation email sent successfully")
          } else {
            console.error("❌ Failed to send confirmation email:", emailResult.error)
          }
        }
      } catch (error) {
        console.error("Failed to send confirmation email:", error)
      }

      toast({
        title: "Interview Scheduled",
        description: "Your interview has been successfully scheduled. Check your email for confirmation!",
      })

      setStep(2)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Booking failed",
        description: "An error occurred while booking your interview",
      })
    } finally {
      setIsBooking(false)
    }
  }

  const handleScheduleAnother = () => {
    setSelectedSubject("")
    setSelectedDate(undefined)
    setSelectedTime("")
    setSelectedInterviewer("")
    setStep(1)
  }

  if (loading || !user) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p>Loading...</p>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-6">
        <h1 className="text-3xl font-bold mb-6">Schedule an Interview</h1>

        {step === 1 ? (
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Book Your Mock Interview</CardTitle>
                <CardDescription>Select your preferred subject, date, and time</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject.id} value={subject.id}>
                          {subject.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                        disabled={(date) => {
                          // Disable dates in the past and weekends
                          const today = new Date()
                          today.setHours(0, 0, 0, 0)
                          const day = date.getDay()
                          return date < today || day === 0 || day === 6
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Time</label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {availableInterviewers.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Interviewer</label>
                    <Select value={selectedInterviewer} onValueChange={setSelectedInterviewer}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an interviewer" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableInterviewers.map((interviewer) => (
                          <SelectItem key={interviewer.id} value={interviewer.id}>
                            {interviewer.name} - {interviewer.company}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {selectedInterviewer && (
                  <div className="bg-muted p-4 rounded-md">
                    <h3 className="font-medium mb-2">Interviewer Details</h3>
                    {(() => {
                      const interviewer = mockInterviewers.find((i) => i.id === selectedInterviewer)
                      return interviewer ? (
                        <div className="space-y-1 text-sm">
                          <p>
                            <span className="font-medium">Name:</span> {interviewer.name}
                          </p>
                          <p>
                            <span className="font-medium">Company:</span> {interviewer.company}
                          </p>
                          <p>
                            <span className="font-medium">Position:</span> {interviewer.position}
                          </p>
                          <p>
                            <span className="font-medium">Expertise:</span>{" "}
                            {interviewer.expertise.map((e) => subjects.find((s) => s.id === e)?.label).join(", ")}
                          </p>
                        </div>
                      ) : null
                    })()}
                  </div>
                )}

                <Button
                  onClick={handleBookInterview}
                  disabled={!selectedSubject || !selectedDate || !selectedTime || !selectedInterviewer || isBooking}
                  className="w-full"
                >
                  {isBooking ? "Booking..." : "Book Interview"}
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Interview Scheduled!</CardTitle>
                <CardDescription>Your interview has been successfully booked</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md border border-green-200 dark:border-green-900">
                  <h3 className="text-green-800 dark:text-green-300 font-medium mb-2">Confirmation Details</h3>
                  <div className="space-y-2 text-sm text-green-700 dark:text-green-400">
                    {(() => {
                      const interviewer = mockInterviewers.find((i) => i.id === selectedInterviewer)
                      const subjectLabel = subjects.find((s) => s.id === selectedSubject)?.label

                      return (
                        <>
                          <p>
                            <span className="font-medium">Subject:</span> {subjectLabel}
                          </p>
                          <p>
                            <span className="font-medium">Date:</span> {selectedDate ? format(selectedDate, "PPP") : ""}
                          </p>
                          <p>
                            <span className="font-medium">Time:</span> {selectedTime}
                          </p>
                          <p>
                            <span className="font-medium">Interviewer:</span> {interviewer?.name}
                          </p>
                          <p>
                            <span className="font-medium">Company:</span> {interviewer?.company}
                          </p>
                          <p>
                            <span className="font-medium">Meeting Link:</span>{" "}
                            <a href="#" className="underline">
                              https://meet.google.com/itd-ptkv-bge
                            </a>
                          </p>
                        </>
                      )
                    })()}
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-md">
                  <h3 className="font-medium mb-2">Email Confirmation Sent! 📧</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    We&apos;ve sent a detailed confirmation email with interview preparation materials to{" "}
                    <strong>{user.email}</strong>.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Please join the meeting 5 minutes before the scheduled time</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1" onClick={handleScheduleAnother}>
                    Schedule Another
                  </Button>
                  <Button className="flex-1" asChild>
                    <a href="/dashboard">Go to Dashboard</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}

// Mock data
const mockInterviewers: Interviewer[] = [
  {
    id: "1",
    name: "John Smith",
    company: "Google",
    position: "Senior Software Engineer",
    expertise: ["dsa", "os"],
    availability: true,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    company: "Microsoft",
    position: "HR Manager",
    expertise: ["hr"],
    availability: true,
  },
  {
    id: "3",
    name: "Michael Chen",
    company: "Amazon",
    position: "Database Architect",
    expertise: ["dbms", "dsa"],
    availability: true,
  },
  {
    id: "4",
    name: "Emily Davis",
    company: "Apple",
    position: "Systems Engineer",
    expertise: ["os", "dsa"],
    availability: true,
  },
  {
    id: "5",
    name: "Robert Wilson",
    company: "Meta",
    position: "HR Director",
    expertise: ["hr"],
    availability: true,
  },
  {
    id: "6",
    name: "Jennifer Lee",
    company: "Netflix",
    position: "Algorithm Specialist",
    expertise: ["dsa"],
    availability: true,
  },
  {
    id: "7",
    name: "David Brown",
    company: "Twitter",
    position: "Database Engineer",
    expertise: ["dbms"],
    availability: true,
  },
  {
    id: "8",
    name: "Lisa Garcia",
    company: "LinkedIn",
    position: "Technical Recruiter",
    expertise: ["hr"],
    availability: true,
  },
  {
    id: "9",
    name: "James Taylor",
    company: "Uber",
    position: "Systems Architect",
    expertise: ["os", "dbms"],
    availability: true,
  },
  {
    id: "10",
    name: "Patricia Martinez",
    company: "Airbnb",
    position: "Algorithm Engineer",
    expertise: ["dsa", "dbms"],
    availability: true,
  },
]
