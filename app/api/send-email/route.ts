import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: Number.parseInt(process.env.EMAIL_PORT || "587"),
    secure: process.env.EMAIL_PORT === "465",
    auth: {
      user: process.env.EMAIL_USER || "vermasonal6158@gmail.com",
      pass: process.env.EMAIL_PASS || "wmitifynfldhiiug",
    },
    tls: {
      rejectUnauthorized: false,
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const { to, subject, html } = await request.json()

    if (!to || !subject || !html) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const transporter = createTransporter()

    // Verify connection configuration
    await transporter.verify()
    console.log("✅ SMTP server is ready to take our messages")

    const info = await transporter.sendMail({
      from: `"MockMate" <${process.env.EMAIL_USER || "vermasonal6158@gmail.com"}>`,
      to,
      subject,
      html,
    })

    console.log("✅ Email sent successfully:", {
      messageId: info.messageId,
      to,
      subject,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ success: true, messageId: info.messageId })
  } catch (error) {
    console.error("❌ Error sending email:", error)
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 })
  }
}
