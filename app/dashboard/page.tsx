"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { Calendar, Clock, FileText } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
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
          <p>Loading...</p>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-6">
        <div className="animate-in fade-in-0 slide-in-from-top-4 duration-700">
          <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <div className="w-2 h-8 bg-gradient-to-b from-primary to-primary/50 rounded-full animate-pulse"></div>
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">Welcome, {user.name}</span>
            <div className="animate-bounce">👋</div>
          </h1>
        </div>

        <Tabs
          defaultValue="upcoming"
          className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
          style={{ animationDelay: "200ms" }}
        >
          <TabsList className="mb-4 bg-muted/50 backdrop-blur-sm">
            <TabsTrigger
              value="upcoming"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
            >
              Upcoming Interviews
            </TabsTrigger>
            <TabsTrigger
              value="stats"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
            >
              Progress Stats
            </TabsTrigger>
            <TabsTrigger
              value="resources"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
            >
              Resources
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {upcomingInterviews.length > 0 ? (
                upcomingInterviews.map((interview, index) => (
                  <Card
                    key={interview.id}
                    className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] animate-in fade-in-0 slide-in-from-bottom-4"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="group-hover:text-primary transition-colors duration-200">
                        {interview.subject}
                      </CardTitle>
                      <CardDescription>with {interview.interviewer}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center group-hover:translate-x-1 transition-transform duration-200">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                          <span>{interview.date}</span>
                        </div>
                        <div className="flex items-center group-hover:translate-x-1 transition-transform duration-200">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                          <span>{interview.time}</span>
                        </div>
                        <Button
                          className="w-full mt-2 group-hover:bg-primary/90 transition-all duration-200 transform group-hover:scale-[1.02]"
                          asChild
                        >
                          <Link href={`/interviews/${interview.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-8 animate-in fade-in-0 slide-in-from-bottom-4">
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
            </div>
          </TabsContent>

          <TabsContent value="stats" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <Card
                  key={stat.title}
                  className="group hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-in fade-in-0 slide-in-from-bottom-4 border-l-4 border-l-transparent hover:border-l-primary"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium group-hover:text-primary transition-colors duration-200">
                      {stat.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold group-hover:scale-110 transition-transform duration-200 origin-left">
                      {stat.value}
                    </div>
                    <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="animate-in fade-in-0 slide-in-from-bottom-4" style={{ animationDelay: "600ms" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  Performance Over Time
                </CardTitle>
                <CardDescription>Your interview performance score over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-end gap-2">
                  {performanceData.map((item, index) => (
                    <div key={index} className="relative flex-1 flex flex-col items-center group">
                      <div
                        className="w-full bg-primary rounded-t-sm transition-all duration-500 hover:bg-primary/80 cursor-pointer transform hover:scale-105 animate-in slide-in-from-bottom-4"
                        style={{
                          height: `${item.score}%`,
                          animationDelay: `${800 + index * 100}ms`,
                        }}
                      >
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded whitespace-nowrap">
                          {item.score}%
                        </div>
                      </div>
                      <span className="text-xs mt-2 group-hover:font-medium transition-all duration-200">
                        {item.month}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {resources.map((resource, index) => (
                <Card
                  key={resource.title}
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 cursor-pointer animate-in fade-in-0 slide-in-from-bottom-4 overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardHeader className="relative">
                    <CardTitle className="flex items-center group-hover:text-primary transition-colors duration-200">
                      <div className="mr-2 p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-200 group-hover:scale-110 transform">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {resource.title}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative">
                    <p className="text-muted-foreground mb-4 group-hover:text-foreground transition-colors duration-200">
                      {resource.description}
                    </p>
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200 transform group-hover:scale-[1.02]"
                      asChild
                    >
                      <Link href={resource.link}>
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          View Resource
                        </span>
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <section className="mt-8 animate-in fade-in-0 slide-in-from-bottom-4" style={{ animationDelay: "400ms" }}>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-primary rounded-full"></div>
            Scheduled Interviews
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {scheduledInterviews.map((interview, index) => (
              <Card
                key={interview.id}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] animate-in fade-in-0 slide-in-from-bottom-4"
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="group-hover:text-primary transition-colors duration-200">
                    {interview.subject}
                  </CardTitle>
                  <CardDescription>with {interview.interviewer}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center group-hover:translate-x-1 transition-transform duration-200">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                      <span>{interview.date}</span>
                    </div>
                    <div className="flex items-center group-hover:translate-x-1 transition-transform duration-200">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                      <span>{interview.time}</span>
                    </div>
                    <Button
                      className="w-full mt-2 group-hover:bg-primary/90 transition-all duration-200 transform group-hover:scale-[1.02]"
                      asChild
                    >
                      <Link href={`/interviews/${interview.id}`}>View Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

// Mock data
const upcomingInterviews = [
  {
    id: "1",
    subject: "Data Structures & Algorithms",
    interviewer: "John Smith",
    date: "June 10, 2025",
    time: "10:00 AM",
  },
  {
    id: "2",
    subject: "HR Interview",
    interviewer: "Sarah Johnson",
    date: "June 12, 2025",
    time: "2:00 PM",
  },
]

const scheduledInterviews = [
  {
    id: "3",
    subject: "Database Management Systems",
    interviewer: "Michael Chen",
    date: "June 15, 2025",
    time: "11:00 AM",
  },
  {
    id: "4",
    subject: "Operating Systems",
    interviewer: "Emily Davis",
    date: "June 18, 2025",
    time: "3:00 PM",
  },
  {
    id: "5",
    subject: "HR Interview",
    interviewer: "Robert Wilson",
    date: "June 20, 2025",
    time: "1:00 PM",
  },
]

const stats = [
  {
    title: "Success Rate",
    value: "78%",
    description: "Average performance across all interviews",
  },
  {
    title: "Hours Practiced",
    value: "24",
    description: "Total interview practice time",
  },
  {
    title: "Interviews Completed",
    value: "12",
    description: "Number of mock interviews taken",
  },
  {
    title: "Improvement",
    value: "+15%",
    description: "Performance improvement in the last month",
  },
]

const performanceData = [
  { month: "Jan", score: 45 },
  { month: "Feb", score: 52 },
  { month: "Mar", score: 48 },
  { month: "Apr", score: 60 },
  { month: "May", score: 65 },
  { month: "Jun", score: 78 },
]

const resources = [
  {
    title: "DSA Interview Questions",
    description: "Top 100 data structures and algorithms interview questions with solutions",
    link: "#",
  },
  {
    title: "HR Interview Guide",
    description: "Comprehensive guide to behavioral and situational interview questions",
    link: "#",
  },
  {
    title: "System Design Primer",
    description: "Learn how to design large-scale systems for technical interviews",
    link: "#",
  },
  {
    title: "Database Concepts",
    description: "Essential DBMS concepts and SQL queries for technical interviews",
    link: "#",
  },
  {
    title: "OS Fundamentals",
    description: "Core operating system concepts frequently asked in interviews",
    link: "#",
  },
  {
    title: "Mock Interview Videos",
    description: "Watch recorded mock interviews with expert feedback",
    link: "#",
  },
]
