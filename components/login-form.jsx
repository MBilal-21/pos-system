"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { UserIcon, LockIcon } from 'lucide-react'

export default function LoginForm() {
//   const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("cashier")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", {
        // username,
        email,
        password,
        role,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid credentials")
        setIsLoading(false)
        return
      }

      // Redirect based on role
      if (role === "admin") {
        router.push("/admin/dashboard")
      } else {
        router.push("/cashier/dashboard")
      }
    } catch (error) {
      setError("Something went wrong. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold">Sign in to MinimalPOS</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                <UserIcon className="h-5 w-5" />
              </div>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {/* <Input
                id="username"
                type="text"
                placeholder="Username"
                className="pl-10"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              /> */}
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                <LockIcon className="h-5 w-5" />
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                className="pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Label className="mr-2">Login as:</Label>
            <div className="flex space-x-2 mt-1">
              <Button
                type="button"
                variant={role === "cashier" ? "default" : "outline"}
                onClick={() => setRole("cashier")}
                className="flex-1"
              >
                Cashier
              </Button>
              <Button
                type="button"
                variant={role === "admin" ? "default" : "outline"}
                onClick={() => setRole("admin")}
                className="flex-1"
              >
                Admin
              </Button>
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>

          <div className="text-center text-sm text-gray-500">
            <p>Demo credentials:</p>
            <p>Username: admin or cashier</p>
            <p>Password: password</p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}