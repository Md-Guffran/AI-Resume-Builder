"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileText, Download, Eye, ArrowLeft, ArrowRight, Sparkles, Wand2 } from "lucide-react"
import Link from "next/link"
import { TemplateSelector, templatePreviews } from "@/components/resume-templates/template-selector"
import  html2pdf from "html2pdf.js"

export default function ResumeBuilderPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isGenerating, setIsGenerating] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      website: "",
      summary: "",
    },
    education: [],
    experience: [],
    projects: [],
    skills: {
      technical: "",
      soft: "",
      languages: "",
    },
    extraCurricular: [],
    achievements: [],
  })

  const [jobDescription, setJobDescription] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("modern")

  // Local states for adding entries
  const [currentEducation, setCurrentEducation] = useState({
    degree: "",
    school: "",
    graduationYear: "",
    gpa: "",
  })
  const [currentExperience, setCurrentExperience] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    description: "",
  })
  const [currentProject, setCurrentProject] = useState({
    title: "",
    description: "",
    technologies: "",
    link: "",
  })
  const [currentActivity, setCurrentActivity] = useState("")
  const [currentAchievement, setCurrentAchievement] = useState("")

  const steps = [
    { id: "personal", label: "Personal Info" },
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "extraCurricular", label: "Extra Curricular" },
    { id: "achievements", label: "Achievements" },
  ]

  const templates = templatePreviews
  const progress = ((currentStep + 1) / steps.length) * 100

  const previewRef = useRef<HTMLDivElement>(null)

  const handleAIGenerate = async (section: string, field: string) => {
    const sectionKey = section as keyof typeof formData
    const currentData = formData[sectionKey] as any
    const userInput = currentData[field]

    if (!userInput?.trim()) {
      alert("Please enter some information first for AI to improve")
      return
    }

    setIsGenerating(`${section}-${field}`)

    try {
      const response = await fetch("/api/generate-resume-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          section: field,
          userInput,
          jobDescription: jobDescription || undefined,
        }),
      })

      if (response.ok) {
        const { content } = await response.json()
        setFormData((prev) => ({
          ...prev,
          [section]: {
            ...prev[sectionKey],
            [field]: content,
          },
        }))
      } else {
        throw new Error("Failed to generate content")
      }
    } catch (error) {
      console.error("AI generation failed:", error)
      alert("Failed to generate content. Please try again.")
    } finally {
      setIsGenerating(null)
    }
  }

  const updateFormData = (section: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }))
  }

  // Download PDF handler
  const handleDownloadPDF = () => {
    const element = previewRef.current
    if (!element) return
    html2pdf().from(element).save("resume.pdf")
  }

  // Preview button handler
  const handlePreview = () => {
    previewRef.current?.scrollIntoView({ behavior: "smooth" })
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
                <FileText className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-semibold">AI Resume Builder</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={handlePreview}>
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
              <Button onClick={handleDownloadPDF}>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            {/* Job Description Input */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5" />
                  <span>Target Job (Optional)</span>
                </CardTitle>
                <CardDescription>
                  Paste a job description to get AI-powered, tailored content suggestions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Paste the job description here for AI to tailor your resume content..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={3}
                />
              </CardContent>
            </Card>

            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>
                  Step {currentStep + 1} of {steps.length}
                </span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="mb-4" />
              <div className="flex justify-between">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${index <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        }`}
                    >
                      {index + 1}
                    </div>
                    <span className="text-xs mt-1 text-center">{step.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <Card>
              <CardHeader>
                <CardTitle>{steps[currentStep].label}</CardTitle>
                <CardDescription>Fill in your {steps[currentStep].label.toLowerCase()} details</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Personal Info */}
                {currentStep === 0 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          placeholder="John Doe"
                          value={formData.personalInfo.fullName}
                          onChange={(e) => updateFormData("personalInfo", "fullName", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.personalInfo.email}
                          onChange={(e) => updateFormData("personalInfo", "email", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          placeholder="+1 (555) 123-4567"
                          value={formData.personalInfo.phone}
                          onChange={(e) => updateFormData("personalInfo", "phone", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          placeholder="New York, NY"
                          value={formData.personalInfo.location}
                          onChange={(e) => updateFormData("personalInfo", "location", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input
                          id="linkedin"
                          placeholder="linkedin.com/in/johndoe"
                          value={formData.personalInfo.linkedin}
                          onChange={(e) => updateFormData("personalInfo", "linkedin", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          placeholder="johndoe.com"
                          value={formData.personalInfo.website}
                          onChange={(e) => updateFormData("personalInfo", "website", e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="summary">Professional Summary</Label>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAIGenerate("personalInfo", "summary")}
                          disabled={isGenerating === "personalInfo-summary"}
                        >
                          {isGenerating === "personalInfo-summary" ? (
                            <>
                              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current mr-1"></div>
                              Generating...
                            </>
                          ) : (
                            <>
                              <Wand2 className="mr-1 h-3 w-3" />
                              AI Enhance
                            </>
                          )}
                        </Button>
                      </div>
                      <Textarea
                        id="summary"
                        placeholder="Write a brief professional summary or let AI help you..."
                        rows={4}
                        value={formData.personalInfo.summary}
                        onChange={(e) => updateFormData("personalInfo", "summary", e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {/* Education */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="degree">Degree</Label>
                        <Input
                          id="degree"
                          placeholder="e.g. B.Tech, Intermediate, School"
                          value={currentEducation.degree}
                          onChange={e => setCurrentEducation({ ...currentEducation, degree: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="school">School/College</Label>
                        <Input
                          id="school"
                          placeholder="Stanford University"
                          value={currentEducation.school}
                          onChange={e => setCurrentEducation({ ...currentEducation, school: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="graduationYear">Graduation Year</Label>
                        <Input
                          id="graduationYear"
                          placeholder="2024"
                          value={currentEducation.graduationYear}
                          onChange={e => setCurrentEducation({ ...currentEducation, graduationYear: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="gpa">GPA</Label>
                        <Input
                          id="gpa"
                          placeholder="3.8"
                          value={currentEducation.gpa}
                          onChange={e => setCurrentEducation({ ...currentEducation, gpa: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        onClick={() => {
                          if (!currentEducation.degree || !currentEducation.school) return;
                          setFormData(prev => ({
                            ...prev,
                            education: [...prev.education, currentEducation],
                          }));
                          setCurrentEducation({ degree: "", school: "", graduationYear: "", gpa: "" });
                        }}
                        disabled={!currentEducation.degree || !currentEducation.school}
                      >
                        Add Education
                      </Button>
                    </div>
                    <div className="mt-4">
                      <Label>Educations Added</Label>
                      <ul className="space-y-2 mt-2">
                        {formData.education.length > 0 ? (
                          formData.education.map((edu, idx) => (
                            <li key={idx} className="flex items-center justify-between border rounded p-2">
                              <span>
                                <span className="font-medium">{edu.degree}</span> at {edu.school}
                                {edu.graduationYear && <> ({edu.graduationYear})</>}
                                {edu.gpa && <> – GPA: {edu.gpa}</>}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  setFormData(prev => ({
                                    ...prev,
                                    education: prev.education.filter((_, i) => i !== idx),
                                  }))
                                }
                              >
                                Remove
                              </Button>
                            </li>
                          ))
                        ) : (
                          <li className="text-muted-foreground text-sm">No educations added yet.</li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Experience */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          placeholder="Tech Corp"
                          value={currentExperience.company}
                          onChange={e => setCurrentExperience({ ...currentExperience, company: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="position">Position</Label>
                        <Input
                          id="position"
                          placeholder="Software Engineer"
                          value={currentExperience.position}
                          onChange={e => setCurrentExperience({ ...currentExperience, position: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={currentExperience.startDate}
                          onChange={e => setCurrentExperience({ ...currentExperience, startDate: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="endDate">End Date</Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={currentExperience.endDate}
                          onChange={e => setCurrentExperience({ ...currentExperience, endDate: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="description">Description</Label>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAIGenerate("experience", "description")}
                          disabled={isGenerating === "experience-description"}
                        >
                          {isGenerating === "experience-description" ? (
                            <>
                              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current mr-1"></div>
                              Generating...
                            </>
                          ) : (
                            <>
                              <Wand2 className="mr-1 h-3 w-3" />
                              AI Enhance
                            </>
                          )}
                        </Button>
                      </div>
                      <Textarea
                        id="description"
                        placeholder="Describe your responsibilities and achievements, then let AI optimize it..."
                        rows={4}
                        value={currentExperience.description}
                        onChange={e => setCurrentExperience({ ...currentExperience, description: e.target.value })}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        onClick={() => {
                          if (!currentExperience.company || !currentExperience.position) return;
                          setFormData(prev => ({
                            ...prev,
                            experience: [...prev.experience, currentExperience],
                          }));
                          setCurrentExperience({ company: "", position: "", startDate: "", endDate: "", description: "" });
                        }}
                        disabled={!currentExperience.company || !currentExperience.position}
                      >
                        Add Experience
                      </Button>
                    </div>
                    <div className="mt-4">
                      <Label>Experiences Added</Label>
                      <ul className="space-y-2 mt-2">
                        {formData.experience.length > 0 ? (
                          formData.experience.map((exp, idx) => (
                            <li key={idx} className="flex items-center justify-between border rounded p-2">
                              <span>
                                <span className="font-medium">{exp.position}</span> at {exp.company}
                                {exp.startDate && <> ({exp.startDate} - {exp.endDate || "Present"})</>}
                                {exp.description && <> – {exp.description}</>}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  setFormData(prev => ({
                                    ...prev,
                                    experience: prev.experience.filter((_, i) => i !== idx),
                                  }))
                                }
                              >
                                Remove
                              </Button>
                            </li>
                          ))
                        ) : (
                          <li className="text-muted-foreground text-sm">No experiences added yet.</li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Projects */}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title">Project Title</Label>
                        <Input
                          id="title"
                          placeholder="My Awesome Project"
                          value={currentProject.title}
                          onChange={e => setCurrentProject({ ...currentProject, title: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="technologies">Technologies</Label>
                        <Input
                          id="technologies"
                          placeholder="React, Node.js"
                          value={currentProject.technologies}
                          onChange={e => setCurrentProject({ ...currentProject, technologies: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your project..."
                        rows={3}
                        value={currentProject.description}
                        onChange={e => setCurrentProject({ ...currentProject, description: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="link">Project Link</Label>
                      <Input
                        id="link"
                        placeholder="https://github.com/yourproject"
                        value={currentProject.link}
                        onChange={e => setCurrentProject({ ...currentProject, link: e.target.value })}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        onClick={() => {
                          if (!currentProject.title) return;
                          setFormData(prev => ({
                            ...prev,
                            projects: [...prev.projects, currentProject],
                          }));
                          setCurrentProject({ title: "", description: "", technologies: "", link: "" });
                        }}
                        disabled={!currentProject.title}
                      >
                        Add Project
                      </Button>
                    </div>
                    <div className="mt-4">
                      <Label>Projects Added</Label>
                      <ul className="space-y-2 mt-2">
                        {formData.projects.length > 0 ? (
                          formData.projects.map((proj, idx) => (
                            <li key={idx} className="flex items-center justify-between border rounded p-2">
                              <span>
                                <span className="font-medium">{proj.title}</span>
                                {proj.technologies && <> | Tech: {proj.technologies}</>}
                                {proj.description && <> – {proj.description}</>}
                                {proj.link && (
                                  <>
                                    {" "}
                                    | <a href={proj.link} target="_blank" rel="noopener noreferrer" className="underline text-blue-600">Link</a>
                                  </>
                                )}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  setFormData(prev => ({
                                    ...prev,
                                    projects: prev.projects.filter((_, i) => i !== idx),
                                  }))
                                }
                              >
                                Remove
                              </Button>
                            </li>
                          ))
                        ) : (
                          <li className="text-muted-foreground text-sm">No projects added yet.</li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Skills */}
                {currentStep === 4 && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="technical">Technical Skills (comma separated)</Label>
                      <Input
                        id="technical"
                        placeholder="React, Node.js, TypeScript"
                        value={formData.skills.technical}
                        onChange={e =>
                          updateFormData("skills", "technical", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="soft">Soft Skills (comma separated)</Label>
                      <Input
                        id="soft"
                        placeholder="Communication, Teamwork"
                        value={formData.skills.soft}
                        onChange={e =>
                          updateFormData("skills", "soft", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="languages">Languages (comma separated)</Label>
                      <Input
                        id="languages"
                        placeholder="English, Hindi"
                        value={formData.skills.languages}
                        onChange={e =>
                          updateFormData("skills", "languages", e.target.value)
                        }
                      />
                    </div>
                    <div className="mt-4">
                      <Label>Preview</Label>
                      <ul className="space-y-1 mt-2">
                        <li>
                          <span className="font-medium">Technical:</span>{" "}
                          {formData.skills.technical
                            ? formData.skills.technical.split(",").map((s, i) => (
                              <span key={i} className="inline-block bg-gray-100 rounded px-2 py-0.5 mr-1">{s.trim()}</span>
                            ))
                            : <span className="text-muted-foreground">None</span>}
                        </li>
                        <li>
                          <span className="font-medium">Soft:</span>{" "}
                          {formData.skills.soft
                            ? formData.skills.soft.split(",").map((s, i) => (
                              <span key={i} className="inline-block bg-gray-100 rounded px-2 py-0.5 mr-1">{s.trim()}</span>
                            ))
                            : <span className="text-muted-foreground">None</span>}
                        </li>
                        <li>
                          <span className="font-medium">Languages:</span>{" "}
                          {formData.skills.languages
                            ? formData.skills.languages.split(",").map((s, i) => (
                              <span key={i} className="inline-block bg-gray-100 rounded px-2 py-0.5 mr-1">{s.trim()}</span>
                            ))
                            : <span className="text-muted-foreground">None</span>}
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Extra Curricular */}
                {currentStep === 5 && (
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <Label htmlFor="activity">Activity</Label>
                        <Input
                          id="activity"
                          placeholder="e.g. Volunteer at Red Cross"
                          value={currentActivity}
                          onChange={e => setCurrentActivity(e.target.value)}
                        />
                      </div>
                      <div className="flex items-end">
                        <Button
                          type="button"
                          onClick={() => {
                            if (!currentActivity) return;
                            setFormData(prev => ({
                              ...prev,
                              extraCurricular: [...prev.extraCurricular, currentActivity],
                            }));
                            setCurrentActivity("");
                          }}
                          disabled={!currentActivity}
                        >
                          Add Activity
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Label>Activities Added</Label>
                      <ul className="space-y-2 mt-2">
                        {formData.extraCurricular.length > 0 ? (
                          formData.extraCurricular.map((act, idx) => (
                            <li key={idx} className="flex items-center justify-between border rounded p-2">
                              <span>{act}</span>
                              <Button variant="ghost" size="sm" onClick={() =>
                                setFormData(prev => ({
                                  ...prev,
                                  extraCurricular: prev.extraCurricular.filter((_, i) => i !== idx),
                                }))
                              }>
                                Remove
                              </Button>
                            </li>
                          ))
                        ) : (
                          <li className="text-muted-foreground text-sm">No activities added yet.</li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Achievements */}
                {currentStep === 6 && (
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <Label htmlFor="achievement">Achievement</Label>
                        <Input
                          id="achievement"
                          placeholder="e.g. Won Hackathon 2024"
                          value={currentAchievement}
                          onChange={e => setCurrentAchievement(e.target.value)}
                        />
                      </div>
                      <div className="flex items-end">
                        <Button
                          type="button"
                          onClick={() => {
                            if (!currentAchievement) return;
                            setFormData(prev => ({
                              ...prev,
                              achievements: [...prev.achievements, currentAchievement],
                            }));
                            setCurrentAchievement("");
                          }}
                          disabled={!currentAchievement}
                        >
                          Add Achievement
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Label>Achievements Added</Label>
                      <ul className="space-y-2 mt-2">
                        {formData.achievements.length > 0 ? (
                          formData.achievements.map((ach, idx) => (
                            <li key={idx} className="flex items-center justify-between border rounded p-2">
                              <span>{ach}</span>
                              <Button variant="ghost" size="sm" onClick={() =>
                                setFormData(prev => ({
                                  ...prev,
                                  achievements: prev.achievements.filter((_, i) => i !== idx),
                                }))
                              }>
                                Remove
                              </Button>
                            </li>
                          ))
                        ) : (
                          <li className="text-muted-foreground text-sm">No achievements added yet.</li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                    disabled={currentStep === steps.length - 1}
                  >
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview/Templates Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Template Selection</CardTitle>
                <CardDescription>Choose a template for your resume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className={`cursor-pointer group border-2 rounded-lg p-3 transition-colors ${selectedTemplate === template.id
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-primary/50"
                        }`}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-16 bg-gray-100 rounded border flex items-center justify-center text-xs">
                          {template.name[0]}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{template.name}</h4>
                          <p className="text-xs text-muted-foreground mb-1">{template.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {template.features.map((feature, i) => (
                              <span key={i} className="text-xs bg-gray-100 px-1 rounded">
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>See how your resume looks with {selectedTemplate} template</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  id="resume-preview"
                  ref={previewRef}
                  className="border rounded-lg overflow-hidden"
                  style={{ transform: "scale(0.3)", transformOrigin: "top left", width: "333%", height: "333%" }}
                >
                  <TemplateSelector template={selectedTemplate} data={formData} />
                </div>
              </CardContent>
            </Card>

            {jobDescription && (
              <Alert className="mt-4">
                <Sparkles className="h-4 w-4" />
                <AlertDescription>
                  AI is ready to tailor your content based on the job description you provided!
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
