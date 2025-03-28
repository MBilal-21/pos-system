import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export default async function CashierDashboard() {
  const session = await getServerSession(authOptions)
  
  if (!session || (session.user.role !== "cashier" && session.user.role !== "admin")) {
    redirect("/")
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Cashier Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-xl">Welcome, {session.user.name || session.user.username}</p>
        <p className="text-gray-600">You are logged in as a Cashier</p>
      </div>
    </div>
  )
}