import nodemailer from "nodemailer"

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  // Hardcoded configuration for production use
  // IMPORTANT: In production, use environment variables instead
  const config = {
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: Number.parseInt(process.env.EMAIL_PORT || "587"),
    secure: process.env.EMAIL_PORT === "465",
    auth: {
      user: process.env.EMAIL_USER || "vermasonal6158@gmail.com", // Your email
      pass: process.env.EMAIL_PASS || "wmitifynfldhiiug", // Your app password
    },
    tls: {
      rejectUnauthorized: false, // For development only
    },
  }

  return nodemailer.createTransport(config)
}

export async function sendRealEmail({ to, subject, html }) {
  try {
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

    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("❌ Error sending email:", error)
    return { success: false, error: error.message }
  }
}

// Test email function
export async function testEmailConnection() {
  try {
    const transporter = createTransporter()
    await transporter.verify()
    console.log("✅ Email connection test successful!")
    return true
  } catch (error) {
    console.error("❌ Email connection test failed:", error.message)
    return false
  }
}

// Updated EmailService class with real email sending
export class RealEmailService {
  static async sendEmail(template) {
    return await sendRealEmail(template)
  }

  static generateWelcomeEmail(name, email) {
    return {
      to: email,
      subject: `🎉 Welcome to MockMate, ${name}!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to MockMate</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }
            .container { max-width: 600px; margin: 0 auto; background-color: white; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; }
            .logo { color: white; font-size: 32px; font-weight: bold; margin-bottom: 10px; }
            .badge { background-color: rgba(255,255,255,0.2); color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; display: inline-block; }
            .content { padding: 40px 20px; }
            .welcome-title { font-size: 28px; font-weight: bold; color: #1a202c; margin-bottom: 10px; }
            .subtitle { font-size: 18px; color: #4a5568; margin-bottom: 30px; }
            .celebration { font-size: 48px; text-align: center; margin: 20px 0; }
            .cta-button { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; border-radius: 8px; text-decoration: none; display: inline-block; font-weight: bold; margin: 10px 5px; }
            .footer { background-color: #2d3748; color: white; padding: 30px 20px; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">MockMate</div>
              <div class="badge">🚀 New Member</div>
            </div>
            
            <div class="content">
              <h1 class="welcome-title">Welcome, ${name}! 🎉</h1>
              <p class="subtitle">You're officially a MockMate!</p>
              
              <div class="celebration">🎉</div>
              
              <p>We're thrilled to have you join MockMate – your new partner for interview prep, peer learning, and career growth!</p>
              
              <div style="text-align: center; margin: 40px 0;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard" class="cta-button" style="font-size: 18px; padding: 20px 40px;">Go to MockMate Dashboard</a>
              </div>
              
              <p>Have questions? Just reply to this email or visit our FAQ. We're here to help!</p>
            </div>
            
            <div class="footer">
              <div>© 2025 MockMate. All rights reserved.</div>
            </div>
          </div>
        </body>
        </html>
      `,
    }
  }

  static generateInterviewConfirmationEmail(userName, userEmail, interviewDetails) {
    const prepQuestions = {
      hr: [
        "Where do you see yourself in 5 years?",
        "Why should we hire you?",
        "Tell me about a time you faced a challenge at work",
        "What are your greatest strengths and weaknesses?",
      ],
      dsa: [
        "Difference between stack and queue",
        "Explain recursion with an example",
        "Implement a binary search algorithm",
        "Find the time complexity of nested loops",
      ],
      os: [
        "Explain CPU scheduling",
        "Difference between process and thread",
        "What is virtual memory?",
        "Explain deadlock and its prevention",
      ],
      dbms: [
        "Explain ACID properties",
        "Difference between SQL and NoSQL",
        "What is database normalization?",
        "Explain different types of joins",
      ],
    }

    const getQuestionsForSubject = (subject) => {
      const subjectKey = subject.toLowerCase().replace(/[^a-z]/g, "")
      if (subjectKey.includes("hr") || subjectKey.includes("human")) return prepQuestions.hr
      if (subjectKey.includes("dsa") || subjectKey.includes("algorithm")) return prepQuestions.dsa
      if (subjectKey.includes("os") || subjectKey.includes("operating")) return prepQuestions.os
      if (subjectKey.includes("dbms") || subjectKey.includes("database")) return prepQuestions.dbms
      return prepQuestions.hr // default
    }

    const questions = getQuestionsForSubject(interviewDetails.subject)

    return {
      to: userEmail,
      subject: "🎯 Your Mock Interview is Confirmed!",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Interview Confirmed</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }
            .container { max-width: 600px; margin: 0 auto; background-color: white; }
            .header { background: linear-gradient(135deg, #48bb78 0%, #38a169 100%); padding: 40px 20px; text-align: center; color: white; }
            .logo { font-size: 32px; font-weight: bold; margin-bottom: 10px; }
            .content { padding: 40px 20px; }
            .title { font-size: 28px; font-weight: bold; color: #1a202c; margin-bottom: 20px; text-align: center; }
            .details-box { background-color: #f7fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 25px; margin: 25px 0; }
            .detail-row { display: flex; justify-content: space-between; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #e2e8f0; }
            .detail-row:last-child { margin-bottom: 0; padding-bottom: 0; border-bottom: none; }
            .detail-label { font-weight: bold; color: #2d3748; }
            .detail-value { color: #4a5568; }
            .meeting-link { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 25px; border-radius: 8px; text-decoration: none; display: inline-block; font-weight: bold; margin: 20px 0; }
            .prep-section { margin: 30px 0; }
            .prep-title { font-size: 20px; font-weight: bold; color: #2d3748; margin-bottom: 15px; }
            .questions-list { background-color: #f7fafc; border-radius: 8px; padding: 20px; }
            .question-item { margin-bottom: 10px; padding-left: 20px; position: relative; }
            .question-item:before { content: "•"; color: #667eea; font-weight: bold; position: absolute; left: 0; }
            .footer { background-color: #2d3748; color: white; padding: 30px 20px; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">MockMate</div>
              <div style="font-size: 18px;">🎉 Interview Confirmed! 🎉</div>
            </div>
            
            <div class="content">
              <h1 class="title">Hello ${userName},</h1>
              
              <p>Your mock interview has been successfully scheduled with <strong>${interviewDetails.interviewer}</strong> on <strong>${interviewDetails.date}</strong>.</p>
              
              <div class="details-box">
                <h3 style="margin-top: 0; color: #2d3748;">Interview Details</h3>
                
                <div class="detail-row">
                  <span class="detail-label">Date & Time:</span>
                  <span class="detail-value">${interviewDetails.date} at ${interviewDetails.time}</span>
                </div>
                
                <div class="detail-row">
                  <span class="detail-label">Subject:</span>
                  <span class="detail-value">${interviewDetails.subject}</span>
                </div>
                
                <div class="detail-row">
                  <span class="detail-label">Interviewer:</span>
                  <span class="detail-value">${interviewDetails.interviewer} (${interviewDetails.interviewerEmail})</span>
                </div>
                
                <div style="text-align: center; margin-top: 25px;">
                  <a href="${interviewDetails.meetingLink}" class="meeting-link">Join Google Meet</a>
                </div>
              </div>
              
              <div class="prep-section">
                <h3 class="prep-title">Prepare for Your Interview</h3>
                <p>Here are some questions that might help you prepare:</p>
                
                <div class="questions-list">
                  <h4 style="margin-top: 0; color: #2d3748;">${interviewDetails.subject} Questions</h4>
                  ${questions.map((question) => `<div class="question-item">${question}</div>`).join("")}
                </div>
              </div>
              
              <p><strong>Best regards,</strong><br>The MockMate Team</p>
            </div>
            
            <div class="footer">
              <div>© 2025 MockMate. All rights reserved.</div>
            </div>
          </div>
        </body>
        </html>
      `,
    }
  }
}
