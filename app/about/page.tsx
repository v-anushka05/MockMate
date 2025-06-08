"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { Github, Linkedin, Globe, Heart, Code, Coffee, Star } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center animate-in fade-in-0 slide-in-from-top-4 duration-700">
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              About MockMate
            </span>
          </h1>

          {/* Creator Section */}
          <Card
            className="mb-8 border-2 border-primary/20 animate-in fade-in-0 slide-in-from-bottom-8 duration-700"
            style={{ animationDelay: "200ms" }}
          >
            <CardHeader className="text-center">
              <div 
                className="mx-auto w-48 h-48 rounded-full overflow-hidden border-4 border-primary/20 mb-4 group hover:scale-105 transition-transform duration-500 animate-in zoom-in-50"
                style={{ animationDelay: "400ms" }}
              >
                <Image
                  src="/anushka-photo.png"
                  alt="Anushka Verma"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  priority
                />
              </div>
              <CardTitle
                className="text-2xl animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: "500ms" }}
              >
                Meet the Creator
              </CardTitle>
              <CardDescription
                className="text-lg animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: "600ms" }}
              >
                Built with passion by Anushka Verma
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div
                className="text-center animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: "700ms" }}
              >
                <h3 className="text-xl font-semibold mb-3 flex items-center justify-center gap-2">
                  <Heart className="h-5 w-5 text-red-500 animate-pulse" />
                  My Journey & Struggles
                </h3>
                <div className="bg-muted/50 p-6 rounded-lg text-left space-y-4 hover:bg-muted/70 transition-colors duration-300">
                  <p className="text-muted-foreground leading-relaxed hover:text-foreground transition-colors duration-200">
                    Hey there! 👋 I'm <strong>Anushka Verma</strong>, and I built MockMate from scratch as a passion
                    project. This journey wasn't easy - there were countless late nights, debugging sessions that felt
                    endless, and moments where I questioned if I could pull this off.
                  </p>
                  <p className="text-muted-foreground leading-relaxed hover:text-foreground transition-colors duration-200">
                    The idea came from my own interview struggles. I realized how nerve-wracking interviews can be,
                    especially when you don't have anyone to practice with. I wanted to create a platform where students
                    and professionals could get real interview experience in a safe, supportive environment.
                  </p>
                  <p className="text-muted-foreground leading-relaxed hover:text-foreground transition-colors duration-200">
                    Building MockMate taught me so much - from React and Next.js to database design, authentication,
                    email services, and deployment. Every bug was a learning opportunity, every feature was a small
                    victory. There were times I wanted to give up, but the vision of helping others succeed kept me
                    going.
                  </p>
                  <div className="flex items-center justify-center gap-4 pt-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 group">
                      <Code className="h-4 w-4 group-hover:animate-pulse" />
                      <span>500+ commits</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 group">
                      <Coffee className="h-4 w-4 group-hover:animate-bounce" />
                      <span>Countless cups of coffee</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 group">
                      <Star className="h-4 w-4 group-hover:animate-spin" />
                      <span>One big dream</span>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="text-center animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: "800ms" }}
              >
                <h3 className="text-xl font-semibold mb-4">Connect with Me</h3>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="outline"
                    className="flex-1 sm:flex-none group hover:scale-105 transition-all duration-300"
                    asChild
                  >
                    <Link href="https://github.com/v-anushka05" target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">GitHub</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 sm:flex-none group hover:scale-105 transition-all duration-300"
                    asChild
                  >
                    <Link
                      href="https://www.linkedin.com/in/anushka-verma-352b4b278/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">LinkedIn</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 sm:flex-none group hover:scale-105 transition-all duration-300"
                    asChild
                  >
                    <Link
                      href="https://v-anushka05.github.io/anushka-portfolio/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Globe className="mr-2 h-4 w-4 group-hover:animate-spin" />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">Portfolio</span>
                    </Link>
                  </Button>
                </div>
              </div>

              <div
                className="bg-gradient-to-r from-primary/10 to-purple-600/10 p-6 rounded-lg text-center animate-in fade-in-0 slide-in-from-bottom-4 duration-500 hover:from-primary/20 hover:to-purple-600/20 transition-all duration-300"
                style={{ animationDelay: "900ms" }}
              >
                <h4 className="font-semibold text-lg mb-2 flex items-center justify-center gap-2">
                  <span>Thank You!</span>
                  <div className="animate-bounce">🙏</div>
                </h4>
                <p className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                  To everyone using MockMate - you make all the hard work worth it! Your success stories, feedback, and
                  support fuel my passion to keep improving this platform. Together, we're making interview preparation
                  accessible and effective for everyone.
                </p>
                <p className="text-sm text-muted-foreground mt-3 italic hover:text-foreground transition-colors duration-200">
                  "Every expert was once a beginner. Every pro was once an amateur." - Keep practicing! 💪
                </p>
              </div>
            </CardContent>
          </Card>

          {/* User Profile Section */}
          <div className="grid gap-6 md:grid-cols-3">
            <div
              className="md:col-span-1 animate-in fade-in-0 slide-in-from-left-4 duration-500"
              style={{ animationDelay: "1000ms" }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <CardTitle>Your Profile</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center mb-4 hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <span className="text-4xl font-bold text-muted-foreground">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <p className="text-muted-foreground">{user.email}</p>

                  <div className="w-full mt-6 space-y-4">
                    <Button
                      variant="outline"
                      className="w-full group hover:scale-105 transition-all duration-300"
                      asChild
                    >
                      <Link href="/profile">
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          Edit Profile
                        </span>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2 space-y-6">
              <Card
                className="mb-6 animate-in fade-in-0 slide-in-from-right-4 duration-500 hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: "1100ms" }}
              >
                <CardHeader>
                  <CardTitle>Your MockMate Journey</CardTitle>
                </CardHeader>
                <CardContent>
                  <blockquote className="italic border-l-4 border-primary pl-4 mb-4 hover:border-l-8 transition-all duration-300">
                    "The only way to do great work is to love what you do."
                  </blockquote>
                  <p className="mb-4 hover:text-foreground transition-colors duration-200">
                    Welcome to your interview preparation journey! MockMate is here to help you build confidence,
                    improve your skills, and ace your next interview. Every practice session brings you one step closer
                    to your dream job.
                  </p>
                  <p className="hover:text-foreground transition-colors duration-200">
                    Remember, every expert was once a beginner. Use this platform to practice, learn from feedback, and
                    grow. Your success story could inspire the next person who uses MockMate!
                  </p>
                </CardContent>
              </Card>

              <Card
                className="animate-in fade-in-0 slide-in-from-right-4 duration-500 hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: "1200ms" }}
              >
                <CardHeader>
                  <CardTitle>Your Achievements</CardTitle>
                  <CardDescription>Your progress and milestones</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-300 hover:bg-muted/50 ${achievement.completed ? "hover:scale-105" : "opacity-50"} animate-in fade-in-0 slide-in-from-bottom-4`}
                        style={{ animationDelay: `${1300 + index * 100}ms` }}
                      >
                        <div
                          className={`${achievement.completed ? "bg-primary/10" : "bg-muted"} p-3 rounded-full transition-all duration-300 ${achievement.completed ? "hover:scale-110" : ""}`}
                        >
                          {achievement.icon}
                        </div>
                        <div>
                          <h3
                            className={`font-medium ${achievement.completed ? "text-foreground" : "text-muted-foreground"} transition-colors duration-200`}
                          >
                            {achievement.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Tech Stack Section */}
          <Card
            className="mt-8 animate-in fade-in-0 slide-in-from-bottom-8 duration-700 hover:shadow-lg transition-all duration-300"
            style={{ animationDelay: "1500ms" }}
          >
            <CardHeader>
              <CardTitle className="text-center">Built With Modern Technology</CardTitle>
              <CardDescription className="text-center">
                MockMate is built using cutting-edge technologies for the best user experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {techStack.map((tech, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg hover:shadow-md transition-all duration-300 hover:-translate-y-2 cursor-pointer group animate-in fade-in-0 slide-in-from-bottom-4"
                    style={{ animationDelay: `${1600 + index * 100}ms` }}
                  >
                    <div className="text-2xl mb-2 group-hover:scale-125 transition-transform duration-300">
                      {tech.icon}
                    </div>
                    <h4 className="font-medium group-hover:text-primary transition-colors duration-200">{tech.name}</h4>
                    <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                      {tech.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

const achievements = [
  {
    title: "Joined MockMate Community",
    description: "Welcome to your interview preparation journey!",
    completed: true,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 text-primary"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    ),
  },
  {
    title: "Ready to Practice",
    description: "Start scheduling interviews to unlock more achievements",
    completed: true,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 text-primary"
      >
        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
      </svg>
    ),
  },
  {
    title: "Interview Champion",
    description: "Complete 5 interviews to unlock this achievement",
    completed: false,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 text-muted-foreground"
      >
        <circle cx="12" cy="8" r="7"></circle>
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
      </svg>
    ),
  },
]

const techStack = [
  {
    name: "React",
    description: "Frontend Framework",
    icon: "⚛️",
  },
  {
    name: "Next.js",
    description: "Full-stack Framework",
    icon: "🔷",
  },
  {
    name: "MongoDB",
    description: "Database",
    icon: "🍃",
  },
  {
    name: "Tailwind",
    description: "Styling",
    icon: "🎨",
  },
]
