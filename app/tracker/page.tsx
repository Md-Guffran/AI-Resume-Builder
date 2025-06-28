"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, ArrowLeft, Filter, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

interface Job {
  id: number
  company: string
  position: string
  dateApplied: string
  status: string
  location: string
  salary: string
}

export default function JobTrackerPage() {
  // Persistent jobs state
  const [jobs, setJobs] = useState<Job[]>([])
  const [filterStatus, setFilterStatus] = useState("all")
  const [isAddJobOpen, setIsAddJobOpen] = useState(false)
  const [isEditJobOpen, setIsEditJobOpen] = useState(false)
  const [editJob, setEditJob] = useState<Job | null>(null)
  const [newJob, setNewJob] = useState({
    company: "",
    position: "",
    location: "",
    salary: "",
    status: "Applied",
  })

  // Load jobs from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("jobs")
    if (stored) setJobs(JSON.parse(stored))
  }, [])

  // Save jobs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs))
  }, [jobs])

  // Status color mapping
  const statusColors = {
    Applied: "secondary",
    Interviewing: "default",
    Offer: "default",
    Rejected: "destructive",
  }

  // Filtered jobs
  const filteredJobs = filterStatus === "all" ? jobs : jobs.filter((job) => job.status === filterStatus)

  // Status counts
  const statusCounts = {
    total: jobs.length,
    applied: jobs.filter((j) => j.status === "Applied").length,
    interviewing: jobs.filter((j) => j.status === "Interviewing").length,
    offers: jobs.filter((j) => j.status === "Offer").length,
    rejected: jobs.filter((j) => j.status === "Rejected").length,
  }

  // Add job
  const handleAddJob = () => {
    if (!newJob.company.trim() || !newJob.position.trim()) return
    const job: Job = {
      id: Date.now(),
      ...newJob,
      dateApplied: new Date().toISOString().split("T")[0],
    }
    setJobs([job, ...jobs])
    setNewJob({ company: "", position: "", location: "", salary: "", status: "Applied" })
    setIsAddJobOpen(false)
  }

  // Delete job
  const handleDeleteJob = (id: number) => {
    if (confirm("Are you sure you want to delete this job application?")) {
      setJobs(jobs.filter((job) => job.id !== id))
    }
  }

  // Edit job
  const openEditJob = (job: Job) => {
    setEditJob(job)
    setIsEditJobOpen(true)
  }
  const handleEditJob = () => {
    if (!editJob) return
    setJobs(jobs.map(j => j.id === editJob.id ? editJob : j))
    setIsEditJobOpen(false)
    setEditJob(null)
  }

  // View job (demo)
  const handleViewJob = (job: Job) => {
    alert(`Viewing "${job.position}" at ${job.company}`)
  }

  // Update dashboard stats in localStorage
  function updateDashboardStats(newApplications: number, newInterviews: number) {
    const stats = localStorage.getItem("dashboardStats")
    const parsed = stats ? JSON.parse(stats) : { applications: 0, interviews: 0 }
    parsed.applications = newApplications
    parsed.interviews = newInterviews
    localStorage.setItem("dashboardStats", JSON.stringify(parsed))
  }

  // Success rate calculation
  const applications = statusCounts.applied + statusCounts.interviewing + statusCounts.offers + statusCounts.rejected
  const interviews = statusCounts.interviewing
  const successRate = applications === 0 ? 0 : Math.round((interviews / applications) * 100)

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
                <div className="h-6 w-6 bg-primary rounded flex items-center justify-center">
                  <span className="text-primary-foreground text-xs font-bold">J</span>
                </div>
                <h1 className="text-xl font-semibold">Job Tracker</h1>
              </div>
            </div>
            <Dialog open={isAddJobOpen} onOpenChange={setIsAddJobOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Job
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Job Application</DialogTitle>
                  <DialogDescription>Track a new job application and monitor your progress</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={newJob.company}
                        onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                        placeholder="Google"
                      />
                    </div>
                    <div>
                      <Label htmlFor="position">Position</Label>
                      <Input
                        id="position"
                        value={newJob.position}
                        onChange={(e) => setNewJob({ ...newJob, position: e.target.value })}
                        placeholder="Software Engineer"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={newJob.location}
                        onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                        placeholder="San Francisco, CA"
                      />
                    </div>
                    <div>
                      <Label htmlFor="salary">Salary</Label>
                      <Input
                        id="salary"
                        value={newJob.salary}
                        onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                        placeholder="$120,000"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={newJob.status} onValueChange={(value) => setNewJob({ ...newJob, status: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Applied">Applied</SelectItem>
                        <SelectItem value="Interviewing">Interviewing</SelectItem>
                        <SelectItem value="Offer">Offer</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsAddJobOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddJob} disabled={!newJob.company.trim() || !newJob.position.trim()}>
                      Add Job
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{statusCounts.total}</div>
              <p className="text-xs text-muted-foreground">Total Applications</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">{statusCounts.applied}</div>
              <p className="text-xs text-muted-foreground">Applied</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-yellow-600">{statusCounts.interviewing}</div>
              <p className="text-xs text-muted-foreground">Interviewing</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">{statusCounts.offers}</div>
              <p className="text-xs text-muted-foreground">Offers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-red-600">{statusCounts.rejected}</div>
              <p className="text-xs text-muted-foreground">Rejected</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Job Applications</CardTitle>
                <CardDescription>Track and manage your job applications</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Applied">Applied</SelectItem>
                    <SelectItem value="Interviewing">Interviewing</SelectItem>
                    <SelectItem value="Offer">Offer</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Salary</TableHead>
                  <TableHead>Date Applied</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.company}</TableCell>
                    <TableCell>{job.position}</TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell>{job.salary}</TableCell>
                    <TableCell>{job.dateApplied}</TableCell>
                    <TableCell>
                      <Badge variant={statusColors[job.status as keyof typeof statusColors] as any}>{job.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewJob(job)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openEditJob(job)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteJob(job.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Edit Job Dialog */}
      <Dialog open={isEditJobOpen} onOpenChange={setIsEditJobOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Job Application</DialogTitle>
            <DialogDescription>Update your job application details</DialogDescription>
          </DialogHeader>
          {editJob && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="editCompany">Company</Label>
                  <Input
                    id="editCompany"
                    value={editJob.company}
                    onChange={e => setEditJob({ ...editJob, company: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="editPosition">Position</Label>
                  <Input
                    id="editPosition"
                    value={editJob.position}
                    onChange={e => setEditJob({ ...editJob, position: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="editLocation">Location</Label>
                  <Input
                    id="editLocation"
                    value={editJob.location}
                    onChange={e => setEditJob({ ...editJob, location: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="editSalary">Salary</Label>
                  <Input
                    id="editSalary"
                    value={editJob.salary}
                    onChange={e => setEditJob({ ...editJob, salary: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="editStatus">Status</Label>
                <Select value={editJob.status} onValueChange={value => setEditJob({ ...editJob, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Applied">Applied</SelectItem>
                    <SelectItem value="Interviewing">Interviewing</SelectItem>
                    <SelectItem value="Offer">Offer</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditJobOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleEditJob} disabled={!editJob.company.trim() || !editJob.position.trim()}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
