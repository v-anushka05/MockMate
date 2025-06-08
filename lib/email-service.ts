// Client-side email service that calls the API route
export interface EmailTemplate {
  to: string
  subject: string
  html: string
}

export class EmailService {
  static async sendEmail(template: EmailTemplate): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(template),
      })

      const result = await response.json()

      if (result.success) {
        console.log("✅ Email sent successfully via API")

        // Dispatch a custom event for the EmailContext
        if (typeof window !== "undefined") {
          const event = new CustomEvent("mockmate:email-sent", {
            detail: { email: template },
          })
          window.dispatchEvent(event)
        }
      }

      return result
    } catch (error) {
      console.error("Failed to send email:", error)
      return { success: false, error: (error as Error).message }
    }
  }

  static generateWelcomeEmail(name: string, email: string): EmailTemplate {
    return {
      to: email,
      subject: "🎉 Welcome to MockMate, " + name + "!",
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
            .feature-grid { display: grid; grid-template-columns: 1fr; gap: 20px; margin: 30px 0; }
            .feature-item { border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; }
            .feature-icon { font-size: 24px; margin-bottom: 10px; }
            .feature-title { font-weight: bold; color: #2d3748; margin-bottom: 5px; }
            .feature-desc { color: #718096; font-size: 14px; }
            .cta-button { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; border-radius: 8px; text-decoration: none; display: inline-block; font-weight: bold; margin: 10px 5px; }
            .testimonial { background-color: #f7fafc; border-left: 4px solid #667eea; padding: 20px; margin: 30px 0; font-style: italic; }
            .footer { background-color: #2d3748; color: white; padding: 30px 20px; text-align: center; }
            .footer-links { margin-bottom: 20px; }
            .footer-link { color: #a0aec0; text-decoration: none; margin: 0 15px; }
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
              
              <h3>Here's what you can do next:</h3>
              
              <div class="feature-grid">
                <div class="feature-item">
                  <div class="feature-icon">📝</div>
                  <div class="feature-title">Build your profile and highlight your skills</div>
                  <div class="feature-desc">Complete your profile to get personalized interview recommendations</div>
                  <a href="http://localhost:3000/profile" class="cta-button">Set up now</a>
                </div>
                
                <div class="feature-item">
                  <div class="feature-icon">🤝</div>
                  <div class="feature-title">Schedule and join mock interviews with peers</div>
                  <div class="feature-desc">Practice with expert interviewers from top companies</div>
                  <a href="http://localhost:3000/schedule" class="cta-button">Find a slot</a>
                </div>
                
                <div class="feature-item">
                  <div class="feature-icon">📈</div>
                  <div class="feature-title">Track your progress and get personalized feedback</div>
                  <div class="feature-desc">Monitor your improvement with detailed analytics</div>
                </div>
                
                <div class="feature-item">
                  <div class="feature-icon">💡</div>
                  <div class="feature-title">Explore our resources</div>
                  <div class="feature-desc">Access interview guides, tips, and practice questions</div>
                  <a href="http://localhost:3000/resources" class="cta-button">See tips</a>
                </div>
              </div>
              
              <div style="text-align: center; margin: 40px 0;">
                <a href="http://localhost:3000/dashboard" class="cta-button" style="font-size: 18px; padding: 20px 40px;">Go to MockMate Dashboard</a>
              </div>
              
              <div class="testimonial">
                "MockMate helped me gain real confidence for my interviews. The peer feedback and mock sessions are game changers!" – Rahul, IIT Delhi
              </div>
              
              <p>Have questions? Just reply to this email or visit our FAQ. We're here to help!</p>
            </div>
            
            <div class="footer">
              <div class="footer-links">
                <a href="http://localhost:3000/about" class="footer-link">About MockMate</a>
                <a href="http://localhost:3000/faq" class="footer-link">FAQ</a>
                <a href="http://localhost:3000/support" class="footer-link">Contact Support</a>
              </div>
              <div>© 2025 MockMate. All rights reserved.</div>
            </div>
          </div>
        </body>
        </html>
      `,
    }
  }

  static generateInterviewConfirmationEmail(
    userName: string,
    userEmail: string,
    interviewDetails: {
      subject: string
      interviewer: string
      interviewerEmail: string
      date: string
      time: string
      meetingLink: string
      expertise: string[]
    },
  ): EmailTemplate {
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

    const getQuestionsForSubject = (subject: string) => {
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
            .disclaimer { font-size: 12px; color: #a0aec0; margin-top: 20px; }
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
                
                <div class="detail-row">
                  <span class="detail-label">Interviewer's Expertise:</span>
                  <span class="detail-value">${interviewDetails.expertise.join(", ")}</span>
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
              
              <div style="text-align: center; margin: 40px 0; padding: 30px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 8px; color: white;">
                <h3 style="margin: 0 0 10px 0;">Best of luck with your interview! 🚀</h3>
                <p style="margin: 0;">We're rooting for you!</p>
              </div>
              
              <p><strong>Best regards,</strong><br>The MockMate Team</p>
            </div>
            
            <div class="footer">
              <div>© 2025 MockMate. All rights reserved.</div>
              <div class="disclaimer">This is an automated message. Please do not reply to this email.</div>
            </div>
          </div>
        </body>
        </html>
      `,
    }
  }
}
