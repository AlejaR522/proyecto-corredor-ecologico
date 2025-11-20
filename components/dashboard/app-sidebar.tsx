// "use client"

// import * as React from "react"
// import { 
//   Briefcase, 
//   Users, 
//   FileText, 
//   BarChart3 
// } from "lucide-react"

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarGroup,
//   SidebarGroupLabel,
//   SidebarGroupContent,
// } from "@/components/ui/sidebar"
// import { Logo } from "../common/logo"
// import Link from "next/link"

// const data = {
//   navMain: [
//     {
//       title: "Gestionar empleos",
//       url: "/empleos",
//       icon: Briefcase,
//     },
//     {
//       title: "Usuarios",
//       url: "/usuarios",
//       icon: Users,
//     },
//     {
//       title: "Postulaciones",
//       url: "/postulaciones",
//       icon: FileText,
//     },
//     {
//       title: "Reportes",
//       url: "/reportes",
//       icon: BarChart3,
//     },
//   ],
// }

// function NavMain({ items }: { items: typeof data.navMain }) {
//   return (
//     <SidebarGroup>
//       <SidebarGroupContent>
//         <SidebarMenu>
//           {items.map((item) => (
//             <SidebarMenuItem key={item.title}>
//               <SidebarMenuButton asChild className="hover:bg-[#f9fdf94f] h-12">
//                 <Link href={item.url} className="flex items-center gap-3 px-3 py-2 text-white text-[18px]">
//                   <item.icon className="size-6" />
//                   <span>{item.title}</span>
//                 </Link>
//               </SidebarMenuButton>
//             </SidebarMenuItem>
//           ))}
//         </SidebarMenu>
//       </SidebarGroupContent>
//     </SidebarGroup>
//   )
// }

// export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
//   return (
//     <Sidebar collapsible="offcanvas" {...props}>
//       <SidebarHeader>
//         <SidebarMenu>
//           <SidebarMenuItem className="flex items-center gap-1 bg-white rounded-lg">
//             <SidebarMenuButton
//               asChild
//               className="data-[slot=sidebar-menu-button]:p-1.5!"
//             >
//               <Logo className="size-10" />
//             </SidebarMenuButton>
//             Corredor ecológico
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarHeader>
//       <SidebarContent className="pt-16">
//         <NavMain items={data.navMain} />
//       </SidebarContent>
//       <SidebarFooter>
//         {/* <NavUser user={data.user} /> */}
//       </SidebarFooter>
//     </Sidebar>
//   )
// }

"use client"

import * as React from "react"
import { 
  Briefcase, 
  Users, 
  FileText, 
  BarChart3 
} from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { Logo } from "../common/logo"

const data = {
  navMain: [
    {
      title: "Gestionar empleos",
      url: "/dashboard/jobs",
      icon: Briefcase,
    },
    // {
    //   title: "Usuarios",
    //   url: "/usuarios",
    //   icon: Users,
    // },
    {
      title: "Postulaciones",
      url: "/dashboard/candidates",
      icon: FileText,
    },
    // {
    //   title: "Reportes",
    //   url: "/reportes",
    //   icon: BarChart3,
    // },
  ],
}

function NavMain({ items }: { items: typeof data.navMain }) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname === item.url || pathname.startsWith(item.url + "/")
            
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  asChild 
                  className={`hover:bg-[#f9fdf94f] h-12 ${
                    isActive ? "bg-[#8FBC8F] hover:bg-[#8FBC8F]" : ""
                  }`}
                >
                  <Link href={item.url} className="flex items-center gap-3 px-3 py-2 text-white text-[18px]">
                    <item.icon className="size-6" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-1 bg-white rounded-lg">
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Logo className="size-10" />
            </SidebarMenuButton>
            Corredor ecológico
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="pt-20">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
    </Sidebar>
  )
}