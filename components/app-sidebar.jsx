
'use client'

import { Home, Settings, Search, Calendar, Inbox } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from "@/components/ui/sidebar"
import Link from 'next/link'
// import { SidebarTrigger } from "@/components/ui/sidebar"
// Menu items
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Products",
    url: "/admin/dashboard/products",
    icon: Inbox,
  },
  {
    title: "Customers",
    url: "/admin/dashboard/customers",
    icon: Calendar,
  },
  {
    title: "pos",
    url: "/admin/dashboard/pos",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "/admin/dashboard/#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/admin/dashboard/",
    icon: Settings,
  },
]

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}