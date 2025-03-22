"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "ai/react"
import { Bot, Send, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar } from "@/components/ui/avatar"
import ChatMessage from "@/components/chat-message"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"
import Link from "next/link"

export default function ChatPage() {
  const { toast } = useToast()
  const isMobile = useMobile()
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isTyping, setIsTyping] = useState(false)

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    onResponse: () => {
      setIsTyping(true)
    },
    onFinish: () => {
      setIsTyping(false)
      toast({
        title: "Response complete",
        description: "The AI has finished generating a response.",
        duration: 3000,
      })
    },
  })

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} activeTab="chat" />

      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} title="Chat" />

        <main className="flex-1 overflow-hidden flex flex-col">
          <div className="p-4 border-b bg-card/30 backdrop-blur-sm">
            <div className="flex items-center gap-2 max-w-4xl mx-auto">
              <Button variant="ghost" size="icon" asChild className="mr-2">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div className="flex-1">
                <h1 className="text-lg font-semibold">New Conversation</h1>
                <p className="text-sm text-muted-foreground">Start chatting with your AI assistant</p>
              </div>
            </div>
          </div>

          {messages.length === 0 ? (
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="max-w-md text-center space-y-6">
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center">
                  <Bot className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">Start a Conversation</h2>
                <p className="text-muted-foreground">
                  Ask me anything! I can help with problem-solving, answer questions, generate content, and more.
                </p>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  {[
                    "How can I improve my productivity?",
                    "Write a short story about AI",
                    "Explain quantum computing",
                    "Generate a weekly meal plan",
                  ].map((suggestion) => (
                    <Button
                      key={suggestion}
                      variant="outline"
                      className="justify-start h-auto py-2 px-3 border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:bg-primary/5 transition-all"
                      onClick={() => handleInputChange({ target: { value: suggestion } } as any)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isTyping && (
                <div className="flex items-start gap-3 animate-in fade-in">
                  <Avatar className="h-10 w-10 border bg-primary/10">
                    <Bot className="h-5 w-5 text-primary" />
                  </Avatar>
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}

          <div className="p-4 border-t bg-card/50 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="flex gap-2 max-w-4xl mx-auto">
              <Textarea
                value={input}
                onChange={handleInputChange}
                placeholder="Ask me anything..."
                className="min-h-12 resize-none py-3 bg-background/50 border-border/50 focus-visible:ring-primary"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit(e as any)
                  }
                }}
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim()}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-2 text-center max-w-4xl mx-auto">
              Your data is secure and conversations are encrypted.
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}

