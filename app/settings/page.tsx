"use client"

import { DialogTrigger } from "@/components/ui/dialog"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  User,
  Bell,
  Shield,
  Palette,
  Save,
  Upload,
  Download,
  Trash2,
  FileText,
  CheckCircle,
  AlertCircle,
  Mail,
  MessageSquare,
  Linkedin,
  Globe,
  Eye,
  EyeOff,
  Key,
  CreditCard,
  HelpCircle,
  Star,
  Zap,
  Users,
  BarChart3,
  Clock,
  Database,
  Lock,
  Smartphone,
  Monitor,
  Moon,
  Sun,
  Github,
  Settings,
  ChevronDown,
} from "lucide-react"
import { useTheme } from "next-themes"
import { ThemeToggle } from "@/components/theme-toggle"
import { Checkbox } from "@/components/ui/checkbox"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [saveStatus, setSaveStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  })

  const [profile, setProfile] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    newEmail: "",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    website: "johndoe.com",
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
    twitter: "",
    bio: "Experienced software engineer with a passion for building great products.",
    avatar: "",
    jobTitle: "Senior Software Engineer",
    company: "Tech Corp",
    yearsExperience: "5-7",
    industry: "technology",
    skills: "JavaScript, React, Node.js, Python",
  })

  const [contactForm, setContactForm] = useState({
    subject: "",
    category: "general",
    message: "",
    priority: "medium",
    attachFile: false,
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
    jobAlerts: true,
    resumeAnalysis: true,
    applicationReminders: false,
    marketingEmails: false,
    securityAlerts: true,
    productUpdates: true,
    communityUpdates: false,
    aiTips: true,
    weeklyReport: true,
  })

  const [preferences, setPreferences] = useState({
    language: "en",
    timezone: "America/New_York",
    dateFormat: "MM/DD/YYYY",
    currency: "USD",
    autoSave: true,
    showTips: true,
    defaultTemplate: "modern",
    resumePrivacy: "private",
    aiAssistance: true,
    darkMode: "system",
    compactMode: false,
    animationsEnabled: true,
    soundEnabled: false,
    keyboardShortcuts: true,
  })

  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
    loginAlerts: true,
    sessionTimeout: "30",
    dataRetention: "2years",
    passwordLastChanged: "2024-01-15",
    activeSessions: 3,
    trustedDevices: 2,
  })

  const [subscription, setSubscription] = useState({
    plan: "free",
    resumesCreated: 3,
    resumeLimit: 999, // Unlimited for free
    analysesUsed: 8,
    analysisLimit: 999, // Unlimited for free
    storageUsed: "2.3 GB",
    storageLimit: "Unlimited",
    nextBillingDate: "",
    autoRenew: false,
  })

  const [exportSettings, setExportSettings] = useState({
    defaultFormat: "pdf",
    includePhoto: false,
    watermark: false,
    compression: "medium",
    colorProfile: "sRGB",
    pageSize: "A4",
    margins: "normal",
  })

  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false)
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    showCurrentPassword: false,
    showNewPassword: false,
    showConfirmPassword: false,
  })

  // Handle mounting for theme
  useEffect(() => {
    setMounted(true)
  }, [])

  const showSaveStatus = (type: "success" | "error", message: string) => {
    setSaveStatus({ type, message })
    setTimeout(() => setSaveStatus({ type: null, message: "" }), 3000)
  }

  const handleSaveProfile = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      showSaveStatus("success", "Profile updated successfully!")
    } catch (error) {
      showSaveStatus("error", "Failed to update profile. Please try again.")
    }
  }

  const handleChangeEmail = async () => {
    if (!profile.newEmail) {
      showSaveStatus("error", "Please enter a new email address")
      return
    }
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      showSaveStatus("success", "Verification email sent to your new address!")
      setProfile((prev) => ({ ...prev, newEmail: "" }))
    } catch (error) {
      showSaveStatus("error", "Failed to change email. Please try again.")
    }
  }

  const handleContactSubmit = async () => {
    if (!contactForm.subject || !contactForm.message) {
      showSaveStatus("error", "Please fill in all required fields")
      return
    }
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      showSaveStatus("success", "Message sent successfully! We'll get back to you within 24 hours.")
      setContactForm({ subject: "", category: "general", message: "", priority: "medium", attachFile: false })
      setIsContactDialogOpen(false)
    } catch (error) {
      showSaveStatus("error", "Failed to send message. Please try again.")
    }
  }

  const handlePasswordChange = async () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      showSaveStatus("error", "Please fill in all password fields")
      return
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showSaveStatus("error", "New passwords do not match")
      return
    }
    if (passwordForm.newPassword.length < 8) {
      showSaveStatus("error", "Password must be at least 8 characters long")
      return
    }
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      showSaveStatus("success", "Password changed successfully!")
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        showCurrentPassword: false,
        showNewPassword: false,
        showConfirmPassword: false,
      })
      setIsPasswordDialogOpen(false)
      setSecurity((prev) => ({ ...prev, passwordLastChanged: new Date().toISOString().split("T")[0] }))
    } catch (error) {
      showSaveStatus("error", "Failed to change password. Please try again.")
    }
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    setPreferences((prev) => ({ ...prev, darkMode: newTheme }))
    showSaveStatus("success", `Theme changed to ${newTheme}`)
    // Force re-render after theme change
    setTimeout(() => {
      document.documentElement.setAttribute('data-theme', newTheme)
    }, 100)
  }

  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const passwordStrength = getPasswordStrength(passwordForm.newPassword)
  const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"]
  const strengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"]

  if (!mounted) {
    return null
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <SidebarTrigger />
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-xs capitalize">
            {subscription.plan} Plan
          </Badge>
          <ThemeToggle />
        </div>
      </div>

      {/* Save Status Alert */}
      {saveStatus.type && (
        <Alert variant={saveStatus.type === "success" ? "default" : "destructive"}>
          {saveStatus.type === "success" ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          <AlertDescription>{saveStatus.message}</AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Profile Information</span>
              </CardTitle>
              <CardDescription>Update your personal information and professional details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.fullName} />
                  <AvatarFallback className="text-lg">
                    {profile.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Label htmlFor="avatar">Profile Picture</Label>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <label htmlFor="avatar" className="cursor-pointer">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload
                      </label>
                    </Button>
                    <input
                      id="avatar"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const reader = new FileReader()
                          reader.onload = (e) => {
                            setProfile((prev) => ({ ...prev, avatar: e.target?.result as string }))
                          }
                          reader.readAsDataURL(file)
                          showSaveStatus("success", "Avatar uploaded successfully!")
                        }
                      }}
                    />
                    {profile.avatar && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setProfile((prev) => ({ ...prev, avatar: "" }))}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    value={profile.jobTitle}
                    onChange={(e) => setProfile({ ...profile, jobTitle: e.target.value })}
                    placeholder="Your current job title"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={profile.company}
                    onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                    placeholder="Your current company"
                  />
                </div>
                <div>
                  <Label htmlFor="yearsExperience">Years of Experience</Label>
                  <Select
                    value={profile.yearsExperience}
                    onValueChange={(value) => setProfile({ ...profile, yearsExperience: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1">0-1 years</SelectItem>
                      <SelectItem value="2-4">2-4 years</SelectItem>
                      <SelectItem value="5-7">5-7 years</SelectItem>
                      <SelectItem value="8-10">8-10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    placeholder="Your phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    placeholder="City, State/Country"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="industry">Industry</Label>
                <Select value={profile.industry} onValueChange={(value) => setProfile({ ...profile, industry: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h4 className="font-medium">Social & Professional Links</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="github" className="flex items-center space-x-1">
                      <Github className="h-4 w-4" />
                      <span>GitHub</span>
                    </Label>
                    <Input
                      id="github"
                      value={profile.github}
                      onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                      placeholder="github.com/username"
                    />
                  </div>
                  <div>
                    <Label htmlFor="twitter" className="flex items-center space-x-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>Twitter</span>
                    </Label>
                    <Input
                      id="twitter"
                      value={profile.twitter}
                      onChange={(e) => setProfile({ ...profile, twitter: e.target.value })}
                      placeholder="twitter.com/username"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="website" className="flex items-center space-x-1">
                      <Globe className="h-4 w-4" />
                      <span>Website</span>
                    </Label>
                    <Input
                      id="website"
                      value={profile.website}
                      onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                      placeholder="your-website.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkedin" className="flex items-center space-x-1">
                      <Linkedin className="h-4 w-4" />
                      <span>LinkedIn</span>
                    </Label>
                    <Input
                      id="linkedin"
                      value={profile.linkedin}
                      onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                      placeholder="linkedin.com/in/username"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="skills">Key Skills</Label>
                <Textarea
                  id="skills"
                  value={profile.skills}
                  onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
                  rows={2}
                  placeholder="List your key skills separated by commas"
                />
              </div>

              <div>
                <Label htmlFor="bio">Professional Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  rows={3}
                  placeholder="Brief professional summary"
                />
              </div>

              <Button onClick={handleSaveProfile} className="w-full sm:w-auto">
                <Save className="mr-2 h-4 w-4" />
                Save Profile
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Account Settings</span>
              </CardTitle>
              <CardDescription>Manage your account credentials and settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email Change */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="currentEmail">Current Email</Label>
                  <Input id="currentEmail" value={profile.email} disabled />
                </div>
                <div>
                  <Label htmlFor="newEmail">New Email Address</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="newEmail"
                      type="email"
                      value={profile.newEmail}
                      onChange={(e) => setProfile({ ...profile, newEmail: e.target.value })}
                      placeholder="Enter new email address"
                    />
                    <Button onClick={handleChangeEmail} disabled={!profile.newEmail}>
                      <Mail className="mr-2 h-4 w-4" />
                      Change Email
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    A verification email will be sent to your new address
                  </p>
                </div>
              </div>

              <Separator />

              {/* Password Change */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Password</h4>
                    <p className="text-sm text-muted-foreground">Last changed: {security.passwordLastChanged}</p>
                  </div>
                  <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Key className="mr-2 h-4 w-4" />
                        Change Password
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Change Password</DialogTitle>
                        <DialogDescription>Enter your current password and choose a new one</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <div className="relative">
                            <Input
                              id="currentPassword"
                              type={passwordForm.showCurrentPassword ? "text" : "password"}
                              value={passwordForm.currentPassword}
                              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                              placeholder="Enter current password"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() =>
                                setPasswordForm({
                                  ...passwordForm,
                                  showCurrentPassword: !passwordForm.showCurrentPassword,
                                })
                              }
                            >
                              {passwordForm.showCurrentPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="newPassword">New Password</Label>
                          <div className="relative">
                            <Input
                              id="newPassword"
                              type={passwordForm.showNewPassword ? "text" : "password"}
                              value={passwordForm.newPassword}
                              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                              placeholder="Enter new password"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() =>
                                setPasswordForm({
                                  ...passwordForm,
                                  showNewPassword: !passwordForm.showNewPassword,
                                })
                              }
                            >
                              {passwordForm.showNewPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                          {passwordForm.newPassword && (
                            <div className="space-y-2 mt-2">
                              <div className="flex space-x-1">
                                {[1, 2, 3, 4, 5].map((level) => (
                                  <div
                                    key={level}
                                    className={`h-1 flex-1 rounded ${
                                      level <= passwordStrength ? strengthColors[passwordStrength - 1] : "bg-gray-200"
                                    }`}
                                  />
                                ))}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Password strength: {strengthLabels[passwordStrength - 1] || "Very Weak"}
                              </p>
                            </div>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <div className="relative">
                            <Input
                              id="confirmPassword"
                              type={passwordForm.showConfirmPassword ? "text" : "password"}
                              value={passwordForm.confirmPassword}
                              onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                              placeholder="Confirm new password"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() =>
                                setPasswordForm({
                                  ...passwordForm,
                                  showConfirmPassword: !passwordForm.showConfirmPassword,
                                })
                              }
                            >
                              {passwordForm.showConfirmPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                          {passwordForm.confirmPassword &&
                            passwordForm.newPassword !== passwordForm.confirmPassword && (
                              <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                            )}
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setIsPasswordDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handlePasswordChange}>Change Password</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <Separator />

              {/* Account Preferences */}
              <div className="space-y-4">
                <h4 className="font-medium">Account Preferences</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="language">Language</Label>
                    <Select
                      value={preferences.language}
                      onValueChange={(value) => setPreferences({ ...preferences, language: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="it">Italian</SelectItem>
                        <SelectItem value="pt">Portuguese</SelectItem>
                        <SelectItem value="zh">Chinese</SelectItem>
                        <SelectItem value="ja">Japanese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      value={preferences.timezone}
                      onValueChange={(value) => setPreferences({ ...preferences, timezone: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                        <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                        <SelectItem value="Europe/London">London (GMT)</SelectItem>
                        <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
                        <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                        <SelectItem value="Asia/Shanghai">Shanghai (CST)</SelectItem>
                        <SelectItem value="Australia/Sydney">Sydney (AEDT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5" />
                <span>Appearance & Theme</span>
              </CardTitle>
              <CardDescription>Customize how the application looks and feels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Theme Selection */}
              <div className="space-y-4">
                <h4 className="font-medium">Theme Mode</h4>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: "light", label: "Light", icon: Sun },
                    { value: "dark", label: "Dark", icon: Moon },
                    { value: "system", label: "System", icon: Monitor },
                  ].map((themeOption) => (
                    <div
                      key={themeOption.value}
                      className={`cursor-pointer border-2 rounded-lg p-4 text-center transition-colors ${
                        theme === themeOption.value
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-primary/50"
                      }`}
                      onClick={() => handleThemeChange(themeOption.value)}
                    >
                      <themeOption.icon className="h-8 w-8 mx-auto mb-2" />
                      <p className="font-medium">{themeOption.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {themeOption.value === "system" ? "Follow system" : `${themeOption.label} mode`}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Display Preferences */}
              <div className="space-y-4">
                <h4 className="font-medium">Display Preferences</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="compactMode">Compact Mode</Label>
                      <p className="text-sm text-muted-foreground">Reduce spacing and padding</p>
                    </div>
                    <Switch
                      id="compactMode"
                      checked={preferences.compactMode}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, compactMode: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="animationsEnabled">Animations</Label>
                      <p className="text-sm text-muted-foreground">Enable smooth transitions and animations</p>
                    </div>
                    <Switch
                      id="animationsEnabled"
                      checked={preferences.animationsEnabled}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, animationsEnabled: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="soundEnabled">Sound Effects</Label>
                      <p className="text-sm text-muted-foreground">Play sounds for notifications and actions</p>
                    </div>
                    <Switch
                      id="soundEnabled"
                      checked={preferences.soundEnabled}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, soundEnabled: checked })}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Resume Defaults */}
              <div className="space-y-4">
                <h4 className="font-medium">Resume Defaults</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="defaultTemplate">Default Template</Label>
                    <Select
                      value={preferences.defaultTemplate}
                      onValueChange={(value) => setPreferences({ ...preferences, defaultTemplate: value })}
                    >
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
                    <Label htmlFor="resumePrivacy">Default Privacy</Label>
                    <Select
                      value={preferences.resumePrivacy}
                      onValueChange={(value) => setPreferences({ ...preferences, resumePrivacy: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="private">Private</SelectItem>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="unlisted">Unlisted</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => {
                  showSaveStatus("success", "Appearance settings saved!")
                }}
              >
                <Save className="mr-2 h-4 w-4" />
                Save Appearance
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Preferences</span>
              </CardTitle>
              <CardDescription>Choose what notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email Notifications */}
              <div className="space-y-4">
                <h4 className="font-medium">Email Notifications</h4>
                <div className="space-y-4">
                  {[
                    {
                      key: "emailNotifications",
                      label: "Email Notifications",
                      desc: "Receive notifications via email",
                    },
                    { key: "weeklyDigest", label: "Weekly Digest", desc: "Get a weekly summary of your activity" },
                    { key: "jobAlerts", label: "Job Alerts", desc: "Get notified about relevant job opportunities" },
                    {
                      key: "resumeAnalysis",
                      label: "Resume Analysis",
                      desc: "Notifications when resume analysis is complete",
                    },
                    {
                      key: "applicationReminders",
                      label: "Application Reminders",
                      desc: "Reminders for job application deadlines",
                    },
                    { key: "securityAlerts", label: "Security Alerts", desc: "Important security notifications" },
                    { key: "productUpdates", label: "Product Updates", desc: "New features and improvements" },
                    { key: "aiTips", label: "AI Tips", desc: "Weekly AI-powered career tips and insights" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between">
                      <div>
                        <Label htmlFor={item.key}>{item.label}</Label>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                      <Switch
                        id={item.key}
                        checked={notifications[item.key as keyof typeof notifications]}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, [item.key]: checked })}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Push Notifications */}
              <div className="space-y-4">
                <h4 className="font-medium">Browser Notifications</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="pushNotifications">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive push notifications in your browser</p>
                    </div>
                    <Switch
                      id="pushNotifications"
                      checked={notifications.pushNotifications}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, pushNotifications: checked })}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Marketing */}
              <div className="space-y-4">
                <h4 className="font-medium">Marketing & Community</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="marketingEmails">Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">Receive product updates and tips</p>
                    </div>
                    <Switch
                      id="marketingEmails"
                      checked={notifications.marketingEmails}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, marketingEmails: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="communityUpdates">Community Updates</Label>
                      <p className="text-sm text-muted-foreground">Updates from the ResumeAI community</p>
                    </div>
                    <Switch
                      id="communityUpdates"
                      checked={notifications.communityUpdates}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, communityUpdates: checked })}
                    />
                  </div>
                </div>
              </div>

              <Button
                onClick={() => {
                  showSaveStatus("success", "Notification preferences saved!")
                }}
              >
                <Save className="mr-2 h-4 w-4" />
                Save Notifications
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security & Privacy</span>
              </CardTitle>
              <CardDescription>Manage your account security and privacy settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Two-Factor Authentication */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={security.twoFactorEnabled ? "default" : "secondary"}>
                      {security.twoFactorEnabled ? "Enabled" : "Disabled"}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSecurity((prev) => ({ ...prev, twoFactorEnabled: !prev.twoFactorEnabled }))
                        showSaveStatus(
                          "success",
                          security.twoFactorEnabled ? "2FA disabled" : "2FA enabled successfully!",
                        )
                      }}
                    >
                      {security.twoFactorEnabled ? "Disable" : "Enable"}
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Session Management */}
              <div className="space-y-4">
                <h4 className="font-medium">Session Management</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Active Sessions</Label>
                    <p className="text-2xl font-bold">{security.activeSessions}</p>
                    <p className="text-xs text-muted-foreground">Currently signed in devices</p>
                  </div>
                  <div>
                    <Label>Trusted Devices</Label>
                    <p className="text-2xl font-bold">{security.trustedDevices}</p>
                    <p className="text-xs text-muted-foreground">Devices you trust</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Smartphone className="mr-2 h-4 w-4" />
                    View Sessions
                  </Button>
                  <Button variant="outline" size="sm">
                    <Lock className="mr-2 h-4 w-4" />
                    Sign Out All
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Privacy Settings */}
              <div className="space-y-4">
                <h4 className="font-medium">Privacy Settings</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="loginAlerts">Login Alerts</Label>
                      <p className="text-sm text-muted-foreground">Get notified of new login attempts</p>
                    </div>
                    <Switch
                      id="loginAlerts"
                      checked={security.loginAlerts}
                      onCheckedChange={(checked) => setSecurity({ ...security, loginAlerts: checked })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="sessionTimeout">Session Timeout</Label>
                      <Select
                        value={security.sessionTimeout}
                        onValueChange={(value) => setSecurity({ ...security, sessionTimeout: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="240">4 hours</SelectItem>
                          <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="dataRetention">Data Retention</Label>
                      <Select
                        value={security.dataRetention}
                        onValueChange={(value) => setSecurity({ ...security, dataRetention: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1year">1 year</SelectItem>
                          <SelectItem value="2years">2 years</SelectItem>
                          <SelectItem value="5years">5 years</SelectItem>
                          <SelectItem value="forever">Forever</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => {
                  showSaveStatus("success", "Security settings saved!")
                }}
              >
                <Save className="mr-2 h-4 w-4" />
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subscription Tab */}
        <TabsContent value="subscription" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5" />
                <span>Subscription & Usagege</span>
              </CardTitle>
              <CardDescription>Manage your subscription and view usage statistics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Current Plan */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium capitalize">{subscription.plan} Plan</h4>
                    <p className="text-sm text-muted-foreground">
                      {subscription.plan === "free"
                        ? "Free forever with basic features"
                        : `Next billing: ${subscription.nextBillingDate}`}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    {subscription.plan === "free" && (
                      <Button>
                        <Zap className="mr-2 h-4 w-4" />
                        Upgrade to Pro
                      </Button>
                    )}
                    {subscription.plan !== "free" && (
                      <Button variant="outline">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Manage Billing
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Usage Statistics */}
              <div className="space-y-4">
                <h4 className="font-medium">Usage This Month</h4>
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Resumes Created</p>
                          <p className="text-2xl font-bold">
                            {subscription.resumesCreated}/{subscription.resumeLimit}
                          </p>
                        </div>
                        <FileText className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{
                              width: `${(subscription.resumesCreated / subscription.resumeLimit) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">AI Analyses</p>
                          <p className="text-2xl font-bold">
                            {subscription.analysesUsed}/{subscription.analysisLimit}
                          </p>
                        </div>
                        <BarChart3 className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{
                              width: `${(subscription.analysesUsed / subscription.analysisLimit) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Storage Used</p>
                        <p className="text-2xl font-bold">
                          {subscription.storageUsed} / {subscription.storageLimit}
                        </p>
                      </div>
                      <Database className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: "46%" }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {subscription.plan !== "free" && (
                <>
                  <Separator />
                  <div className="space-y-4">
                    <h4 className="font-medium">Billing Settings</h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="autoRenew">Auto-renewal</Label>
                        <p className="text-sm text-muted-foreground">Automatically renew your subscription</p>
                      </div>
                      <Switch
                        id="autoRenew"
                        checked={subscription.autoRenew}
                        onCheckedChange={(checked) => setSubscription({ ...subscription, autoRenew: checked })}
                      />
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Support Tab */}
        <TabsContent value="support" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <HelpCircle className="h-5 w-5" />
                <span>Help & Support</span>
              </CardTitle>
              <CardDescription>Get help, send feedback, or contact our support team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Quick Help */}
              <div className="space-y-4">
                <h4 className="font-medium">Quick Help</h4>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                    <FileText className="h-6 w-6 mb-2" />
                    <span className="font-medium">Documentation</span>
                    <span className="text-xs text-muted-foreground">Learn how to use ResumeAI</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                    <MessageSquare className="h-6 w-6 mb-2" />
                    <span className="font-medium">FAQ</span>
                    <span className="text-xs text-muted-foreground">Find answers to common questions</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                    <Users className="h-6 w-6 mb-2" />
                    <span className="font-medium">Community</span>
                    <span className="text-xs text-muted-foreground">Connect with other users</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                    <Star className="h-6 w-6 mb-2" />
                    <span className="font-medium">Feature Requests</span>
                    <span className="text-xs text-muted-foreground">Suggest new features</span>
                  </Button>
                </div>
              </div>

              <Separator />

              {/* FAQ Section */}
              <div className="space-y-4">
                <h4 className="font-medium">Frequently Asked Questions</h4>
                <div className="space-y-3">
                  <details className="group">
                    <summary className="flex cursor-pointer items-center justify-between rounded-lg bg-muted p-4 font-medium">
                      How do I create my first resume?
                      <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="mt-2 px-4 pb-4 text-sm text-muted-foreground">
                      Navigate to the Resume Builder from the sidebar, choose a template, and fill in your information. Our AI will help optimize your content.
                    </div>
                  </details>
                  <details className="group">
                    <summary className="flex cursor-pointer items-center justify-between rounded-lg bg-muted p-4 font-medium">
                      How does the AI analysis work?
                      <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="mt-2 px-4 pb-4 text-sm text-muted-foreground">
                      Our AI analyzes your resume for content quality, formatting, keywords, and provides suggestions for improvement based on industry standards.
                    </div>
                  </details>
                  <details className="group">
                    <summary className="flex cursor-pointer items-center justify-between rounded-lg bg-muted p-4 font-medium">
                      Can I export my resume in different formats?
                      <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="mt-2 px-4 pb-4 text-sm text-muted-foreground">
                      Yes! You can export your resume as PDF, Word document, or plain text. Go to Settings &gt; Support &gt; Data Export to configure your preferences.
                    </div>
                  </details>
                  <details className="group">
                    <summary className="flex cursor-pointer items-center justify-between rounded-lg bg-muted p-4 font-medium">
                      Is my data secure?
                      <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="mt-2 px-4 pb-4 text-sm text-muted-foreground">
                      Absolutely. We use industry-standard encryption and never share your personal information. You can export or delete your data at any time.
                    </div>
                  </details>
                  <details className="group">
                    <summary className="flex cursor-pointer items-center justify-between rounded-lg bg-muted p-4 font-medium">
                      How do I track my job applications?
                      <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="mt-2 px-4 pb-4 text-sm text-muted-foreground">
                      Use the Job Tracker feature to log applications, set reminders, and track your progress through different stages of the hiring process.
                    </div>
                  </details>
                </div>
              </div>

              <Separator />

              {/* Documentation */}
              <div className="space-y-4">
                <h4 className="font-medium">Documentation</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <div className="flex items-start space-x-3">
                      <FileText className="h-5 w-5 mt-1 text-primary" />
                      <div>
                        <h5 className="font-medium">Getting Started Guide</h5>
                        <p className="text-sm text-muted-foreground mt-1">
                          Learn the basics of creating your first resume with ResumeAI
                        </p>
                        <Button variant="link" className="p-0 h-auto mt-2">
                          Read Guide →
                        </Button>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-start space-x-3">
                      <BarChart3 className="h-5 w-5 mt-1 text-primary" />
                      <div>
                        <h5 className="font-medium">AI Analysis Features</h5>
                        <p className="text-sm text-muted-foreground mt-1">
                          Understand how our AI analyzes and improves your resume
                        </p>
                        <Button variant="link" className="p-0 h-auto mt-2">
                          Learn More →
                        </Button>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-start space-x-3">
                      <Users className="h-5 w-5 mt-1 text-primary" />
                      <div>
                        <h5 className="font-medium">Job Tracking</h5>
                        <p className="text-sm text-muted-foreground mt-1">
                          Master the job application tracking system
                        </p>
                        <Button variant="link" className="p-0 h-auto mt-2">
                          View Tutorial →
                        </Button>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-start space-x-3">
                      <Settings className="h-5 w-5 mt-1 text-primary" />
                      <div>
                        <h5 className="font-medium">Advanced Settings</h5>
                        <p className="text-sm text-muted-foreground mt-1">
                          Customize ResumeAI to fit your workflow
                        </p>
                        <Button variant="link" className="p-0 h-auto mt-2">
                          Explore Settings →
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Feature Requests */}
              <div className="space-y-4">
                <h4 className="font-medium">Suggest New Features</h4>
                <Card className="p-4">
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Have an idea for a new feature? We'd love to hear from you! Your suggestions help us make ResumeAI better.
                    </p>
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => {
                          setContactForm(prev => ({ ...prev, category: "feature", subject: "Feature Request: " }))
                          setIsContactDialogOpen(true)
                        }}
                      >
                        <Star className="mr-2 h-4 w-4" />
                        Suggest Feature
                      </Button>
                      <Button variant="outline">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        View Roadmap
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>

              <Separator />

              {/* Contact Support */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Contact Support</h4>
                  <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Mail className="mr-2 h-4 w-4" />
                        Contact Us
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Contact Support</DialogTitle>
                        <DialogDescription>
                          Send us a message and we'll get back to you within 24 hours
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="category">Category</Label>
                            <Select
                              value={contactForm.category}
                              onValueChange={(value) => setContactForm({ ...contactForm, category: value })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="general">General Question</SelectItem>
                                <SelectItem value="technical">Technical Issue</SelectItem>
                                <SelectItem value="billing">Billing & Subscription</SelectItem>
                                <SelectItem value="feature">Feature Request</SelectItem>
                                <SelectItem value="bug">Bug Report</SelectItem>
                                <SelectItem value="feedback">Feedback</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="priority">Priority</Label>
                            <Select
                              value={contactForm.priority}
                              onValueChange={(value) => setContactForm({ ...contactForm, priority: value })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="urgent">Urgent</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="subject">Subject *</Label>
                          <Input
                            id="subject"
                            value={contactForm.subject}
                            onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                            placeholder="Brief description of your issue or question"
                          />
                        </div>
                        <div>
                          <Label htmlFor="message">Message *</Label>
                          <Textarea
                            id="message"
                            value={contactForm.message}
                            onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                            rows={6}
                            placeholder="Please provide as much detail as possible..."
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="attachFile"
                            checked={contactForm.attachFile}
                            onCheckedChange={(checked) =>
                              setContactForm({ ...contactForm, attachFile: checked as boolean })
                            }
                          />
                          <Label htmlFor="attachFile" className="text-sm">
                            I would like to attach a file (we'll follow up via email)
                          </Label>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setIsContactDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleContactSubmit}>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Message
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>drakgami07@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Response within 24h</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>Live chat available</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* System Information */}
              <div className="space-y-4">
                <h4 className="font-medium">System Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label>App Version</Label>
                    <p className="text-muted-foreground">v2.1.0</p>
                  </div>
                  <div>
                    <Label>Last Updated</Label>
                    <p className="text-muted-foreground">January 15, 2024</p>
                  </div>
                  <div>
                    <Label>Browser</Label>
                    <p className="text-muted-foreground">{navigator.userAgent.split(" ")[0]}</p>
                  </div>
                  <div>
                    <Label>Platform</Label>
                    <p className="text-muted-foreground">{navigator.platform}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download Debug Info
                </Button>
              </div>

              <Separator />

              {/* Feedback */}
              <div className="space-y-4">
                <h4 className="font-medium">Help Us Improve</h4>
                <p className="text-sm text-muted-foreground">
                  Your feedback helps us make ResumeAI better for everyone
                </p>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Star className="mr-2 h-4 w-4" />
                    Rate ResumeAI
                  </Button>
                  <Button variant="outline">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Send Feedback
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Live Chat */}
              <div className="space-y-4">
                <h4 className="font-medium">Live Support</h4>
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                      <div>
                        <p className="font-medium">Live Chat Available</p>
                        <p className="text-sm text-muted-foreground">Average response time: 2 minutes</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        // Simulate opening live chat
                        showSaveStatus("success", "Live chat opened! A support agent will be with you shortly.")
                      }}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Start Chat
                    </Button>
                  </div>
                </Card>
              </div>

              <Separator />

              {/* Data Export & Management */}
              <div className="space-y-4">
                <h4 className="font-medium">Data Export & Management</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="defaultFormat">Default Export Format</Label>
                    <Select
                      value={exportSettings.defaultFormat}
                      onValueChange={(value) => setExportSettings({ ...exportSettings, defaultFormat: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="docx">Word Document</SelectItem>
                        <SelectItem value="txt">Plain Text</SelectItem>
                        <SelectItem value="json">JSON Data</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="compression">PDF Compression</Label>
                    <Select
                      value={exportSettings.compression}
                      onValueChange={(value) => setExportSettings({ ...exportSettings, compression: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low (Best Quality)</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High (Smaller Size)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={() => {
                      // Create comprehensive data export
                      const exportData = {
                        profile,
                        preferences,
                        notifications,
                        security: { ...security, passwordLastChanged: security.passwordLastChanged },
                        exportSettings,
                        exportDate: new Date().toISOString(),
                        version: "2.1.0"
                      }
                      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
                      const url = URL.createObjectURL(blob)
                      const a = document.createElement("a")
                      a.href = url
                      a.download = `resumeai-data-${new Date().toISOString().split('T')[0]}.json`
                      document.body.appendChild(a)
                      a.click()
                      document.body.removeChild(a)
                      URL.revokeObjectURL(url)
                      showSaveStatus("success", "Data exported successfully!")
                    }}
                    variant="outline"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export My Data
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const input = document.createElement('input')
                      input.type = 'file'
                      input.accept = '.json'
                      input.onchange = (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0]
                        if (file) {
                          const reader = new FileReader()
                          reader.onload = (e) => {
                            try {
                              const importedData = JSON.parse(e.target?.result as string)
                              if (importedData.profile) setProfile(importedData.profile)
                              if (importedData.preferences) setPreferences(importedData.preferences)
                              if (importedData.notifications) setNotifications(importedData.notifications)
                              if (importedData.exportSettings) setExportSettings(importedData.exportSettings)
                              showSaveStatus("success", "Data imported successfully!")
                            } catch (error) {
                              showSaveStatus("error", "Invalid file format. Please select a valid ResumeAI data file.")
                            }
                          }
                          reader.readAsText(file)
                        }
                      }
                      input.click()
                    }}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Import Data
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Danger Zone */}
              <div className="space-y-4">
                <h4 className="font-medium">Danger Zone</h4>
                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-red-600">
                      <AlertCircle className="h-5 w-5" />
                      <span>Irreversible Actions</span>
                    </CardTitle>
                    <CardDescription>These actions are permanent and cannot be undone.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={() => {
                          // Create comprehensive backup
                          const backupData = {
                            profile,
                            preferences,
                            notifications,
                            security: { ...security, passwordLastChanged: security.passwordLastChanged },
                            subscription,
                            exportSettings,
                            contactForm,
                            backupDate: new Date().toISOString(),
                            version: "2.1.0",
                            type: "complete_backup"
                          }
                          const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json" })
                          const url = URL.createObjectURL(blob)
                          const a = document.createElement("a")
                          a.href = url
                          a.download = `resumeai-complete-backup-${new Date().toISOString().split('T')[0]}.json`
                          document.body.appendChild(a)
                          a.click()
                          document.body.removeChild(a)
                          URL.revokeObjectURL(url)
                          showSaveStatus("success", "Complete data backup downloaded successfully!")
                        }}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download All Data
                      </Button>
                      <p className="text-sm text-muted-foreground">
                        Download a complete backup of all your data before making any destructive changes.
                      </p>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Button
                        variant="destructive"
                        onClick={() => {
                          if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
                            alert("Account deletion would be processed here with proper confirmation.")
                          }
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Account
                      </Button>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all associated data. This action cannot be undone.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
