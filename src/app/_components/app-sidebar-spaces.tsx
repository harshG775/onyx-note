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
import Link from "next/link";

const getSpaces = () => {
    return [
        {
            title: "My Workspace",
            id: "469f18d0-a58c-4145-9faa-6e25904004d5",
        },
    ];
};
export function AppSidebarSpaces() {
    const spaces = getSpaces();
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
                                    <Link href={`/spaces/${item.id}`}>
                                        <Folder />
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
