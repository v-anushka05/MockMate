"use client"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function Logo({ className = "", size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        className={`${sizeClasses[size]} text-primary`}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer circle representing connection */}
        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" fill="none" />

        {/* Inner elements representing people/interview */}
        <circle cx="15" cy="16" r="3" fill="currentColor" />
        <circle cx="25" cy="16" r="3" fill="currentColor" />

        {/* Connection line between people */}
        <line x1="18" y1="16" x2="22" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

        {/* Speech bubble/conversation indicator */}
        <path
          d="M12 25 C12 23, 14 22, 16 22 L24 22 C26 22, 28 23, 28 25 L28 28 C28 29, 27 30, 26 30 L18 30 L15 32 L15 30 C13 30, 12 29, 12 28 Z"
          fill="currentColor"
          opacity="0.7"
        />

        {/* Checkmark in speech bubble */}
        <path
          d="M17 26 L19 28 L23 24"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <span className={`font-bold text-primary ${size === "sm" ? "text-lg" : size === "md" ? "text-xl" : "text-2xl"}`}>
        MockMate
      </span>
    </div>
  )
}
