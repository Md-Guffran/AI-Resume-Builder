"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function GoogleCallbackPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the authorization code from URL parameters
        const urlParams = new URLSearchParams(window.location.search)
        const code = urlParams.get("code")
        const error = urlParams.get("error")

        if (error) {
          throw new Error(`Google OAuth error: ${error}`)
        }

        if (!code) {
          throw new Error("No authorization code received")
        }

        // In a real implementation, you would:
        // 1. Send the code to your backend
        // 2. Exchange it for an access token
        // 3. Get user info from Google
        // 4. Create or update user in your database
        // 5. Create a session

        // Simulate the process
        setMessage("Exchanging authorization code...")
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setMessage("Fetching user information from Google...")
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setMessage("Creating your account...")
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setStatus("success")
        setMessage("Successfully authenticated with Google!")

        // Redirect to dashboard after success
        setTimeout(() => {
          window.location.href = "/dashboard"
        }, 2000)
      } catch (error) {
        console.error("Google OAuth callback error:", error)
        setStatus("error")
        setMessage(error instanceof Error ? error.message : "Authentication failed")
      }
    }

    handleCallback()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Google Authentication</CardTitle>
            <CardDescription>Processing your Google sign-in...</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {status === "loading" && (
              <div className="text-center space-y-4">
                <Loader2 className="h-8 w-8 animate-spin mx-auto" />
                <p className="text-sm text-muted-foreground">{message}</p>
              </div>
            )}

            {status === "success" && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}

            {status === "error" && (
              <div className="space-y-4">
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
                <div className="flex space-x-2">
                  <Button asChild className="flex-1">
                    <Link href="/auth/login">Try Again</Link>
                  </Button>
                  <Button variant="outline" asChild className="flex-1">
                    <Link href="/">Go Home</Link>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
