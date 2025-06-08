"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/lib/auth-context"
import { Calendar, Clock, User, Building, Video, FileText } from "lucide-react"
import Link from "next/link"

export default function InterviewDetailPage({ params }: { params: { id: string } }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [interview, setInterview] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    if (params.id) {
      // In a real app, this would fetch the interview details from an API
      const mockInterview = mockInterviews.find((i) => i.id === params.id)

      if (mockInterview) {
        setInterview(mockInterview)
      } else {
        router.push("/interviews")
      }

      setIsLoading(false)
    }
  }, [params.id, router])

  if (loading || !user || isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p>Loading...</p>
        </main>
      </div>
    )
  }

  if (!interview) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p>Interview not found</p>
        </main>
      </div>
    )
  }

  const isPast = new Date(interview.date + " " + interview.time) < new Date()

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{interview.subject}</h1>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/interviews">Back to Interviews</Link>
            </Button>
            {!isPast && (
              <Button asChild>
                <a href={interview.meetingLink} target="_blank" rel="noopener noreferrer">
                  <Video className="mr-2 h-4 w-4" />
                  Join Meeting
                </a>
              </Button>
            )}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Interview Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{interview.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{interview.time}</span>
                </div>
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{interview.interviewer}</span>
                </div>
                <div className="flex items-center">
                  <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{interview.company}</span>
                </div>

                {isPast ? (
                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-2">Performance</h3>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Score:</span>
                          <span className="font-medium">{interview.score}/100</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full mt-1">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${interview.score}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Button className="w-full mt-4" asChild>
                    <a href={interview.meetingLink} target="_blank" rel="noopener noreferrer">
                      <Video className="mr-2 h-4 w-4" />
                      Join Meeting
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Tabs defaultValue={isPast ? "feedback" : "preparation"}>
              <TabsList className="mb-4">
                <TabsTrigger value="preparation">Preparation</TabsTrigger>
                {isPast && <TabsTrigger value="feedback">Feedback</TabsTrigger>}
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>

              <TabsContent value="preparation">
                <Card>
                  <CardHeader>
                    <CardTitle>Preparation Materials</CardTitle>
                    <CardDescription>Review these resources before your interview</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2 flex items-center">
                        <FileText className="mr-2 h-4 w-4" />
                        Sample Questions
                      </h3>
                      <ul className="space-y-2 pl-6 list-disc">
                        {interview.prepQuestions.map((question: string, index: number) => (
                          <li key={index} className="text-sm">
                            {question}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Recommended Resources</h3>
                      <div className="space-y-2">
                        {interview.resources.map((resource: any, index: number) => (
                          <Card key={index} className="p-3">
                            <div className="font-medium">{resource.title}</div>
                            <p className="text-sm text-muted-foreground">{resource.description}</p>
                            <Button variant="link" className="p-0 h-auto mt-1" asChild>
                              <a href={resource.link} target="_blank" rel="noopener noreferrer">
                                View Resource
                              </a>
                            </Button>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {isPast && (
                <TabsContent value="feedback">
                  <Card>
                    <CardHeader>
                      <CardTitle>Interviewer Feedback</CardTitle>
                      <CardDescription>Review feedback from your interviewer</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-2">Overall Assessment</h3>
                        <p className="text-sm">{interview.feedback.overall}</p>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Strengths</h3>
                        <ul className="space-y-1 pl-6 list-disc">
                          {interview.feedback.strengths.map((strength: string, index: number) => (
                            <li key={index} className="text-sm">
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Areas for Improvement</h3>
                        <ul className="space-y-1 pl-6 list-disc">
                          {interview.feedback.improvements.map((improvement: string, index: number) => (
                            <li key={index} className="text-sm">
                              {improvement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Performance Breakdown</h3>
                        <div className="space-y-2">
                          {interview.feedback.categories.map((category: any, index: number) => (
                            <div key={index}>
                              <div className="flex justify-between text-sm">
                                <span>{category.name}:</span>
                                <span className="font-medium">{category.score}/10</span>
                              </div>
                              <div className="h-2 w-full bg-muted rounded-full mt-1">
                                <div
                                  className="h-full bg-primary rounded-full"
                                  style={{ width: `${category.score * 10}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              <TabsContent value="notes">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Notes</CardTitle>
                    <CardDescription>Take notes before, during, or after your interview</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <textarea
                      className="w-full min-h-[300px] p-3 border rounded-md bg-background"
                      placeholder="Type your notes here..."
                      defaultValue={interview.notes || ""}
                    ></textarea>
                    <Button className="mt-4">Save Notes</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}

// Mock data
const mockInterviews = [
  {
    id: "1",
    subject: "Data Structures & Algorithms",
    interviewer: "John Smith",
    company: "Google",
    date: "June 10, 2025",
    time: "10:00 AM",
    status: "Scheduled",
    meetingLink: "https://meet.mockmate.com/interview/123456",
    prepQuestions: [
      "Implement a function to check if a binary tree is balanced",
      "Find the kth smallest element in a sorted matrix",
      "Design an algorithm to serialize and deserialize a binary tree",
      "Implement a LRU Cache",
      "Find the longest substring without repeating characters",
    ],
    resources: [
      {
        title: "Binary Tree Traversals",
        description: "Learn different ways to traverse binary trees",
        link: "#",
      },
      {
        title: "Dynamic Programming Patterns",
        description: "Common patterns for solving DP problems",
        link: "#",
      },
      {
        title: "Graph Algorithms",
        description: "BFS, DFS, and shortest path algorithms",
        link: "#",
      },
    ],
    notes: "",
  },
  {
    id: "4",
    subject: "Operating Systems",
    interviewer: "Emily Davis",
    company: "Apple",
    date: "May 28, 2025",
    time: "3:00 PM",
    status: "Completed",
    meetingLink: "https://meet.mockmate.com/interview/789012",
    score: 85,
    prepQuestions: [
      "Explain the difference between processes and threads",
      "How does virtual memory work?",
      "Describe the different CPU scheduling algorithms",
      "What is a deadlock and how can it be prevented?",
      "Explain the concept of paging in memory management",
    ],
    resources: [
      {
        title: "Process Management",
        description: "Understanding process states and transitions",
        link: "#",
      },
      {
        title: "Memory Management Techniques",
        description: "Virtual memory, paging, and segmentation",
        link: "#",
      },
      {
        title: "File Systems",
        description: "Different file system architectures and operations",
        link: "#",
      },
    ],
    feedback: {
      overall:
        "The candidate demonstrated a strong understanding of operating system concepts, particularly in process management and memory allocation. They were able to explain complex concepts clearly and provide relevant examples.",
      strengths: [
        "Excellent understanding of process management and scheduling algorithms",
        "Clear explanation of virtual memory concepts",
        "Good knowledge of synchronization primitives",
      ],
      improvements: [
        "Could improve understanding of file system implementations",
        "Need more practice with deadlock detection algorithms",
        "Should review I/O management concepts",
      ],
      categories: [
        { name: "Technical Knowledge", score: 9 },
        { name: "Problem Solving", score: 8 },
        { name: "Communication", score: 9 },
        { name: "System Design", score: 7 },
      ],
    },
    notes:
      "Remember to review the different file system implementations before the interview. Also, practice explaining the banker's algorithm for deadlock avoidance.",
  },
]
