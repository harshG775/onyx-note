"use client";

import {
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery} from "@tanstack/react-query";
import { SpaceMenuItem } from "./SpaceMenuItem";
import { CreateSpaceDialog } from "./CreateSpaceDialog";


export function AppSidebarSpaces() {
    const pathname = usePathname();

    const { data, isLoading } = useQuery({
        queryKey: ["spaces"],
        queryFn: async () => {
            const res = await fetch("/api/spaces");
            if (!res.ok) throw new Error("Failed to fetch spaces");
            const data = await res.json();
            return data.data;
        },
    });

    const spaces = data || [];

    return (
        <SidebarGroup>
            <div className="flex items-center justify-between">
                <SidebarGroupLabel>
                    <Link href={`/spaces`}>Spaces</Link>
                </SidebarGroupLabel>
                <SidebarGroupAction title="Add Space" className="cursor-pointer" asChild>
                    <CreateSpaceDialog />
                </SidebarGroupAction>
            </div>

            <SidebarGroupContent>
                {isLoading ? (
                    <p className="text-sm text-muted-foreground p-2">Loading...</p>
                ) : (
                    <SidebarMenu>
                        {spaces.map((item: any) => (
                            <SpaceMenuItem
                                key={item.id}
                                isActive={pathname.includes(`/spaces/${item.id}`)}
                                item={item}
                            />
                        ))}
                    </SidebarMenu>
                )}
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
