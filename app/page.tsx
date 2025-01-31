"use client"

import { useState, useEffect, useRef } from "react"
import BookmarkInput from "./components/BookmarkInput"
import BookmarkList from "./components/BookmarkList"
import ShortcutHelp from "./components/ShortcutHelp"

export interface Bookmark {
  id: string
  name: string
  url: string
  color?: string
}

export default function Home() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const storedBookmarks = localStorage.getItem("bookmarks")
    if (storedBookmarks) {
      setBookmarks(JSON.parse(storedBookmarks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
  }, [bookmarks])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const addBookmark = (bookmark: Bookmark) => {
    setBookmarks([...bookmarks, bookmark])
  }

  const updateBookmark = (id: string, updatedBookmark: Partial<Bookmark>) => {
    setBookmarks(bookmarks.map((bookmark) => (bookmark.id === id ? { ...bookmark, ...updatedBookmark } : bookmark)))
  }

  const deleteBookmark = (id: string) => {
    setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id))
  }

  return (
    <main className="min-h-screen bg-blue-50 p-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-serif font-bold text-center mb-8">Bookmark App</h1>
        <div className="relative mb-8">
          <BookmarkInput addBookmark={addBookmark} ref={inputRef} />
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 md:hidden"
            onClick={() => inputRef.current?.focus()}
          >
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
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
        <BookmarkList
          bookmarks={bookmarks}
          updateBookmark={updateBookmark}
          deleteBookmark={deleteBookmark}
          className="space-y-2"
        />
        <ShortcutHelp />
      </div>
    </main>
  )
}

