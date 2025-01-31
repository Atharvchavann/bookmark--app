"use client"

import { useState, useEffect, useRef } from "react"
import type { Bookmark } from "../page"
import BookmarkItem from "./BookmarkItem"

interface BookmarkListProps {
  bookmarks: Bookmark[]
  updateBookmark: (id: string, updatedBookmark: Partial<Bookmark>) => void
  deleteBookmark: (id: string) => void
  className?: string
}

export default function BookmarkList({ bookmarks, updateBookmark, deleteBookmark, className = "" }: BookmarkListProps) {
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const bookmarkRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return // Don't handle if input is active

      if (e.key === "ArrowDown") {
        e.preventDefault()
        setFocusedIndex((prev) => (prev < bookmarks.length - 1 ? prev + 1 : prev))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev))
      } else if (e.key === "Enter" && focusedIndex !== -1) {
        e.preventDefault()
        window.open(bookmarks[focusedIndex].url, "_blank")
      } else if (e.key.toLowerCase() === "e" && focusedIndex !== -1) {
        e.preventDefault()
        const bookmarkRef = bookmarkRefs.current[focusedIndex]
        if (bookmarkRef) {
          const editButton = bookmarkRef.querySelector('button[aria-label="Edit"]')
          if (editButton instanceof HTMLButtonElement) {
            editButton.click()
          }
        }
      } else if (e.key === "Delete" && focusedIndex !== -1) {
        e.preventDefault()
        deleteBookmark(bookmarks[focusedIndex].id)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [bookmarks, focusedIndex])

  useEffect(() => {
    if (focusedIndex !== -1) {
      bookmarkRefs.current[focusedIndex]?.focus()
    }
  }, [focusedIndex])

  return (
    <div className={className}>
      {bookmarks.map((bookmark, index) => (
        <BookmarkItem
          key={bookmark.id}
          bookmark={bookmark}
          updateBookmark={updateBookmark}
          deleteBookmark={deleteBookmark}
          isFocused={index === focusedIndex}
          ref={(el) => (bookmarkRefs.current[index] = el)}
        />
      ))}
    </div>
  )
}

