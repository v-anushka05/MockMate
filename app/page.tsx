import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Carousel } from "@/components/carousel"
import { Logo } from "@/components/logo"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 overflow-hidden">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4 animate-in fade-in-0 slide-in-from-left-8 duration-700">
                <div
                  className="flex items-center gap-3 mb-6 animate-in fade-in-0 slide-in-from-left-4 duration-500"
                  style={{ animationDelay: "200ms" }}
                >
                  <Logo size="lg" />
                </div>
                <h1
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl animate-in fade-in-0 slide-in-from-left-6 duration-700"
                  style={{ animationDelay: "300ms" }}
                >
                  <span className="bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent animate-pulse">
                    Ace Your Next Interview
                  </span>
                  <br />
                  <span className="text-foreground">with MockMate</span>
                </h1>
                <p
                  className="text-muted-foreground md:text-xl animate-in fade-in-0 slide-in-from-left-4 duration-600"
                  style={{ animationDelay: "500ms" }}
                >
                  Practice with expert interviewers and get personalized feedback to improve your skills. Our platform
                  helps you prepare for technical and behavioral interviews.
                </p>
                <div
                  className="flex flex-col sm:flex-row gap-4 animate-in fade-in-0 slide-in-from-left-4 duration-500"
                  style={{ animationDelay: "700ms" }}
                >
                  <Button
                    size="lg"
                    asChild
                    className="group hover:scale-105 transition-all duration-300 hover:shadow-lg"
                  >
                    <Link href="/signup">
                      <span className="group-hover:translate-x-1 transition-transform duration-200">Get Started</span>
                      <div className="ml-2 group-hover:translate-x-1 transition-transform duration-200">🚀</div>
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="group hover:scale-105 transition-all duration-300 hover:shadow-md hover:bg-primary hover:text-primary-foreground"
                  >
                    <Link href="/schedule">
                      <span className="group-hover:translate-x-1 transition-transform duration-200">Schedule Now</span>
                      <div className="ml-2 group-hover:translate-x-1 transition-transform duration-200">📅</div>
                    </Link>
                  </Button>
                </div>
              </div>
              <div
                className="animate-in fade-in-0 slide-in-from-right-8 duration-700"
                style={{ animationDelay: "400ms" }}
              >
                <div className="transform hover:scale-105 transition-transform duration-500">
                  <Carousel />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="w-full py-12 md:py-24 lg:py-32 bg-muted animate-in fade-in-0 slide-in-from-bottom-8 duration-700"
          style={{ animationDelay: "900ms" }}
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div
                className="space-y-2 animate-in fade-in-0 slide-in-from-bottom-4 duration-600"
                style={{ animationDelay: "1000ms" }}
              >
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    Why Choose MockMate?
                  </span>
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  Our platform offers unique features to help you succeed in your interviews
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-5xl">
                {features.map((feature, index) => (
                  <div
                    key={feature.title}
                    className="flex flex-col items-center space-y-2 p-4 border rounded-lg bg-background group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 cursor-pointer animate-in fade-in-0 slide-in-from-bottom-4"
                    style={{ animationDelay: `${1200 + index * 100}ms` }}
                  >
                    <div className="p-2 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors duration-300 group-hover:scale-110 transform">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-200">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground text-center group-hover:text-foreground transition-colors duration-200">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer
        className="border-t py-6 md:py-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
        style={{ animationDelay: "1600ms" }}
      >
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 text-center">
          <div className="hover:scale-110 transition-transform duration-300">
            <Logo size="sm" />
          </div>
          <p className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
            © {new Date().getFullYear()} MockMate. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    title: "Expert Interviewers",
    description: "Connect with professionals from top companies for realistic interview practice",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 text-primary group-hover:animate-pulse"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
  },
  {
    title: "Personalized Feedback",
    description: "Receive detailed feedback to improve your interview performance",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 text-primary group-hover:animate-pulse"
      >
        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
      </svg>
    ),
  },
  {
    title: "Flexible Scheduling",
    description: "Book interviews at times that work for your schedule",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 text-primary group-hover:animate-pulse"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    ),
  },
  {
    title: "Progress Tracking",
    description: "Monitor your improvement over time with detailed analytics",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 text-primary group-hover:animate-pulse"
      >
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
      </svg>
    ),
  },
]
