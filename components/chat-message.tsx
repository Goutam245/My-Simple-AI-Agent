"use client"

import type { Message } from "ai"
import { Bot, User, Copy, Check } from "lucide-react"
import { useState } from "react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import ReactMarkdown from "react-markdown"

interface ChatMessageProps {
  message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const [copied, setCopied] = useState(false)

  const isUser = message.role === "user"

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn("flex items-start gap-3 group", isUser ? "justify-end" : "")}>
      {!isUser && (
        <Avatar className="h-10 w-10 border bg-primary/10">
          <Bot className="h-5 w-5 text-primary" />
        </Avatar>
      )}

      <div
        className={cn(
          "relative rounded-lg p-4 max-w-[85%] md:max-w-[70%]",
          isUser
            ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
            : "bg-card border shadow-sm",
        )}
      >
        {!isUser && (
          <Badge variant="outline" className="absolute -top-2 left-3 text-xs font-normal bg-background">
            AI Assistant
          </Badge>
        )}

        <div
          className={cn(
            "prose prose-sm max-w-none",
            isUser ? "prose-invert" : "",
            "prose-p:leading-relaxed prose-pre:p-2",
          )}
        >
          {isUser ? <p>{message.content}</p> : <ReactMarkdown>{message.content}</ReactMarkdown>}
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className={cn(
                  "h-6 w-6 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity",
                  isUser ? "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary/80" : "",
                )}
                onClick={copyToClipboard}
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{copied ? "Copied!" : "Copy message"}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {isUser && (
        <Avatar className="h-10 w-10 border bg-gradient-to-br from-primary to-primary/90 shadow-md">
          <User className="h-5 w-5 text-primary-foreground" />
        </Avatar>
      )}
    </div>
  )
}

