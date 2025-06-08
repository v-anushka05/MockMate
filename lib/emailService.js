import nodemailer from "nodemailer"

// Create transporter
const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function sendEmail({ to, subject, html }) {
  try {
    const info = await transporter.sendMail({
      from: `"MockMate" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    })

    console.log("✅ Email sent successfully:", info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("❌ Error sending email:", error)
    return { success: false, error: error.message }
  }
}

export function generateWelcomeEmail(name, email) {
  return {
    to: email,
    subject: `🎉 Welcome to MockMate, ${name}!`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Welcome to MockMate</title>
      </head>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; color: white; border-radius: 8px;">
          <h1 style="margin: 0; font-size: 32px;">MockMate</h1>
          <p style="margin: 10px 0 0 0; font-size: 18px;">🚀 New Member</p>
        </div>
        
        <div style="padding: 40px 20px;">
          <h2 style="color: #1a202c;">Welcome, ${name}! 🎉</h2>
          <p style="color: #4a5568; font-size: 18px;">You're officially a MockMate!</p>
          
          <p>We're thrilled to have you join MockMate – your new partner for interview prep and career growth!</p>
          
          <div style="text-align: center; margin: 40px 0;">
            <a href="http://localhost:3000/dashboard" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; border-radius: 8px; text-decoration: none; font-weight: bold;">Go to Dashboard</a>
          </div>
          
          <p><strong>Best regards,</strong><br>The MockMate Team</p>
        </div>
      </body>
      </html>
    `,
  }
}

export function generateInterviewConfirmationEmail(userName, userEmail, interviewDetails) {
  return {
    to: userEmail,
    subject: "🎯 Your Mock Interview is Confirmed!",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Interview Confirmed</title>
      </head>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #48bb78 0%, #38a169 100%); padding: 40px 20px; text-align: center; color: white; border-radius: 8px;">
          <h1 style="margin: 0; font-size: 32px;">MockMate</h1>
          <p style="margin: 10px 0 0 0; font-size: 18px;">🎉 Interview Confirmed! 🎉</p>
        </div>
        
        <div style="padding: 40px 20px;">
          <h2 style="color: #1a202c;">Hello ${userName},</h2>
          
          <p>Your mock interview has been successfully scheduled with <strong>${interviewDetails.interviewer}</strong> on <strong>${interviewDetails.date}</strong>.</p>
          
          <div style="background-color: #f7fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 25px; margin: 25px 0;">
            <h3 style="margin-top: 0; color: #2d3748;">Interview Details</h3>
            <p><strong>Date & Time:</strong> ${interviewDetails.date} at ${interviewDetails.time}</p>
            <p><strong>Subject:</strong> ${interviewDetails.subject}</p>
            <p><strong>Interviewer:</strong> ${interviewDetails.interviewer}</p>
            <p><strong>Meeting Link:</strong> <a href="${interviewDetails.meetingLink}">${interviewDetails.meetingLink}</a></p>
          </div>
          
          <p><strong>Best regards,</strong><br>The MockMate Team</p>
        </div>
      </body>
      </html>
    `,
  }
}
