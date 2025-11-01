import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../_components/app-sidebar";

export default function SpacesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 relative">
                <SidebarTrigger className="sticky top-0 left-0" />
                {children}
            </main>
        </SidebarProvider>
    );
}
