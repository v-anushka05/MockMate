"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { Star, Send, MessageCircle } from "lucide-react"

export default function FeedbackPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [chatMessages, setChatMessages] = useState<{ text: string; isUser: boolean }[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isSending, setIsSending] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  const handleSubmitFeedback = () => {
    if (rating === 0) {
      toast({
        variant: "destructive",
        title: "Rating required",
        description: "Please select a rating before submitting",
      })
      return
    }

    toast({
      title: "Feedback submitted",
      description: "Thank you for your feedback!",
    })

    // Reset form
    setRating(0)
    setFeedback("")
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const userMessage = { text: newMessage, isUser: true }
    setChatMessages([...chatMessages, userMessage])
    setNewMessage("")
    setIsSending(true)

    // Simulate response after a delay
    setTimeout(() => {
      const botResponse = { text: getRandomResponse(), isUser: false }
      setChatMessages((prev) => [...prev, botResponse])
      setIsSending(false)
    }, 1000)
  }

  const getRandomResponse = () => {
    const responses = [
      "Thank you for your feedback! We'll take it into consideration.",
      "We appreciate your input. It helps us improve our platform.",
      "Thanks for reaching out! Our team will review your message.",
      "Your feedback is valuable to us. We're constantly working to improve.",
      "Got it! We'll look into this and get back to you if needed.",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

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
        <h1 className="text-3xl font-bold mb-6 animate-in fade-in-0 slide-in-from-top-4 duration-700 flex items-center gap-3">
          <div className="w-2 h-8 bg-gradient-to-b from-primary to-primary/50 rounded-full animate-pulse"></div>
          <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">Feedback</span>
          <div className="animate-bounce">💬</div>
        </h1>

        <div className="grid gap-6 md:grid-cols-2">
          <Card
            className="animate-in fade-in-0 slide-in-from-left-8 duration-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            style={{ animationDelay: "200ms" }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary animate-pulse" />
                Rate Your Experience
              </CardTitle>
              <CardDescription>Let us know how we&apos;re doing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div
                  className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
                  style={{ animationDelay: "400ms" }}
                >
                  <div className="flex justify-center mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="p-1 group"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                      >
                        <Star
                          className={`h-8 w-8 transition-all duration-200 group-hover:scale-125 ${
                            star <= (hoveredRating || rating)
                              ? "fill-yellow-400 text-yellow-400 animate-pulse"
                              : "text-muted-foreground hover:text-yellow-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <p className="text-center text-sm text-muted-foreground transition-colors duration-200">
                    {rating === 0 ? "Select a rating" : `You rated us ${rating} star${rating !== 1 ? "s" : ""} ⭐`}
                  </p>
                </div>

                <div
                  className="space-y-2 animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
                  style={{ animationDelay: "500ms" }}
                >
                  <label htmlFor="feedback" className="text-sm font-medium">
                    Additional Comments
                  </label>
                  <Textarea
                    id="feedback"
                    placeholder="Tell us what you think about MockMate..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={5}
                    className="transition-all duration-200 focus:scale-[1.02] hover:shadow-md"
                  />
                </div>

                <Button
                  onClick={handleSubmitFeedback}
                  className="w-full group hover:scale-105 transition-all duration-300 hover:shadow-lg animate-in fade-in-0 slide-in-from-bottom-4"
                  style={{ animationDelay: "600ms" }}
                >
                  <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Submit Feedback</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card
            className="animate-in fade-in-0 slide-in-from-right-8 duration-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            style={{ animationDelay: "300ms" }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary animate-bounce" />
                Chat with Support
              </CardTitle>
              <CardDescription>Have questions or need help? Chat with us!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col h-[400px]">
                <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-3 bg-muted/30 rounded-md transition-all duration-300 hover:bg-muted/50">
                  {chatMessages.length === 0 ? (
                    <div className="flex items-center justify-center h-full animate-pulse">
                      <p className="text-sm text-muted-foreground">Send a message to start chatting</p>
                    </div>
                  ) : (
                    chatMessages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.isUser ? "justify-end" : "justify-start"} animate-in fade-in-0 slide-in-from-bottom-4`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg px-4 py-2 transition-all duration-200 hover:scale-105 ${
                            message.isUser
                              ? "bg-primary text-primary-foreground hover:bg-primary/90"
                              : "bg-muted hover:bg-muted/80"
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                        </div>
                      </div>
                    ))
                  )}
                  {isSending && (
                    <div className="flex justify-start animate-in fade-in-0 slide-in-from-bottom-4">
                      <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
                        <div className="flex space-x-1">
                          <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"></div>
                          <div
                            className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <form
                  onSubmit={handleSendMessage}
                  className="flex gap-2 animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
                  style={{ animationDelay: "700ms" }}
                >
                  <Textarea
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="min-h-[40px] resize-none transition-all duration-200 focus:scale-[1.02]"
                  />
                  <Button
                    type="submit"
                    disabled={!newMessage.trim() || isSending}
                    className="group hover:scale-110 transition-all duration-200"
                  >
                    <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
