"use client";
import { Folder, FolderOpen, Plus } from "lucide-react";

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
import { usePathname } from "next/navigation";

const getSpaces = () => {
    return [
        {
            title: "My Workspace",
            id: "469f18d0-a58c-4145-9faa-6e25904004d5",
        },
        {
            title: "Office Workspace",
            id: "469f18d0-a58c-4145-9faa-04004d56e259",
        },
    ];
};
export function AppSidebarSpaces() {
    const spaces = getSpaces();
    const pathname = usePathname();
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Spaces</SidebarGroupLabel>
            <SidebarGroupAction title="Add Space">
                <Plus /> <span className="sr-only">Add Space</span>
            </SidebarGroupAction>
            <SidebarGroupContent>
                <SidebarMenu>
                    {spaces.map((item) => {
                        const isActive = pathname.includes(`/spaces/${item.id}`);
                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild isActive={isActive}>
                                    <Link href={`/spaces/${item.id}`}>
                                        {isActive ? <FolderOpen /> : <Folder />}
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
