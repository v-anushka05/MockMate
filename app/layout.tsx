import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Providers } from "./providers"
import { EmailNotification } from "@/components/email-notification"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "MockMate - Your Mock Interview Platform",
  description: "Practice interviews with expert interviewers",
  generator: 'v0.dev',
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Providers>
            {children}
            <EmailNotification />
            <Toaster />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
