"use client";

import { Folder, FolderOpen, Plus, Trash2 } from "lucide-react";
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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// ---------- Create Space Dialog ----------
function CreateSpaceDialog() {
    const [title, setTitle] = useState("");
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();

    const createSpace = useMutation({
        mutationFn: async () => {
            const res = await fetch("/api/spaces", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title }),
            });
            if (!res.ok) throw new Error("Failed to create space");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["spaces"] });
            setTitle("");
            setOpen(false);
        },
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Plus />
                    <span className="sr-only">Add Space</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create new space</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 mt-2">
                    <Input placeholder="Enter space title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <Button
                        className="w-full"
                        disabled={!title || createSpace.isPending}
                        onClick={() => createSpace.mutate()}
                    >
                        {createSpace.isPending ? "Creating..." : "Create Space"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function DeleteSpaceButton({ id }: { id: string }) {
    const queryClient = useQueryClient();
    const deleteSpace = useMutation({
        mutationFn: async () => {
            const res = await fetch(`/api/spaces/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete space");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["spaces"] });
        },
    });

    return (
        <button
            onClick={() => deleteSpace.mutate()}
            disabled={deleteSpace.isPending}
            className="text-muted-foreground hover:text-destructive transition"
            title="Delete space"
        >
            <Trash2 size={16} />
        </button>
    );
}

// ---------- Main Sidebar ----------
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
                        {spaces.map((item: any) => {
                            const isActive = pathname.includes(`/spaces/${item.id}`);
                            return (
                                <SidebarMenuItem key={item.id} className="flex">
                                    <SidebarMenuButton asChild isActive={isActive}>
                                        <Link href={`/spaces/${item.id}`}>
                                            {isActive ? <FolderOpen /> : <Folder />}
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                    <DeleteSpaceButton id={item.id} />
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                )}
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
