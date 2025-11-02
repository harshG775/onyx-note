"use client";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Folder, FolderOpen, Trash2 } from "lucide-react";
import Link from "next/link";

export function SpaceMenuItem({ item, isActive }: { item: { id: string; title: string }; isActive: boolean }) {
    const queryClient = useQueryClient();

    const deleteSpace = useMutation({
        mutationFn: async () => {
            const res = await fetch(`/api/spaces/${item.id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete space");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["spaces"] });
        },
    });

    const isDeleting = deleteSpace.isPending;

    return (
        <SidebarMenuItem
            className={`flex items-center justify-between ${isDeleting ? "opacity-50 pointer-events-none" : ""}`}
        >
            <SidebarMenuButton asChild isActive={isActive}>
                <Link href={`/spaces/${item.id}`}>
                    {isActive ? <FolderOpen /> : <Folder />}
                    <span>{item.title}</span>
                </Link>
            </SidebarMenuButton>

            <button
                onClick={() => deleteSpace.mutate()}
                disabled={isDeleting}
                className="text-muted-foreground hover:text-destructive transition"
                title="Delete space"
            >
                {isDeleting ? (
                    <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                    <Trash2 size={16} />
                )}
            </button>
        </SidebarMenuItem>
    );
}
