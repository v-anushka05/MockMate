"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { EmailTemplate } from "@/lib/email-service"

interface EmailPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  email: EmailTemplate | null
}

export function EmailPreviewModal({ isOpen, onClose, email }: EmailPreviewModalProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "html">("preview")

  if (!email) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Email Preview: {email.subject}</DialogTitle>
          <DialogDescription>This is how the email would appear if sent to {email.to}</DialogDescription>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "preview" | "html")}
          className="flex-1 overflow-hidden flex flex-col"
        >
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="html">HTML Source</TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="flex-1 overflow-auto">
            <div className="border rounded-md h-full">
              <iframe
                srcDoc={email.html}
                title="Email Preview"
                className="w-full h-full min-h-[500px]"
                sandbox="allow-same-origin"
              />
            </div>
          </TabsContent>

          <TabsContent value="html" className="flex-1 overflow-auto">
            <pre className="bg-muted p-4 rounded-md overflow-auto text-xs max-h-[500px]">{email.html}</pre>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
