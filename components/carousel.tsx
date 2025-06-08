"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CarouselItem {
  imageUrl: string
  alt: string
  title: string
  description: string
  caption: string
}

const images: CarouselItem[] = [
  {
    imageUrl: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Team Meeting",
    title: "Ace Your Next Interview",
    description: "Prepare with real interview questions and scenarios from top companies",
    caption: "Be interview-ready"
  },
  {
    imageUrl: "https://images.pexels.com/photos/3182765/pexels-photo-3182765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Professional Handshake",
    title: "Make a Great Impression",
    description: "Learn how to present yourself professionally in interviews",
    caption: "First impressions matter"
  },
  {
    imageUrl: "https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Technical Interview",
    title: "Technical Interview Prep",
    description: "Master coding challenges and system design interviews",
    caption: "Crack the code"
  },
  {
    imageUrl: "https://images.pexels.com/photos/3762940/pexels-photo-3762940.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Confident Candidate",
    title: "Build Confidence",
    description: "Gain the confidence to impress your interviewers",
    caption: "Confidence is key"
  },
  {
    imageUrl: "https://images.pexels.com/photos/3183172/pexels-photo-3183172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Career Growth",
    title: "Land Your Dream Job",
    description: "Get the skills and confidence to secure your ideal position",
    caption: "Your future starts here"
  }
]

export function Carousel() {
  const [current, setCurrent] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const next = () => {
    setCurrent((prev) => (prev + 1) % images.length)
  }

  const previous = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length)
  }

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [])

  // Preload images with better error handling
  useEffect(() => {
    let isMounted = true
    
    const loadImages = async () => {
      try {
        const imagePromises = images.map((image) => {
          return new Promise<void>((resolve) => {
            const img = new Image()
            img.src = image.imageUrl
            img.onload = () => isMounted && resolve()
            img.onerror = () => {
              console.warn(`Failed to load image: ${image.imageUrl}`)
              if (isMounted) resolve() // Continue even if some images fail to load
            }
          })
        })

        await Promise.all(imagePromises)
      } catch (error) {
        console.error('Error in image loading:', error)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadImages()
    
    return () => {
      isMounted = false
    }
  }, [])

  if (isLoading) {
    return (
      <div className="relative w-full max-w-5xl mx-auto h-[500px] flex items-center justify-center bg-gray-100 rounded-xl">
        <div className="animate-pulse text-gray-400">Loading images...</div>
      </div>
    )
  }

  return (
    <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-xl shadow-2xl">
      <div className="relative h-[400px] md:h-[500px] w-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              index === current ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            aria-hidden={index !== current}
          >
            <div 
              className="w-full h-full bg-cover bg-center" 
              style={{ 
                backgroundImage: `url(${image.imageUrl})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
              role="img"
              aria-label={image.alt}
            >
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center p-8 text-white">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">{image.title}</h2>
                  <p className="text-lg md:text-xl opacity-90 max-w-2xl">{image.description}</p>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
              <p className="text-lg font-medium">{image.caption}</p>
            </div>
          </div>
        ))}
      </div>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background z-10"
        onClick={previous}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background z-10"
        onClick={next}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
      
      <div className="absolute bottom-4 left-0 right-0">
        <div className="flex items-center justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === current ? "bg-white w-6" : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === current ? 'true' : 'false'}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
