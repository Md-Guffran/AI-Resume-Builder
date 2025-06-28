"use client"

import type React from "react"
  import jsPDF from "jspdf"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Sparkles,
  Target,
  TrendingUp,
  Download,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"

interface AnalysisResult {
  atsScore: number
  keywordMatches: Array<{
    keyword: string
    found: boolean
    importance: "high" | "medium" | "low"
  }>
  grammarSuggestions: Array<{
    issue: string
    suggestion: string
    severity: "high" | "medium" | "low"
  }>
  recommendations: Array<{
    category: "formatting" | "content" | "keywords" | "structure"
    title: string
    description: string
    priority: "high" | "medium" | "low"
  }>
  strengths: string[]
  weaknesses: string[]
  overallFeedback: string
}

export default function AnalyzerPage() {
  const [file, setFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isExtracting, setIsExtracting] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [extractedText, setExtractedText] = useState("")
  const [improvements, setImprovements] = useState<{ [key: string]: string }>({})
  const [isGeneratingImprovement, setIsGeneratingImprovement] = useState<string | null>(null)
  const [serverError, setServerError] = useState("")
  const [provider, setProvider] = useState<"openai" | "gemini">("openai")

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0]
    if (uploadedFile) {
      setFile(uploadedFile)
      setIsExtracting(true)

      try {
        const formData = new FormData()
        formData.append("file", uploadedFile)

        const response = await fetch("/api/extract-text", {
          method: "POST",
          body: formData,
        })

        if (response.ok) {
          const { text } = await response.json()
          setExtractedText(text)
        } else {
          throw new Error("Failed to extract text")
        }
      } catch (error) {
        console.error("Text extraction failed:", error)
        alert("Failed to extract text from file. Please try again.")
      } finally {
        setIsExtracting(false)
      }
    }
  }

  const handleAnalyze = async () => {
    if (!extractedText) return

    setIsAnalyzing(true)
    setServerError("")

    try {
      const response = await fetch("/api/analyze-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText: extractedText,
          jobDescription: jobDescription || undefined,
        }),
      })

      if (!response.ok) {
        const { error } = await response.json().catch(() => ({ error: "Unknown server error" }))
        throw new Error(error)
      }

      if (response.ok) {
        const result = await response.json()
        setAnalysisResult(result)
      } else {
        throw new Error("Analysis failed")
      }
    } catch (error: any) {
      console.error("Analysis failed:", error)
      setServerError(error?.message || "Unknown error. Please try again.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleGetImprovement = async (type: string) => {
    setIsGeneratingImprovement(type)

    try {
      const response = await fetch("/api/improve-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText: extractedText,
          jobDescription: jobDescription || undefined,
          improvementType: type,
        }),
      })

      if (response.ok) {
        const { suggestions } = await response.json()
        setImprovements((prev) => ({ ...prev, [type]: suggestions }))
      } else {
        throw new Error("Failed to generate improvements")
      }
    } catch (error) {
      console.error("Improvement generation failed:", error)
      alert("Failed to generate improvement suggestions. Please try again.")
    } finally {
      setIsGeneratingImprovement(null)
    }
  }




const handleDownloadReport = () => {
  if (!analysisResult) return

  const doc = new jsPDF()
  doc.setFontSize(16)
  doc.text("Resume Analysis Report", 10, 15)

  doc.setFontSize(12)
  let y = 25

  doc.text(`ATS Score: ${analysisResult.atsScore}`, 10, y)
  y += 8
  doc.text(`Feedback: ${analysisResult.overallFeedback}`, 10, y)
  y += 10

  doc.text("Strengths:", 10, y)
  y += 7
  analysisResult.strengths.forEach(strength => {
    doc.text(`- ${strength}`, 12, y)
    y += 6
  })

  y += 4
  doc.text("Weaknesses:", 10, y)
  y += 7
  analysisResult.weaknesses.forEach(weakness => {
    doc.text(`- ${weakness}`, 12, y)
    y += 6
  })

  y += 4
  doc.text("Recommendations:", 10, y)
  y += 7
  analysisResult.recommendations.forEach(rec => {
    doc.text(`- ${rec.title}: ${rec.description}`, 12, y)
    y += 6
    if (y > 270) { // Add new page if needed
      doc.addPage()
      y = 15
    }
  })

  doc.save("resume-analysis.pdf")
}
//   const handleDownloadReport = () => {
//     if (!analysisResult) return
//     const content = `
// ATS Score: ${analysisResult.atsScore}
// Feedback: ${analysisResult.overallFeedback}

// Strengths:
// ${analysisResult.strengths.join("\n")}

// Weaknesses:
// ${analysisResult.weaknesses.join("\n")}

// Recommendations:
// ${analysisResult.recommendations.map(r => `- ${r.title}: ${r.description}`).join("\n")}
// `
//     const blob = new Blob([content], { type: "text/plain" })
//     const url = URL.createObjectURL(blob)
//     const a = document.createElement("a")
//     a.href = url
//     a.download = "resume-analysis.txt"
//     a.click()
//     URL.revokeObjectURL(url)
//   }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadge = (score: number) => {
    if (score >= 80) return { variant: "default" as const, text: "Excellent" }
    if (score >= 60) return { variant: "secondary" as const, text: "Good" }
    return { variant: "destructive" as const, text: "Needs Work" }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/30"
      case "medium":
        return "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/30"
      case "low":
        return "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/30"
      default:
        return "border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/30"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Sparkles className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-semibold">AI Resume Analyzer</h1>
              </div>
            </div>
            {analysisResult && (
              <Button onClick={() => setAnalysisResult(null)}>
                <RefreshCw className="mr-2 h-4 w-4" />
                New Analysis
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!analysisResult ? (
          <div className="space-y-6">
            {/* Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>Upload Your Resume</span>
                </CardTitle>
                <CardDescription>
                  Upload your resume in PDF, Word, or text format for AI-powered analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center relative">
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <div className="space-y-2">
                    <p className="text-lg font-medium">
                      {isExtracting ? "Extracting text..." : file ? file.name : "Drag and drop your resume here"}
                    </p>
                    <p className="text-muted-foreground">
                      {isExtracting ? "Please wait..." : "or click to browse files"}
                    </p>
                  </div>
                  <input
                    type="file"
                    accept=".pdf,.txt,.doc,.docx"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={isExtracting}
                  />
                </div>
                {file && !isExtracting && (
                  <div className="mt-4 p-3 bg-muted rounded-lg flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="font-medium">{file.name}</span>
                    <Badge variant="secondary">{(file.size / 1024).toFixed(1)} KB</Badge>
                    <Badge variant="outline">Text Extracted</Badge>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Job Description Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Job Description (Optional)</span>
                </CardTitle>
                <CardDescription>
                  Paste the job description to get targeted keyword analysis and recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Paste the job description here to get more accurate keyword matching and tailored recommendations..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={6}
                />
              </CardContent>
            </Card>

            {/* AI Provider Selection */}
            <div className="flex justify-center mb-4">
              <label className="mr-4 font-medium">AI Provider:</label>
              <select
                value={provider}
                onChange={e => setProvider(e.target.value as "openai" | "gemini")}
                className="border rounded px-2 py-1 bg-background"
              >
                <option value="openai">OpenAI</option>
                <option value="gemini">Gemini</option>
              </select>
            </div>

            {/* Analyze Button */}
            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={handleAnalyze}
                disabled={!extractedText || isAnalyzing}
                className="min-w-[200px]"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Analyze with AI
                  </>
                )}
              </Button>
            </div>

            {isAnalyzing && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="text-lg font-medium">AI is analyzing your resume...</p>
                    <p className="text-muted-foreground">
                      Our AI is examining your resume for ATS compatibility, keywords, grammar, and optimization
                      opportunities
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {serverError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{serverError}</AlertDescription>
              </Alert>
            )}
            {/* Overall Score */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Overall Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex-1">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">ATS Compatibility Score</span>
                          <span className={`text-sm font-medium ${getScoreColor(analysisResult.atsScore)}`}>
                            {analysisResult.atsScore}/100
                          </span>
                        </div>
                        <Progress value={analysisResult.atsScore} className="h-3" />
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getScoreColor(analysisResult.atsScore)}`}>
                          {analysisResult.atsScore}%
                        </div>
                        <Badge variant={getScoreBadge(analysisResult.atsScore).variant}>
                          {getScoreBadge(analysisResult.atsScore).text}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">AI Feedback</h4>
                    <p className="text-sm text-muted-foreground">{analysisResult.overallFeedback}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="keywords" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="keywords">Keywords</TabsTrigger>
                <TabsTrigger value="grammar">Grammar</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                <TabsTrigger value="strengths">Strengths</TabsTrigger>
                <TabsTrigger value="improvements">AI Improvements</TabsTrigger>
              </TabsList>

              <TabsContent value="keywords" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Keyword Analysis</CardTitle>
                    <CardDescription>Keywords found in your resume vs. job requirements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {analysisResult.keywordMatches.map((match, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-2">
                            {match.found ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-red-500" />
                            )}
                            <span className={match.found ? "text-green-700" : "text-red-700"}>{match.keyword}</span>
                          </div>
                          <Badge
                            variant={
                              match.importance === "high"
                                ? "destructive"
                                : match.importance === "medium"
                                  ? "secondary"
                                  : "outline"
                            }
                            className="text-xs"
                          >
                            {match.importance}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="grammar" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Grammar & Style Analysis</CardTitle>
                    <CardDescription>AI-detected grammar and style improvements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analysisResult.grammarSuggestions.map((suggestion, index) => (
                        <Alert
                          key={index}
                          className={
                            suggestion.severity === "high"
                              ? "border-red-200"
                              : suggestion.severity === "medium"
                                ? "border-yellow-200"
                                : "border-blue-200"
                          }
                        >
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            <div className="space-y-1">
                              <p className="font-medium">{suggestion.issue}</p>
                              <p className="text-sm text-muted-foreground">{suggestion.suggestion}</p>
                              <Badge
                                variant={
                                  suggestion.severity === "high"
                                    ? "destructive"
                                    : suggestion.severity === "medium"
                                      ? "secondary"
                                      : "outline"
                                }
                                className="text-xs"
                              >
                                {suggestion.severity} priority
                              </Badge>
                            </div>
                          </AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="recommendations" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>AI Recommendations</CardTitle>
                    <CardDescription>Personalized suggestions to improve your resume</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analysisResult.recommendations.map((rec, index) => (
                        <div key={index} className={`p-4 border rounded-lg ${getPriorityColor(rec.priority)}`}>
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium">{rec.title}</h4>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-xs">
                                {rec.category}
                              </Badge>
                              <Badge
                                variant={
                                  rec.priority === "high"
                                    ? "destructive"
                                    : rec.priority === "medium"
                                      ? "secondary"
                                      : "outline"
                                }
                                className="text-xs"
                              >
                                {rec.priority}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{rec.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="strengths" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-green-600">Strengths</CardTitle>
                      <CardDescription>What your resume does well</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {analysisResult.strengths.map((strength, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/30"
                          >
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                            <p className="text-sm text-green-700 dark:text-green-200">{strength}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-orange-600">Areas for Improvement</CardTitle>
                      <CardDescription>Opportunities to enhance your resume</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {analysisResult.weaknesses.map((weakness, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-3 p-3 rounded-lg bg-orange-50 dark:bg-orange-900/30"
                          >
                            <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                            <p className="text-sm text-orange-700 dark:text-orange-200">{weakness}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="improvements" className="space-y-4">
                <div className="grid gap-4">
                  {["keywords", "grammar", "structure"].map((type) => (
                    <Card key={type}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="capitalize">{type} Improvements</CardTitle>
                            <CardDescription>AI-generated suggestions for {type} optimization</CardDescription>
                          </div>
                          <Button
                            onClick={() => handleGetImprovement(type)}
                            disabled={isGeneratingImprovement === type}
                            variant="outline"
                          >
                            {isGeneratingImprovement === type ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                                Generating...
                              </>
                            ) : (
                              <>
                                <Sparkles className="mr-2 h-4 w-4" />
                                Get AI Suggestions
                              </>
                            )}
                          </Button>
                        </div>
                      </CardHeader>
                      {improvements[type] && (
                        <CardContent>
                          <div className="prose prose-sm max-w-none">
                            <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-lg">
                              {improvements[type]}
                            </pre>
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Actions */}
            <div className="flex justify-center space-x-4">
              <Button onClick={() => setAnalysisResult(null)}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Analyze Another Resume
              </Button>
              <Button variant="outline" onClick={handleDownloadReport}>
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
