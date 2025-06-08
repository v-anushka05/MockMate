"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { EmailTemplate } from "./email-service"
import { EmailPreviewModal } from "@/components/email-preview-modal"

interface EmailContextType {
  showEmailPreview: (email: EmailTemplate) => void
  lastSentEmail: EmailTemplate | null
}

const EmailContext = createContext<EmailContextType | undefined>(undefined)

export function EmailProvider({ children }: { children: ReactNode }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [currentEmail, setCurrentEmail] = useState<EmailTemplate | null>(null)

  const showEmailPreview = (email: EmailTemplate) => {
    setCurrentEmail(email)
    setIsPreviewOpen(true)
  }

  return (
    <EmailContext.Provider value={{ showEmailPreview, lastSentEmail: currentEmail }}>
      {children}
      <EmailPreviewModal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} email={currentEmail} />
    </EmailContext.Provider>
  )
}

export function useEmail() {
  const context = useContext(EmailContext)
  if (context === undefined) {
    throw new Error("useEmail must be used within an EmailProvider")
  }
  return context
}
