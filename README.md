# 🚀 MockMate – Real-Time Mock Interview Platform

MockMate is a full-stack web application built to simulate real-world interview experiences. It allows users to schedule mock interviews, receive real-time email notifications, and manage their profile, feedback, and more—all in one modern platform.

![MockMate Banner](public/placeholder-logo.png)

## 🌐 Live Demo

🔗 [Visit the App](https://mockmate-interview-platform.netlify.app/)  
📦 [GitHub Repository](https://github.com/v-anushka05/MockMate)

---

## 📌 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

- 🔐 JWT Authentication with secure HTTP-only cookies
- 📅 Timezone-aware interview slot booking system
- 📧 Real-time email notifications (confirmation, reminders, etc.)
- 📄 Dashboard with upcoming & past interviews
- 📝 Feedback system with auto-save notes
- 🖼️ Responsive and accessible UI
- 🧪 Form validation using Zod
- 🔒 Email verification & password reset flows

---

## 🛠️ Tech Stack

### **Frontend**
- [Next.js 15 (App Router)](https://nextjs.org/)
- [React 19](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Shadcn UI](https://ui.shadcn.com/)

### **Backend**
- Next.js API Routes
- MongoDB + Mongoose
- Nodemailer (Email service)
- bcrypt (Password hashing)
- JSON Web Token (JWT)

### **DevOps**
- GitHub Actions (CI/CD)
- Hosted on [Netlify](https://www.netlify.com/)
- ESLint + Prettier + TypeScript Strict Mode

---

## 🖼️ Screenshots

> Add screenshots or GIFs here (e.g., dashboard, slot booking, email preview)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB URI (You can use MongoDB Atlas for free)
- SMTP credentials for Nodemailer

### Installation

```bash
git clone https://github.com/v-anushka05/MockMate.git
cd MockMate
npm install
