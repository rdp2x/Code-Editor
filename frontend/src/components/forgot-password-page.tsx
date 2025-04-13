"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ForgotPasswordPageProps {
  onResetPassword: (email: string) => Promise<boolean>
  onBackToLogin: () => void
  isDarkMode: boolean
}

export default function ForgotPasswordPage({ onResetPassword, onBackToLogin, isDarkMode }: ForgotPasswordPageProps) {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    setIsLoading(true)

    try {
      const success = await onResetPassword(email)
      if (success) {
        setMessage("If an account exists for this email, a password reset link has been sent.")
      } else {
        setMessage("Email not registered. Please check your email address.")
      }
    } catch (err) {
      setMessage("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-background ${isDarkMode ? "text-white" : "text-black"}`}
    >
      <div className={`w-full max-w-md p-8 space-y-8 ${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-lg`}>
        <h2 className="text-3xl font-bold text-center text-foreground">Forgot Password</h2>
        {message && (
          <Alert variant={message.includes("not registered") ? "destructive" : "default"}>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email" className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
              Email
            </Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Sending..." : "Reset Password"}
          </Button>
        </form>
        <div className="text-center">
          <Button variant="link" onClick={onBackToLogin} className="p-0">
            Back to Login
          </Button>
        </div>
      </div>
    </div>
  )
}

