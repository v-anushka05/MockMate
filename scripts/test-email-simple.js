import nodemailer from "nodemailer"

console.log("🧪 Testing email configuration...\n")

// Hardcoded configuration for testing
// IMPORTANT: Remove these values before committing to version control
const EMAIL_CONFIG = {
  host: "smtp.gmail.com",
  port: "587",
  user: "vermasonal6158@gmail.com", // Your email from the console output
  pass: "wmitifynfldhiiug", // Your app password from the console output
  testEmail: "vermasonal6158@gmail.com", // Your test email from the console output
}

console.log("🔧 Current configuration:")
console.log("Host:", EMAIL_CONFIG.host)
console.log("Port:", EMAIL_CONFIG.port)
console.log("User:", EMAIL_CONFIG.user || "❌ Not set")
console.log("Pass:", EMAIL_CONFIG.pass ? "✅ Set (hidden)" : "❌ Not set")
console.log("Test Email:", EMAIL_CONFIG.testEmail || "❌ Not set")
console.log("")

if (!EMAIL_CONFIG.user || !EMAIL_CONFIG.pass) {
  console.log("❌ Please set EMAIL_USER and EMAIL_PASS in the script or environment variables")
  console.log("💡 For quick testing, you can temporarily add them directly in the script")
  process.exit(1)
}

// Create transporter
const transporter = nodemailer.createTransport({
  host: EMAIL_CONFIG.host,
  port: Number.parseInt(EMAIL_CONFIG.port),
  secure: EMAIL_CONFIG.port === "465",
  auth: {
    user: EMAIL_CONFIG.user,
    pass: EMAIL_CONFIG.pass,
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

    if (error.message.includes("ECONNREFUSED")) {
      console.log("\n💡 Connection refused - possible causes:")
      console.log("   • Check if EMAIL_HOST is correct")
      console.log("   • Verify EMAIL_PORT is correct")
      console.log("   • Check your internet connection")
      console.log("   • Firewall might be blocking the connection")
    } else if (error.message.includes("authentication") || error.message.includes("Invalid login")) {
      console.log("\n💡 Authentication failed - possible causes:")
      console.log("   • Check EMAIL_USER (should be your full email)")
      console.log("   • Check EMAIL_PASS (use App Password for Gmail)")
      console.log("   • Enable 2-factor authentication and generate App Password")
      console.log("   • Make sure 'Less secure app access' is enabled (if not using App Password)")
    }

    return false
  }
}

async function sendTestEmail() {
  if (!EMAIL_CONFIG.testEmail) {
    console.log("❌ No test email address specified")
    return false
  }

  const mailOptions = {
    from: `"MockMate Test" <${EMAIL_CONFIG.user}>`,
    to: EMAIL_CONFIG.testEmail,
    subject: "🧪 MockMate Email Test",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #667eea;">MockMate Email Test</h1>
        <p>If you're reading this, your email configuration is working correctly! 🎉</p>
        <p>Your MockMate app can now send real emails.</p>
        <p><strong>Test Details:</strong></p>
        <ul>
          <li>Host: ${EMAIL_CONFIG.host}</li>
          <li>Port: ${EMAIL_CONFIG.port}</li>
          <li>User: ${EMAIL_CONFIG.user}</li>
          <li>Timestamp: ${new Date().toISOString()}</li>
        </ul>
        <hr>
        <p style="color: #666; font-size: 12px;">This is a test email from MockMate</p>
      </div>
    `,
  }

  try {
    console.log(`📧 Sending test email to: ${EMAIL_CONFIG.testEmail}`)
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
  console.log("🔧 Gmail Setup Guide:")
  console.log("1. Go to Google Account settings")
  console.log("2. Security → 2-Step Verification (enable)")
  console.log("3. Security → App passwords")
  console.log("4. Generate password for 'Mail'")
  console.log("5. Use the 16-character password in EMAIL_PASS")
  console.log("\n📧 Common Gmail settings:")
  console.log("   EMAIL_HOST=smtp.gmail.com")
  console.log("   EMAIL_PORT=587")
  console.log("   EMAIL_USER=vermasonal6158@gmail.com")
  console.log("   EMAIL_PASS=wmitifynfldhiiug")

  process.exit(connectionSuccess ? 0 : 1)
}

main()
