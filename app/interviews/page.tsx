"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { Calendar, Clock, User, Plus } from "lucide-react"
import Link from "next/link"

export default function InterviewsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading || !user) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-6">
        <div className="flex justify-between items-center mb-6 animate-in fade-in-0 slide-in-from-top-4 duration-700">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <div className="w-2 h-8 bg-gradient-to-b from-primary to-primary/50 rounded-full animate-pulse"></div>
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">Your Interviews</span>
          </h1>
          <Button
            asChild
            className="group hover:scale-105 transition-all duration-300 hover:shadow-lg animate-in fade-in-0 slide-in-from-right-4 duration-500"
            style={{ animationDelay: "200ms" }}
          >
            <Link href="/schedule">
              <Plus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
              <span className="group-hover:translate-x-1 transition-transform duration-200">
                Schedule New Interview
              </span>
            </Link>
          </Button>
        </div>

        <Tabs
          defaultValue="upcoming"
          className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
          style={{ animationDelay: "300ms" }}
        >
          <TabsList className="mb-4 bg-muted/50 backdrop-blur-sm">
            <TabsTrigger
              value="upcoming"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
            >
              Upcoming
            </TabsTrigger>
            <TabsTrigger
              value="past"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
            >
              Past
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingInterviews.length > 0 ? (
              upcomingInterviews.map((interview, index) => (
                <div
                  key={interview.id}
                  className="animate-in fade-in-0 slide-in-from-bottom-4"
                  style={{ animationDelay: `${400 + index * 100}ms` }}
                >
                  <InterviewCard interview={interview} />
                </div>
              ))
            ) : (
              <div
                className="text-center py-8 animate-in fade-in-0 slide-in-from-bottom-4"
                style={{ animationDelay: "400ms" }}
              >
                <div className="animate-bounce mb-4">
                  <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                    <Calendar className="h-8 w-8 text-muted-foreground" />
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">You don&apos;t have any upcoming interviews</p>
                <Button asChild className="animate-pulse">
                  <Link href="/schedule">Schedule an Interview</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastInterviews.length > 0 ? (
              pastInterviews.map((interview, index) => (
                <div
                  key={interview.id}
                  className="animate-in fade-in-0 slide-in-from-bottom-4"
                  style={{ animationDelay: `${400 + index * 100}ms` }}
                >
                  <InterviewCard interview={interview} isPast />
                </div>
              ))
            ) : (
              <div
                className="text-center py-8 animate-in fade-in-0 slide-in-from-bottom-4"
                style={{ animationDelay: "400ms" }}
              >
                <div className="animate-bounce mb-4">
                  <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                    <Clock className="h-8 w-8 text-muted-foreground" />
                  </div>
                </div>
                <p className="text-muted-foreground">You haven&apos;t completed any interviews yet</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

interface Interview {
  id: string
  subject: string
  interviewer: string
  company: string
  date: string
  time: string
  status: string
  score?: number
  feedback?: string
}

interface InterviewCardProps {
  interview: Interview
  isPast?: boolean
}

function InterviewCard({ interview, isPast = false }: InterviewCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <CardHeader className="flex flex-row items-start justify-between relative">
        <div>
          <CardTitle className="group-hover:text-primary transition-colors duration-200 group-hover:translate-x-1 transform">
            {interview.subject}
          </CardTitle>
          <CardDescription className="group-hover:text-foreground transition-colors duration-200">
            with {interview.interviewer} from {interview.company}
          </CardDescription>
        </div>
        <Badge
          variant={getStatusVariant(interview.status)}
          className="group-hover:scale-110 transition-transform duration-200"
        >
          {interview.status}
        </Badge>
      </CardHeader>
      <CardContent className="relative">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center group-hover:translate-x-1 transition-transform duration-200">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
              <span>{interview.date}</span>
            </div>
            <div className="flex items-center group-hover:translate-x-1 transition-transform duration-200">
              <Clock className="mr-2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
              <span>{interview.time}</span>
            </div>
            <div className="flex items-center group-hover:translate-x-1 transition-transform duration-200">
              <User className="mr-2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
              <span>{interview.interviewer}</span>
            </div>
          </div>

          {isPast && interview.score !== undefined && (
            <div className="group-hover:translate-x-1 transition-transform duration-200">
              <div className="mb-2">
                <span className="text-sm font-medium">Performance Score:</span>
                <span className="ml-2 font-bold text-primary group-hover:scale-110 transition-transform duration-200 inline-block">
                  {interview.score}/100
                </span>
              </div>
              {interview.feedback && (
                <div>
                  <span className="text-sm font-medium">Feedback:</span>
                  <p className="text-sm text-muted-foreground mt-1 group-hover:text-foreground transition-colors duration-200">
                    {interview.feedback}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <Button
            className="flex-1 group-hover:bg-primary/90 transition-all duration-200 transform group-hover:scale-[1.02]"
            asChild
          >
            <Link href={`/interviews/${interview.id}`}>
              <span className="group-hover:translate-x-1 transition-transform duration-200">
                {isPast ? "View Details" : "Join Interview"}
              </span>
            </Link>
          </Button>
          {!isPast && (
            <Button
              variant="outline"
              className="flex-1 group-hover:bg-muted transition-all duration-200 transform group-hover:scale-[1.02]"
            >
              <span className="group-hover:translate-x-1 transition-transform duration-200">Reschedule</span>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function getStatusVariant(status: string) {
  switch (status) {
    case "Scheduled":
      return "default"
    case "Completed":
      return "secondary"
    case "Cancelled":
      return "destructive"
    default:
      return "outline"
  }
}

// Mock data
const upcomingInterviews = [
  {
    id: "1",
    subject: "Data Structures & Algorithms",
    interviewer: "John Smith",
    company: "Google",
    date: "June 10, 2025",
    time: "10:00 AM",
    status: "Scheduled",
  },
  {
    id: "2",
    subject: "HR Interview",
    interviewer: "Sarah Johnson",
    company: "Microsoft",
    date: "June 12, 2025",
    time: "2:00 PM",
    status: "Scheduled",
  },
  {
    id: "3",
    subject: "Database Management Systems",
    interviewer: "Michael Chen",
    company: "Amazon",
    date: "June 15, 2025",
    time: "11:00 AM",
    status: "Scheduled",
  },
]

const pastInterviews = [
  {
    id: "4",
    subject: "Operating Systems",
    interviewer: "Emily Davis",
    company: "Apple",
    date: "May 28, 2025",
    time: "3:00 PM",
    status: "Completed",
    score: 85,
    feedback: "Great understanding of process management and memory allocation. Could improve on file system concepts.",
  },
  {
    id: "5",
    subject: "HR Interview",
    interviewer: "Robert Wilson",
    company: "Meta",
    date: "May 20, 2025",
    time: "1:00 PM",
    status: "Completed",
    score: 92,
    feedback: "Excellent communication skills and situational awareness. Very well prepared with examples.",
  },
  {
    id: "6",
    subject: "Data Structures & Algorithms",
    interviewer: "Jennifer Lee",
    company: "Netflix",
    date: "May 15, 2025",
    time: "11:00 AM",
    status: "Completed",
    score: 78,
    feedback: "Good problem-solving approach. Need to work on time complexity analysis and edge cases.",
  },
]
