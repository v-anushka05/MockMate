"use client"

import { useState, useEffect } from "react"
import { useEmail } from "@/lib/email-context"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import type { EmailTemplate } from "@/lib/email-service"
import { toast } from "@/components/ui/use-toast"

export function EmailNotification() {
  const { showEmailPreview } = useEmail()
  const [latestEmail, setLatestEmail] = useState<EmailTemplate | null>(null)
  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    const handleEmailSent = (event: Event) => {
      const customEvent = event as CustomEvent<{ email: EmailTemplate }>
      const email = customEvent.detail.email

      setLatestEmail(email)
      setShowNotification(true)

      toast({
        title: "Email Sent",
        description: `"${email.subject}" sent to ${email.to}`,
        action: (
          <Button variant="outline" size="sm" onClick={() => showEmailPreview(email)}>
            View
          </Button>
        ),
      })

      // Auto-hide after 10 seconds
      setTimeout(() => {
        setShowNotification(false)
      }, 10000)
    }

    window.addEventListener("mockmate:email-sent", handleEmailSent as EventListener)

    return () => {
      window.removeEventListener("mockmate:email-sent", handleEmailSent as EventListener)
    }
  }, [showEmailPreview])

  if (!showNotification || !latestEmail) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-card border shadow-lg rounded-lg p-4 max-w-md animate-in slide-in-from-bottom-5">
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <Mail className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-sm">Email Sent</h4>
            <p className="text-xs text-muted-foreground mt-1 mb-2">
              "{latestEmail.subject}" sent to {latestEmail.to}
            </p>
            <div className="flex gap-2">
              <Button size="sm" variant="default" className="text-xs h-7" onClick={() => showEmailPreview(latestEmail)}>
                View Email
              </Button>
              <Button size="sm" variant="ghost" className="text-xs h-7" onClick={() => setShowNotification(false)}>
                Dismiss
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
