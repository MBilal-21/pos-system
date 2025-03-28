import "./globals.css"
import { Inter } from "next/font/google"
import AuthProvider from "@/components/auth-provider"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "MinimalPOS",
  description: "A minimal POS system",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-50`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light">
          <AuthProvider>
            <main className="flex min-h-screen items-center justify-center p-4">
              {children}
            </main>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
