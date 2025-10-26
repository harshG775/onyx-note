import { Folder, Plus } from "lucide-react";

import {
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

const spaces = [
    {
        title: "my notes",
        url: "/469f18d0-a58c-4145-9faa-6e25904004d5",
    },
];
export function AppSidebarSpaces() {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Spaces</SidebarGroupLabel>
            <SidebarGroupAction title="Add Space">
                <Plus /> <span className="sr-only">Add Space</span>
            </SidebarGroupAction>
            <SidebarGroupContent>
                <SidebarMenu>
                    {spaces.map((item) => {
                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <a href={item.url}>
                                        <Folder />
                                        <span>{item.title}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
