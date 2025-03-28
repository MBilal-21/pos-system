import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Unauthorized() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
      <p className="text-lg mb-6">You don't have permission to access this page.</p>
      <Button asChild>
        <Link href="/">Return to Login</Link>
      </Button>
    </div>
  )
}