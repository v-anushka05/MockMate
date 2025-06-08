"use client"

import type React from "react"

import { AuthProvider } from "@/lib/auth-context"
import { EmailProvider } from "@/lib/email-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <EmailProvider>{children}</EmailProvider>
    </AuthProvider>
  )
}
