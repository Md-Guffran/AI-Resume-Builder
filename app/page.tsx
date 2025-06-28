import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Search, BarChart3, Zap, Shield, Users } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LandingPage() {
  const features = [
    {
      icon: FileText,
      title: "AI Resume Builder",
      description: "Create professional resumes with AI-powered suggestions and multiple templates",
    },
    {
      icon: Search,
      title: "ATS Analyzer",
      description: "Analyze your resume against job descriptions and get ATS compatibility scores",
    },
    {
      icon: BarChart3,
      title: "Job Tracker",
      description: "Track your job applications and monitor your progress with visual analytics",
    },
    {
      icon: Zap,
      title: "Smart Optimization",
      description: "Get personalized recommendations to improve your resume's impact",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data is secure and private. We never share your information",
    },
    {
      icon: Users,
      title: "Expert Templates",
      description: "Choose from professionally designed templates optimized for different industries",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <FileText className="h-8 w-8 text-primary" />
                <span className="font-bold text-xl">ResumeAI</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-foreground hover:text-primary">
                Home
              </Link>
              <Link href="/builder" className="text-foreground hover:text-primary">
                Resume Builder
              </Link>
              <Link href="/analyzer" className="text-foreground hover:text-primary">
                Analyzer
              </Link>
              <Link href="/tracker" className="text-foreground hover:text-primary">
                Job Tracker
              </Link>
              <ThemeToggle />
              <Link href="/auth/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            ✨ AI-Powered Resume Intelligence
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Build Smarter Resumes
            <span className="text-primary block">with AI</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Create professional resumes, analyze ATS compatibility, and track your job applications all in one powerful
            platform powered by artificial intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/builder">
              <Button size="lg" className="w-full sm:w-auto">
                Build Resume
              </Button>
            </Link>
            <Link href="/analyzer">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Analyze Resume
              </Button>
            </Link>
            <Link href="/tracker">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Track Jobs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything you need to land your dream job</h2>
            <p className="text-xl text-muted-foreground">Comprehensive tools to optimize your job search process</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of job seekers who have improved their resumes with AI
          </p>
          <Link href="/auth/signup">
            <Button size="lg">Get Started Free</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 ResumeAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
