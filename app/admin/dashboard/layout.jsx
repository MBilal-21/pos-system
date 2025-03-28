import AppSidebar from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
// import { AppSidebar } from "@/components/app-sidebar"

// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
// import { AppSidebar } from "@/components/app-sidebar"




export default function Layout({ children }) {
    return (



        <SidebarProvider>

            <AppSidebar />

            <div>
                <SidebarTrigger />
                {children}
            </div>

        </SidebarProvider>


    )
}