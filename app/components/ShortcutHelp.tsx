"use client"

import { useState } from "react"
import { HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function ShortcutHelp() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="fixed bottom-4 left-4">
          <HelpCircle className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <DialogDescription>Here are the available keyboard shortcuts:</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <p>
            <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">
              /
            </kbd>{" "}
            Focus on input
          </p>
          <p>
            <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">
              ↑
            </kbd>{" "}
            <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">
              ↓
            </kbd>{" "}
            Navigate bookmarks
          </p>
          <p>
            <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">
              Enter
            </kbd>{" "}
            Open focused bookmark
          </p>
          <p>
            <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">
              E
            </kbd>{" "}
            Edit bookmark
          </p>
          <p>
            <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">
              Del
            </kbd>{" "}
            Delete bookmark
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

