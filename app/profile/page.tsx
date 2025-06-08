"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"

const subjects = [
  { id: "dsa", label: "Data Structures & Algorithms (DSA)" },
  { id: "os", label: "Operating Systems (OS)" },
  { id: "hr", label: "Human Resources (HR)" },
  { id: "dbms", label: "Database Management Systems (DBMS)" },
]

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    } else if (user) {
      setName(user.name)
      setEmail(user.email)
      setSelectedSubjects(user.preferences || [])
    }
  }, [user, loading, router])

  const handleSubjectToggle = (subject: string) => {
    setSelectedSubjects((prev) => (prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]))
  }

  const handleSaveProfile = () => {
    // In a real app, this would update the user profile in the database
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully",
    })
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
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center mb-4">
                  <span className="text-4xl font-bold text-muted-foreground">
                    {name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <Button variant="outline">Change Picture</Button>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Tabs defaultValue="info">
              <TabsList className="mb-4">
                <TabsTrigger value="info">Personal Info</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="stats">Statistics</TabsTrigger>
              </TabsList>

              <TabsContent value="info">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <Button onClick={handleSaveProfile}>Save Changes</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences">
                <Card>
                  <CardHeader>
                    <CardTitle>Interview Preferences</CardTitle>
                    <CardDescription>Select your preferred interview subjects</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {subjects.map((subject) => (
                        <div key={subject.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`pref-${subject.id}`}
                            checked={selectedSubjects.includes(subject.id)}
                            onCheckedChange={() => handleSubjectToggle(subject.id)}
                          />
                          <Label htmlFor={`pref-${subject.id}`} className="cursor-pointer">
                            {subject.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <Button onClick={handleSaveProfile}>Save Preferences</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="stats">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Performance</CardTitle>
                    <CardDescription>View your interview performance statistics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Overall Performance</h3>
                        <div className="h-4 w-full bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: "78%" }}></div>
                        </div>
                        <div className="flex justify-between mt-1 text-sm">
                          <span>0%</span>
                          <span className="font-medium">78%</span>
                          <span>100%</span>
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        {subjectPerformance.map((item) => (
                          <div key={item.subject}>
                            <h4 className="text-sm font-medium mb-1">{item.subject}</h4>
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary rounded-full" style={{ width: `${item.score}%` }}></div>
                            </div>
                            <div className="flex justify-end mt-1">
                              <span className="text-xs font-medium">{item.score}%</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-4">Monthly Progress</h3>
                        <div className="h-[200px] flex items-end gap-2">
                          {monthlyProgress.map((item, index) => (
                            <div key={index} className="relative flex-1 flex flex-col items-center">
                              <div
                                className="w-full bg-primary rounded-t-sm"
                                style={{ height: `${item.score}%` }}
                              ></div>
                              <span className="text-xs mt-2">{item.month}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
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
const subjectPerformance = [
  { subject: "Data Structures & Algorithms", score: 72 },
  { subject: "Operating Systems", score: 85 },
  { subject: "HR Interview", score: 92 },
  { subject: "Database Management Systems", score: 68 },
]

const monthlyProgress = [
  { month: "Jan", score: 45 },
  { month: "Feb", score: 52 },
  { month: "Mar", score: 48 },
  { month: "Apr", score: 60 },
  { month: "May", score: 65 },
  { month: "Jun", score: 78 },
]
