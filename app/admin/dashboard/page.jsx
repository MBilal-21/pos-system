// components/app-sidebar.jsx
'use client'
import { SidebarInset } from "@/components/ui/sidebar"

export default function Home() {
  return (
    <SidebarInset>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Welcome to your dashboard</h1>
        <p className="mt-2">This is your main content area.</p>
      </div>
    </SidebarInset>
  )
}
// import { getServerSession } from "next-auth/next"
// import { redirect } from "next/navigation"
// import { authOptions } from "@/app/api/auth/[...nextauth]/route"

// export default async function AdminDashboard() {
//   const session = await getServerSession(authOptions)

//   if (!session || session.user.role !== "admin") {
//     redirect("/")
//   }

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
//       <div className="bg-white p-6 rounded-lg shadow">
//         <p className="text-xl">Welcome, {session.user.name || session.user.username}</p>
//         <p className="text-gray-600">You are logged in as an Admin</p>
//       </div>
//     </div>
//   )
// }

// export function AdminSidebar() {
//     const session = await getServerSession(authOptions)

//     if (!session || session.user.role !== "admin") {
//         redirect("/")
//     }
//     return (
//         <Sidebar>
//             <SidebarHeader>
//                 <div className="p-2">
//                     <h2 className="text-xl font-bold">POS Admin</h2>
//                 </div>
//             </SidebarHeader>

//             <SidebarContent>
//                 <SidebarMenu>
//                     <SidebarMenuItem>
//                         <SidebarMenuButton asChild>
//                             <a href="/dashboard">
//                                 <Home />
//                                 <span>Dashboard</span>
//                             </a>
//                         </SidebarMenuButton>
//                     </SidebarMenuItem>

//                     <SidebarMenuItem>
//                         <SidebarMenuButton>
//                             <Package />
//                             <span>Inventory</span>
//                         </SidebarMenuButton>
//                         <SidebarMenuSub>
//                             <SidebarMenuSubItem>
//                                 <SidebarMenuSubButton asChild>
//                                     <a href="/inventory">View All Products</a>
//                                 </SidebarMenuSubButton>
//                             </SidebarMenuSubItem>
//                             <SidebarMenuSubItem>
//                                 <SidebarMenuSubButton asChild>
//                                     <a href="/inventory/add">Add New Product</a>
//                                 </SidebarMenuSubButton>
//                             </SidebarMenuSubItem>
//                             <SidebarMenuSubItem>
//                                 <SidebarMenuSubButton asChild>
//                                     <a href="/inventory/categories">Categories</a>
//                                 </SidebarMenuSubButton>
//                             </SidebarMenuSubItem>
//                             <SidebarMenuSubItem>
//                                 <SidebarMenuSubButton asChild>
//                                     <a href="/inventory/stock">Stock Management</a>
//                                 </SidebarMenuSubButton>
//                             </SidebarMenuSubItem>
//                             <SidebarMenuSubItem>
//                                 <SidebarMenuSubButton asChild>
//                                     <a href="/inventory/scanner">Barcode Scanner</a>
//                                 </SidebarMenuSubButton>
//                             </SidebarMenuSubItem>
//                         </SidebarMenuSub>
//                     </SidebarMenuItem>

//                     <SidebarMenuItem>
//                         <SidebarMenuButton>
//                             <ShoppingCart />
//                             <span>Sales</span>
//                         </SidebarMenuButton>
//                         <SidebarMenuSub>
//                             <SidebarMenuSubItem>
//                                 <SidebarMenuSubButton asChild>
//                                     <a href="/sales/new">New Sale</a>
//                                 </SidebarMenuSubButton>
//                             </SidebarMenuSubItem>
//                             <SidebarMenuSubItem>
//                                 <SidebarMenuSubButton asChild>
//                                     <a href="/sales/transactions">View Transactions</a>
//                                 </SidebarMenuSubButton>
//                             </SidebarMenuSubItem>
//                             <SidebarMenuSubItem>
//                                 <SidebarMenuSubButton asChild>
//                                     <a href="/sales/pending">Pending Orders</a>
//                                 </SidebarMenuSubButton>
//                             </SidebarMenuSubItem>
//                         </SidebarMenuSub>
//                     </SidebarMenuItem>

//                     <SidebarMenuItem>
//                         <SidebarMenuButton>
//                             <BarChart />
//                             <span>Reports</span>
//                         </SidebarMenuButton>
//                         <SidebarMenuSub>
//                             <SidebarMenuSubItem>
//                                 <SidebarMenuSubButton asChild>
//                                     <a href="/reports/sales">Sales Reports</a>
//                                 </SidebarMenuSubButton>
//                             </SidebarMenuSubItem>
//                             <SidebarMenuSubItem>
//                                 <SidebarMenuSubButton asChild>
//                                     <a href="/reports/inventory">Inventory Reports</a>
//                                 </SidebarMenuSubButton>
//                             </SidebarMenuSubItem>
//                             <SidebarMenuSubItem>
//                                 <SidebarMenuSubButton asChild>
//                                     <a href="/reports/low-stock">Low Stock Alerts</a>
//                                 </SidebarMenuSubButton>
//                             </SidebarMenuSubItem>
//                         </SidebarMenuSub>
//                     </SidebarMenuItem>

//                     <SidebarMenuItem>
//                         <SidebarMenuButton>
//                             <Users />
//                             <span>Users</span>
//                         </SidebarMenuButton>
//                         <SidebarMenuSub>
//                             <SidebarMenuSubItem>
//                                 <SidebarMenuSubButton asChild>
//                                     <a href="/users">View All Users</a>
//                                 </SidebarMenuSubButton>
//                             </SidebarMenuSubItem>
//                             <SidebarMenuSubItem>
//                                 <SidebarMenuSubButton asChild>
//                                     <a href="/users/add">Add New User</a>
//                                 </SidebarMenuSubButton>
//                             </SidebarMenuSubItem>
//                             <SidebarMenuSubItem>
//                                 <SidebarMenuSubButton asChild>
//                                     <a href="/users/roles">Roles & Permissions</a>
//                                 </SidebarMenuSubButton>
//                             </SidebarMenuSubItem>
//                         </SidebarMenuSub>
//                     </SidebarMenuItem>

//                     <SidebarMenuItem>
//                         <SidebarMenuButton>
//                             <Settings />
//                             <span>Settings</span>
//                         </SidebarMenuButton>
//                         <SidebarMenuSub>
//                             <SidebarMenuSubItem>
//                                 <SidebarMenuSubButton asChild>
//                                     <a href="/settings/store">Store Information</a>
//                                 </SidebarMenuSubButton>
//                             </SidebarMenuSubItem>
//                             <SidebarMenuSubItem>
//                                 <SidebarMenuSubButton asChild>
//                                     <a href="/settings/payment">Payment Methods</a>
//                                 </SidebarMenuSubButton>
//                             </SidebarMenuSubItem>
//                             <SidebarMenuSubItem>
//                                 <SidebarMenuSubButton asChild>
//                                     <a href="/settings/tax">Tax Settings</a>
//                                 </SidebarMenuSubButton>
//                             </SidebarMenuSubItem>
//                         </SidebarMenuSub>
//                     </SidebarMenuItem>
//                 </SidebarMenu>
//             </SidebarContent>

//             <SidebarFooter>
//                 <SidebarMenu>
//                     <SidebarMenuItem>
//                         <SidebarMenuButton asChild>
//                             <button onClick={() => signOut()}>
//                                 <LogOut />
//                                 <span>Logout</span>
//                             </button>
//                         </SidebarMenuButton>
//                     </SidebarMenuItem>
//                 </SidebarMenu>
//             </SidebarFooter>
//         </Sidebar>
//     );
// }