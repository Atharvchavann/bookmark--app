"use client"

import type React from "react"
import { useState, useEffect, useRef, forwardRef } from "react"
import type { Bookmark } from "../page"
import { MoreHorizontal, Edit, Trash2, Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { isValidUrl } from "../utils/validators"

interface BookmarkItemProps {
  bookmark: Bookmark
  updateBookmark: (id: string, updatedBookmark: Partial<Bookmark>) => void
  deleteBookmark: (id: string) => void
  isFocused: boolean
}

const BookmarkItem = forwardRef<HTMLDivElement, BookmarkItemProps>(
  ({ bookmark, updateBookmark, deleteBookmark, isFocused }, ref) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editedName, setEditedName] = useState(bookmark.name)
    const editInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
      if (isEditing) {
        editInputRef.current?.focus()
      }
    }, [isEditing])

    const handleEdit = () => {
      setIsEditing(true)
    }

    const handleSave = () => {
      updateBookmark(bookmark.id, { name: editedName })
      setIsEditing(false)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSave()
      } else if (e.key === "Escape") {
        setIsEditing(false)
        setEditedName(bookmark.name)
      }
    }

    const handleCopy = () => {
      navigator.clipboard.writeText(bookmark.url)
    }

    const handleDelete = () => {
      deleteBookmark(bookmark.id)
    }

    const getFaviconUrl = (url: string) => {
      try {
        const urlObject = new URL(url)
        return `https://www.google.com/s2/favicons?domain=${urlObject.hostname}&sz=32`
      } catch {
        return ""
      }
    }

    return (
      <div
        ref={ref}
        className={`flex items-center space-x-2 p-4 bg-white rounded-lg shadow transition duration-200 ease-in-out ${
          isFocused ? "ring-2 ring-blue-300" : ""
        }`}
        tabIndex={0}
      >
        {isValidUrl(bookmark.url) ? (
          <img
            src={`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${bookmark.url}&size=32`}
            alt=""
            className="w-6 h-6 mr-2"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg"
            }}
          />
        ) : bookmark.color ? (
          <div className="w-6 h-6 rounded-full mr-2" style={{ backgroundColor: bookmark.color }}></div>
        ) : null}

        {isEditing ? (
          <input
            ref={editInputRef}
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="flex-grow p-2 border rounded-full"
          />
        ) : (
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-grow hover:underline truncate"
            style={{ color: bookmark.color }}
          >
            {bookmark.name}
          </a>
        )}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48">
            <div className="grid gap-2">
              <Button variant="ghost" size="sm" onClick={handleEdit} className="justify-start" aria-label="Edit">
                <Edit className="h-4 w-4 mr-2" />
                Edit (E)
              </Button>
              <Button variant="ghost" size="sm" onClick={handleCopy} className="justify-start">
                <Copy className="h-4 w-4 mr-2" />
                Copy URL
              </Button>
              <Button variant="ghost" size="sm" onClick={handleDelete} className="justify-start" aria-label="Delete">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete (Del)
              </Button>
              <Button
                variant="ghost"
                size="sm"
                as="a"
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="justify-start"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open in new tab
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    )
  },
)

BookmarkItem.displayName = "BookmarkItem"

export default BookmarkItem

