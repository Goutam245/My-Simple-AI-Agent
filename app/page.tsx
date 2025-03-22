"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "ai/react"
import { Bot, Send, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar } from "@/components/ui/avatar"
import ChatMessage from "@/components/chat-message"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"
import { ThemeToggle } from "@/components/theme-toggle"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function Home() {
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
      <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />

      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

        <main className="flex-1 overflow-hidden flex flex-col">
          {messages.length === 0 ? (
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="max-w-4xl w-full px-4">
                <div className="text-center mb-12">
                  <div className="mx-auto bg-gradient-to-r from-primary/30 via-primary/50 to-primary/30 p-6 rounded-full w-24 h-24 flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
                    <Sparkles className="h-12 w-12 text-primary animate-pulse" />
                  </div>
                  <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                    Welcome to Your AI Assistant
                  </h1>
                  <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
                    Your intelligent companion powered by advanced AI. Ask me anything, and I'll provide smart,
                    personalized responses.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="p-6 border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-md hover:shadow-primary/5 transition-all group overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <Bot className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Smart Conversations</h3>
                    <p className="text-muted-foreground mb-4">
                      Engage in natural, human-like conversations with advanced context awareness.
                    </p>
                    <Button variant="link" className="p-0 gap-1 group-hover:text-primary transition-colors" asChild>
                      <Link href="/chat">
                        Try it now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </Card>

                  <Card className="p-6 border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-md hover:shadow-primary/5 transition-all group overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="bg-purple-500/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
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
                        className="h-6 w-6 text-purple-500"
                      >
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <path d="M12 18v-6"></path>
                        <path d="M8 15h8"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Content Creation</h3>
                    <p className="text-muted-foreground mb-4">
                      Generate high-quality content, from creative writing to professional documents.
                    </p>
                    <Button variant="link" className="p-0 gap-1 group-hover:text-purple-500 transition-colors" asChild>
                      <Link href="/create">
                        Create now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </Card>

                  <Card className="p-6 border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-md hover:shadow-primary/5 transition-all group overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="bg-emerald-500/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
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
                        className="h-6 w-6 text-emerald-500"
                      >
                        <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"></path>
                        <path d="M10 2c1 .5 2 2 2 5"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Personal Assistant</h3>
                    <p className="text-muted-foreground mb-4">
                      Get help with scheduling, reminders, and managing your daily tasks.
                    </p>
                    <Button variant="link" className="p-0 gap-1 group-hover:text-emerald-500 transition-colors" asChild>
                      <Link href="/assistant">
                        Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </Card>
                </div>

                <div className="mt-12">
                  <h2 className="text-xl font-semibold mb-4">Try asking me...</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    {[
                      "How can I improve my productivity?",
                      "Write a short story about AI",
                      "Explain quantum computing",
                      "Generate a weekly meal plan",
                      "What are the latest AI trends?",
                      "Help me draft an email to my team",
                    ].map((suggestion) => (
                      <Button
                        key={suggestion}
                        variant="outline"
                        className="justify-start h-auto py-3 px-4 border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:bg-primary/5 transition-all"
                        onClick={() => handleInputChange({ target: { value: suggestion } } as any)}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
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
              Your data is secure and conversations are encrypted. <ThemeToggle className="inline-flex ml-2" />
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}

