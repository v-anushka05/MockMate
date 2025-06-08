import { config } from "dotenv"
import nodemailer from "nodemailer"

// Load environment variables
config({ path: ".env.local" })

console.log("🧪 Testing email configuration...\n")

// Debug environment variables
console.log("📋 Environment Variables:")
console.log("EMAIL_HOST:", process.env.EMAIL_HOST || "❌ Not set")
console.log("EMAIL_PORT:", process.env.EMAIL_PORT || "❌ Not set")
console.log("EMAIL_USER:", process.env.EMAIL_USER || "❌ Not set")
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "✅ Set (hidden)" : "❌ Not set")
console.log("TEST_EMAIL:", process.env.TEST_EMAIL || "❌ Not set")
console.log("")

// Check if required variables are set
const requiredVars = ["EMAIL_HOST", "EMAIL_PORT", "EMAIL_USER", "EMAIL_PASS"]
const missingVars = requiredVars.filter((varName) => !process.env[varName])

if (missingVars.length > 0) {
  console.log("❌ Missing required environment variables:", missingVars.join(", "))
  console.log("Please create a .env.local file with the required variables")
  process.exit(1)
}

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number.parseInt(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_PORT === "465", // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
})

async function testEmailConnection() {
  try {
    console.log("🔌 Testing SMTP connection...")
    await transporter.verify()
    console.log("✅ SMTP connection successful!")
    return true
  } catch (error) {
    console.log("❌ SMTP connection failed:", error.message)

    // Provide specific error guidance
    if (error.message.includes("ECONNREFUSED")) {
      console.log("\n💡 Connection refused - possible causes:")
      console.log("   • Check if EMAIL_HOST is correct")
      console.log("   • Verify EMAIL_PORT is correct")
      console.log("   • Check your internet connection")
      console.log("   • Firewall might be blocking the connection")
    } else if (error.message.includes("authentication")) {
      console.log("\n💡 Authentication failed - possible causes:")
      console.log("   • Check EMAIL_USER (should be your full email)")
      console.log("   • Check EMAIL_PASS (use App Password for Gmail)")
      console.log("   • Enable 2-factor authentication and generate App Password")
    }

    return false
  }
}

async function sendTestEmail() {
  const testEmail = process.env.TEST_EMAIL || process.env.EMAIL_USER

  if (!testEmail) {
    console.log("❌ No test email address specified")
    return false
  }

  const mailOptions = {
    from: `"MockMate Test" <${process.env.EMAIL_USER}>`,
    to: testEmail,
    subject: "🧪 MockMate Email Test",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #667eea;">MockMate Email Test</h1>
        <p>If you're reading this, your email configuration is working correctly! 🎉</p>
        <p>Your MockMate app can now send real emails.</p>
        <p><strong>Test Details:</strong></p>
        <ul>
          <li>Host: ${process.env.EMAIL_HOST}</li>
          <li>Port: ${process.env.EMAIL_PORT}</li>
          <li>User: ${process.env.EMAIL_USER}</li>
          <li>Timestamp: ${new Date().toISOString()}</li>
        </ul>
        <hr>
        <p style="color: #666; font-size: 12px;">This is a test email from MockMate</p>
      </div>
    `,
  }

  try {
    console.log(`📧 Sending test email to: ${testEmail}`)
    const info = await transporter.sendMail(mailOptions)
    console.log("✅ Test email sent successfully!")
    console.log(`📬 Message ID: ${info.messageId}`)
    return true
  } catch (error) {
    console.log("❌ Failed to send test email:", error.message)
    return false
  }
}

async function main() {
  const connectionSuccess = await testEmailConnection()

  if (connectionSuccess) {
    await sendTestEmail()
  }

  console.log("\n" + "=".repeat(50))
  console.log("🔧 Quick Setup Guide:")
  console.log("1. Create .env.local file in project root")
  console.log("2. Add your email configuration:")
  console.log("   EMAIL_HOST=smtp.gmail.com")
  console.log("   EMAIL_PORT=587")
  console.log("   EMAIL_USER=your-email@gmail.com")
  console.log("   EMAIL_PASS=your-app-password")
  console.log("   TEST_EMAIL=your-test-email@gmail.com")
  console.log("\n📧 For Gmail:")
  console.log("• Enable 2-factor authentication")
  console.log("• Generate App Password in Google Account settings")
  console.log("• Use the 16-character App Password (not your regular password)")

  process.exit(connectionSuccess ? 0 : 1)
}

main()
