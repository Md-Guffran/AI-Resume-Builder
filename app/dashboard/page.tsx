"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { FileText, Download, Eye, Trash2, Plus, Edit } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import jsPDF from "jspdf"

interface Resume {
  id: number
  name: string
  template: string
  lastModified: string
  status: string
}

interface DashboardStats {
  applications: number
  interviews: number
}

function getDashboardStats(): DashboardStats {
  if (typeof window === "undefined") return { applications: 0, interviews: 0 }
  const stats = localStorage.getItem("dashboardStats")
  return stats ? JSON.parse(stats) : { applications: 0, interviews: 0 }
}

function setDashboardStats(stats: DashboardStats) {
  localStorage.setItem("dashboardStats", JSON.stringify(stats))
}

export default function DashboardPage() {
  // Stats
  const [applications, setApplications] = useState(0)
  const [interviews, setInterviews] = useState(0)

  // Resumes
  const [resumes, setResumes] = useState<Resume[]>([])
  const [isNewResumeOpen, setIsNewResumeOpen] = useState(false)
  const [newResumeName, setNewResumeName] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("modern")

  // Edit Resume
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editResume, setEditResume] = useState<Resume | null>(null)
  const [editResumeName, setEditResumeName] = useState("")
  const [editResumeTemplate, setEditResumeTemplate] = useState("modern")
  const [editResumeStatus, setEditResumeStatus] = useState("Draft")

  // Load resumes from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("resumes")
    if (stored) setResumes(JSON.parse(stored))
  }, [])

  // Save resumes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("resumes", JSON.stringify(resumes))
  }, [resumes])

  // Load stats from localStorage on mount
  useEffect(() => {
    const stats = getDashboardStats()
    setApplications(stats.applications)
    setInterviews(stats.interviews)
  }, [])

  // Save stats to localStorage whenever they change
  useEffect(() => {
    setDashboardStats({ applications, interviews })
  }, [applications, interviews])

  // Add Resume
  const handleCreateResume = () => {
    if (!newResumeName.trim()) return
    const newResume: Resume = {
      id: Date.now(),
      name: newResumeName,
      template: selectedTemplate,
      lastModified: "Just now",
      status: "Draft",
    }
    setResumes([newResume, ...resumes])
    setNewResumeName("")
    setSelectedTemplate("modern")
    setIsNewResumeOpen(false)
  }

  // Delete Resume
  const handleDeleteResume = (id: number) => {
    if (confirm("Are you sure you want to delete this resume?")) {
      setResumes(resumes.filter((resume) => resume.id !== id))
    }
  }

  // Download Resume as PDF
  const handleDownloadResume = (resume: Resume) => {
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text(resume.name, 10, 15)
    doc.setFontSize(12)
    doc.text(`Template: ${resume.template}`, 10, 25)
    doc.text(`Status: ${resume.status}`, 10, 35)
    doc.text(`Last Modified: ${resume.lastModified}`, 10, 45)
    doc.save(`${resume.name.replace(/\s+/g, "_")}.pdf`)
  }

  // View Resume
  const handleViewResume = (resume: Resume) => {
    alert(`Viewing "${resume.name}" (demo only)`)
  }

  // Edit Resume
  const openEditModal = (resume: Resume) => {
    setEditResume(resume)
    setEditResumeName(resume.name)
    setEditResumeTemplate(resume.template)
    setEditResumeStatus(resume.status)
    setIsEditOpen(true)
  }
  const handleEditResume = () => {
    if (!editResume) return
    setResumes(resumes.map(r =>
      r.id === editResume.id
        ? {
            ...r,
            name: editResumeName,
            template: editResumeTemplate,
            status: editResumeStatus,
            lastModified: "Just now",
          }
        : r
    ))
    setIsEditOpen(false)
    setEditResume(null)
  }

  // Success Rate Calculation
  const successRate = applications === 0 ? 0 : Math.round((interviews / applications) * 100)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <SidebarTrigger />
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Dialog open={isNewResumeOpen} onOpenChange={setIsNewResumeOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Resume
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Resume</DialogTitle>
                <DialogDescription>Start building a new resume with AI assistance</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="resumeName">Resume Name</Label>
                  <Input
                    id="resumeName"
                    placeholder="e.g., Software Engineer Resume"
                    value={newResumeName}
                    onChange={(e) => setNewResumeName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="template">Template</Label>
                  <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="creative">Creative</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsNewResumeOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateResume} disabled={!newResumeName.trim()}>
                    Create Resume
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Resumes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resumes.length}</div>
            <p className="text-xs text-muted-foreground">+{resumes.length - 3} from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications}</div>
            <p className="text-xs text-muted-foreground">+3 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{interviews}</div>
            <p className="text-xs text-muted-foreground">+2 scheduled</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{successRate}%</div>
            <p className="text-xs text-muted-foreground">
              {applications === 0 ? "No applications yet" : `Calculated from your stats`}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* My Resumes */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>My Resumes</CardTitle>
            <CardDescription>Manage and edit your saved resumes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {resumes.map((resume) => (
                <div key={resume.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-medium">{resume.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {resume.template} • {resume.lastModified}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={resume.status === "Complete" ? "default" : "secondary"}>{resume.status}</Badge>
                    <Button variant="ghost" size="sm" onClick={() => handleViewResume(resume)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDownloadResume(resume)}>
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => openEditModal(resume)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteResume(resume.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {resumes.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No resumes yet. Create your first resume to get started!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/builder" className="block">
              <Button className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Create New Resume
              </Button>
            </Link>
            <Link href="/analyzer" className="block">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Analyze Resume
              </Button>
            </Link>
            <Link href="/tracker" className="block">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Track New Job
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Edit Resume Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Resume</DialogTitle>
            <DialogDescription>Update your resume details</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="editResumeName">Resume Name</Label>
              <Input
                id="editResumeName"
                value={editResumeName}
                onChange={(e) => setEditResumeName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="editTemplate">Template</Label>
              <Select value={editResumeTemplate} onValueChange={setEditResumeTemplate}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                  <SelectItem value="minimal">Minimal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="editStatus">Status</Label>
              <Select value={editResumeStatus} onValueChange={setEditResumeStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Complete">Complete</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditResume} disabled={!editResumeName.trim()}>
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
