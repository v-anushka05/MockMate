"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { RealEmailService } from "./email-service-real"

type User = {
  id: string
  name: string
  email: string
  preferences: string[]
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string, preferences: string[]) => Promise<void>
  logout: () => void
  resetPassword: (email: string) => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is logged in from localStorage
    try {
      const storedUser = localStorage.getItem("mockmate_user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    } catch (error) {
      console.error("Error loading user from localStorage:", error)
      localStorage.removeItem("mockmate_user")
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock authentication - in a real app, this would be an API call
      if (email === "demo@example.com" && password === "password") {
        const mockUser = {
          id: "user-1",
          name: "Demo User",
          email: "demo@example.com",
          preferences: ["DSA", "HR"],
        }
        setUser(mockUser)
        localStorage.setItem("mockmate_user", JSON.stringify(mockUser))
        toast({
          title: "Login successful",
          description: "Welcome back to MockMate!",
        })
        router.push("/dashboard")
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid email or password",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An error occurred during login",
      })
    } finally {
      setLoading(false)
    }
  }

  const signup = async (name: string, email: string, password: string, preferences: string[]) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock signup - in a real app, this would be an API call
      const mockUser = {
        id: "user-" + Date.now(),
        name,
        email,
        preferences,
      }
      setUser(mockUser)
      localStorage.setItem("mockmate_user", JSON.stringify(mockUser))

      // Send welcome email using real email service
      try {
        const welcomeEmail = RealEmailService.generateWelcomeEmail(name, email)
        const emailResult = await RealEmailService.sendEmail(welcomeEmail)

        if (emailResult.success) {
          console.log("✅ Welcome email sent successfully")
        } else {
          console.error("❌ Failed to send welcome email:", emailResult.error)
        }
      } catch (error) {
        console.error("Failed to send welcome email:", error)
      }

      toast({
        title: "Signup successful",
        description: "Welcome to MockMate! Check your email for a welcome message.",
      })
      router.push("/dashboard")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: "An error occurred during signup",
      })
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("mockmate_user")
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    })
    router.push("/")
  }

  const resetPassword = async (email: string) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Send password reset email
      try {
        const resetEmail = {
          to: email,
          subject: "🔐 Reset Your MockMate Password",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #667eea;">Reset Your Password</h1>
              <p>You requested to reset your password for MockMate.</p>
              <p>Click the link below to reset your password:</p>
              <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reset-password?token=demo-token" 
                 style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Reset Password
              </a>
              <p style="margin-top: 20px; color: #666;">If you didn't request this, please ignore this email.</p>
            </div>
          `,
        }

        await RealEmailService.sendEmail(resetEmail)
      } catch (error) {
        console.error("Failed to send reset email:", error)
      }

      toast({
        title: "Password reset email sent",
        description: "Check your email for instructions to reset your password",
      })
      router.push("/login")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Password reset failed",
        description: "An error occurred during password reset",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, resetPassword, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
