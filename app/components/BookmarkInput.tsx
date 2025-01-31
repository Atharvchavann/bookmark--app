"use client"

import type React from "react"
import { forwardRef, useState, useRef, useEffect } from "react"
import type { Bookmark } from "../page"
import { isValidUrl, isValidColor } from "../utils/validators"

interface BookmarkInputProps {
  addBookmark: (bookmark: Bookmark) => void
}

const BookmarkInput = forwardRef<HTMLInputElement, BookmarkInputProps>(({ addBookmark }, ref) => {
  const [input, setInput] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    let url = input
    let name = input
    let color

    if (isValidUrl(input)) {
      try {
        const urlObj = new URL(input)
        name = urlObj.hostname
        url = urlObj.href
      } catch (error) {
        console.error("Invalid URL:", error)
      }
    } else if (isValidColor(input)) {
      color = input
      name = input
      url = `https://www.google.com/search?q=${encodeURIComponent(input)}`
    }

    addBookmark({
      id: Date.now().toString(),
      name,
      url,
      color,
    })

    setInput("")
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <input
        ref={ref}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter URL, file name, or color"
        className="w-full p-4 text-lg border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition duration-200 ease-in-out"
      />
    </form>
  )
})

BookmarkInput.displayName = "BookmarkInput"

export default BookmarkInput

