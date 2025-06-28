import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

/**
 * Settings route layout.
 * Wraps the page in `SidebarProvider` so components like `SidebarTrigger`
 * have access to the sidebar context, and renders the application sidebar.
 */
export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1">{children}</main>
    </SidebarProvider>
  )
}
