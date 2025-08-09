"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart, Loader2 } from "lucide-react"
import Link from "next/link"

export default function AuthPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [isSignUp, setIsSignUp] = useState(true)

  const handleAuth = async () => {
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-3 mb-8 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-foreground rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 text-background" />
            </div>
            <span className="text-xl font-semibold text-foreground">pomoshch</span>
          </Link>

          <h1 className="text-2xl font-bold text-foreground mb-2">
            {isSignUp ? "Start helping today" : "Welcome back"}
          </h1>
          <p className="text-muted-foreground">
            {isSignUp
              ? "Create your account to get personalized help suggestions"
              : "Sign in to continue helping your community"}
          </p>
        </div>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-8">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 border-border"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </Label>
                <Input id="password" type="password" placeholder="••••••••" className="mt-1 border-border" />
              </div>

              <Button
                className="w-full bg-foreground hover:bg-foreground/90 mt-6"
                onClick={handleAuth}
                disabled={isLoading || !email}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {isSignUp ? "Creating account..." : "Signing in..."}
                  </>
                ) : isSignUp ? (
                  "Create account"
                ) : (
                  "Sign in"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
          </button>
        </div>

        <div className="text-center mt-8">
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
