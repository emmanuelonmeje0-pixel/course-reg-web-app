import { SidebarProvider, SidebarTrigger } from "../sidebar"
import { AppSidebar } from "../appSidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}