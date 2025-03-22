"use client"

import type React from "react"

import { useState } from "react"
import { useCompletion } from "ai/react"
import { ArrowLeft, Copy, Check, FileText, Sparkles, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"
import Link from "next/link"

const contentTypes = [
  { value: "blog", label: "Blog Post" },
  { value: "email", label: "Email" },
  { value: "social", label: "Social Media" },
  { value: "story", label: "Story" },
  { value: "code", label: "Code" },
  { value: "summary", label: "Summary" },
]

const toneOptions = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "friendly", label: "Friendly" },
  { value: "formal", label: "Formal" },
  { value: "humorous", label: "Humorous" },
]

export default function CreatePage() {
  const { toast } = useToast()
  const isMobile = useMobile()
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile)
  const [contentType, setContentType] = useState("blog")
  const [tone, setTone] = useState("professional")
  const [length, setLength] = useState([500])
  const [includeKeywords, setIncludeKeywords] = useState(false)
  const [keywords, setKeywords] = useState("")
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("write")

  const { completion, input, handleInputChange, handleSubmit, isLoading, setCompletion } = useCompletion({
    onFinish: () => {
      toast({
        title: "Content generated",
        description: "Your content has been successfully created.",
        duration: 3000,
      })
    },
  })

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(completion)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied to clipboard",
      description: "Content has been copied to your clipboard.",
      duration: 2000,
    })
  }

  const handleGenerateClick = (e: React.FormEvent) => {
    e.preventDefault()

    let prompt = `Write a ${contentType} about "${input}" in a ${tone} tone`

    if (includeKeywords && keywords.trim()) {
      prompt += ` including the following keywords: ${keywords}`
    }

    prompt += `. The content should be approximately ${length[0]} words long.`

    handleSubmit(e, { prompt })
  }

  const templates = [
    {
      title: "Product Launch Announcement",
      description: "Announce a new product or feature",
      prompt: "Write a product launch announcement for a new AI-powered smart home device",
    },
    {
      title: "Weekly Newsletter",
      description: "Create a weekly update for your audience",
      prompt: "Create a weekly newsletter about technology trends and innovations",
    },
    {
      title: "How-to Guide",
      description: "Explain a process or technique",
      prompt: "Write a how-to guide on improving productivity with AI tools",
    },
    {
      title: "Customer Success Story",
      description: "Showcase a customer's positive experience",
      prompt: "Create a customer success story about someone who improved their business with AI",
    },
  ]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} activeTab="create" />

      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} title="Content Creation" />

        <main className="flex-1 overflow-auto p-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <Button variant="ghost" size="icon" asChild className="mr-2">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Content Creation</h1>
                <p className="text-muted-foreground">Generate high-quality content for various purposes</p>
              </div>
            </div>

            <Tabs defaultValue="write" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 w-full max-w-md mb-6">
                <TabsTrigger value="write" className="text-sm">
                  Write Content
                </TabsTrigger>
                <TabsTrigger value="templates" className="text-sm">
                  Templates
                </TabsTrigger>
              </TabsList>

              <TabsContent value="write" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1 space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Content Settings</CardTitle>
                        <CardDescription>Customize your content generation</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="content-type">Content Type</Label>
                          <Select value={contentType} onValueChange={setContentType}>
                            <SelectTrigger id="content-type">
                              <SelectValue placeholder="Select content type" />
                            </SelectTrigger>
                            <SelectContent>
                              {contentTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="tone">Tone</Label>
                          <Select value={tone} onValueChange={setTone}>
                            <SelectTrigger id="tone">
                              <SelectValue placeholder="Select tone" />
                            </SelectTrigger>
                            <SelectContent>
                              {toneOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor="length">Length (words)</Label>
                            <span className="text-sm text-muted-foreground">{length[0]}</span>
                          </div>
                          <Slider
                            id="length"
                            min={100}
                            max={2000}
                            step={100}
                            value={length}
                            onValueChange={setLength}
                          />
                        </div>

                        <div className="flex items-center space-x-2">
                          <Switch id="keywords" checked={includeKeywords} onCheckedChange={setIncludeKeywords} />
                          <Label htmlFor="keywords">Include Keywords</Label>
                        </div>

                        {includeKeywords && (
                          <div className="space-y-2">
                            <Label htmlFor="keywords-input">Keywords (comma separated)</Label>
                            <Input
                              id="keywords-input"
                              value={keywords}
                              onChange={(e) => setKeywords(e.target.value)}
                              placeholder="Enter keywords..."
                              className="bg-background/50 border-border/50"
                            />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  <div className="md:col-span-2 space-y-6">
                    <Card className="h-full flex flex-col">
                      <CardHeader>
                        <CardTitle>Create Content</CardTitle>
                        <CardDescription>Enter your topic and generate content</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <form onSubmit={handleGenerateClick} className="space-y-4 h-full flex flex-col">
                          <div className="space-y-2 flex-1">
                            <Label htmlFor="topic">Topic or Title</Label>
                            <Textarea
                              id="topic"
                              value={input}
                              onChange={handleInputChange}
                              placeholder="Enter your topic or title..."
                              className="min-h-[100px] bg-background/50 border-border/50"
                            />
                          </div>

                          {completion && (
                            <div className="space-y-2 flex-1">
                              <div className="flex justify-between items-center">
                                <Label>Generated Content</Label>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={copyToClipboard}
                                  className="h-8 gap-1 text-xs"
                                >
                                  {copied ? (
                                    <>
                                      <Check className="h-3 w-3" /> Copied
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="h-3 w-3" /> Copy
                                    </>
                                  )}
                                </Button>
                              </div>
                              <div className="relative">
                                <Textarea
                                  value={completion}
                                  readOnly
                                  className="min-h-[200px] bg-background/50 border-border/50"
                                />
                              </div>
                            </div>
                          )}

                          <Button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-200"
                          >
                            {isLoading ? (
                              <>Generating...</>
                            ) : (
                              <>
                                <Sparkles className="h-4 w-4" /> Generate Content
                              </>
                            )}
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="templates" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {templates.map((template, index) => (
                    <Card
                      key={index}
                      className="overflow-hidden group hover:shadow-md hover:shadow-primary/5 transition-all"
                    >
                      <CardHeader className="bg-card/50 backdrop-blur-sm">
                        <CardTitle>{template.title}</CardTitle>
                        <CardDescription>{template.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <p className="text-sm text-muted-foreground line-clamp-2">{template.prompt}</p>
                      </CardContent>
                      <CardFooter className="border-t bg-card/30 backdrop-blur-sm">
                        <Button
                          variant="ghost"
                          className="w-full justify-center gap-2 group-hover:text-primary transition-colors"
                          onClick={() => {
                            handleInputChange({ target: { value: template.prompt } } as any)
                            setActiveTab("write")
                          }}
                        >
                          <FileText className="h-4 w-4" /> Use Template
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                <Card className="border-dashed border-2 border-border/50 bg-transparent hover:border-primary/50 transition-colors">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <div className="rounded-full bg-primary/10 p-3 mb-4">
                      <Plus className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Create Custom Template</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Save your frequently used prompts as templates for quick access
                    </p>
                    <Button variant="outline" className="gap-2">
                      <Plus className="h-4 w-4" /> Add Template
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

