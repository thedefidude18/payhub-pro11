"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/lib/auth/simple-auth"
import { Briefcase, TrendingUp, Sparkles } from "lucide-react"

type AuthMode = "login" | "signup"

export function SimpleLoginForm() {
  const [mode, setMode] = useState<AuthMode>("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [accountType, setAccountType] = useState<"entrepreneur" | "trader" | "creator">("entrepreneur")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const { signIn, signUp, loading } = useAuth()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const { error } = await signIn(email, password)

    if (error) {
      setError(error)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!fullName.trim()) {
      setError("Full name is required")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    const { error } = await signUp(email, password, fullName, accountType)

    if (error) {
      setError(error)
    }
  }

  // Demo accounts for testing
  const demoAccounts = [
    { email: "admin@payvidi.com", password: "admin123", role: "Admin" },
    { email: "john@designer.com", password: "freelancer123", role: "Freelancer" },
    { email: "sarah@creative.com", password: "super123", role: "SuperFreelancer" },
    { email: "entrepreneur@payvidi.com", password: "entrepreneur123", role: "Entrepreneur" },
    { email: "trader@payvidi.com", password: "trader123", role: "Trader" },
    { email: "creator@payvidi.com", password: "creator123", role: "Creator" },
  ]

  const handleDemoLogin = async (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail)
    setPassword(demoPassword)
    setError("")

    const { error } = await signIn(demoEmail, demoPassword)

    if (error) {
      setError(error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">PV</span>
          </div>
          <CardTitle className="text-2xl">Welcome to PayVidi</CardTitle>
          <CardDescription>
            {mode === "login" ? "Sign in to your account to continue" : "Create your account to get started"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={mode === "login" ? handleSignIn : handleSignUp} className="space-y-4">
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="accountType">Account Type</Label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { type: "entrepreneur" as const, label: "Entrepreneur", icon: Briefcase },
                    { type: "trader" as const, label: "Trader", icon: TrendingUp },
                    { type: "creator" as const, label: "Creator", icon: Sparkles },
                  ].map(({ type, label, icon: Icon }) => (
                    <Button
                      key={type}
                      type="button"
                      variant={accountType === type ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAccountType(type)}
                      className="flex flex-col items-center gap-1 h-auto py-2"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-xs">{label}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {mode === "login" ? "Sign In" : "Create Account"}
            </Button>
          </form>

          {mode === "login" && (
            <>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Demo Accounts</span>
                </div>
              </div>

              <div className="grid gap-2">
                {demoAccounts.map((account, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleDemoLogin(account.email, account.password)}
                    disabled={loading}
                    className="text-xs"
                  >
                    {loading && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
                    Demo {account.role}
                  </Button>
                ))}
              </div>

              <div className="text-center text-xs text-muted-foreground">
                <p>Don't have an account?{" "}
                  <button
                    onClick={() => {
                      setMode("signup")
                      setError("")
                    }}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Sign up here
                  </button>
                </p>
              </div>
            </>
          )}

          {mode === "signup" && (
            <div className="text-center text-xs text-muted-foreground">
              <p>Already have an account?{" "}
                <button
                  onClick={() => {
                    setMode("login")
                    setError("")
                    setFullName("")
                    setConfirmPassword("")
                  }}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Sign in here
                </button>
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
