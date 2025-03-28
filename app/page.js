import LoginForm from "@/components/login-form"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
    

        <LoginForm />

    </main>
  )
}