"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { getSpaces } from "@/lib/api";
import { Space } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EllipsisVertical, Folder, Plus } from "lucide-react";
import Link from "next/link";
import { ReactNode, useState } from "react";

const SpaceSkeleton = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-card border rounded-xl p-5 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-3">
                        <Skeleton className="w-8 h-8 rounded-md" />
                        <Skeleton className="w-8 h-8 rounded-sm" />
                    </div>
                    <Skeleton className="h-5 w-3/4" />
                </div>
            ))}
        </div>
    );
};
const SpacesSection = ({ spaces }: { spaces: Space[] }) => {
    const queryClient = useQueryClient();
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const deleteSpace = useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch(`/api/spaces/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete space");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["spaces"] });
        },
        onSettled: () => setDeletingId(null),
    });

    const handleDelete = (id: string) => {
        setDeletingId(id);
        deleteSpace.mutate(id);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {spaces?.map((space) => {
                const isDeleting = deletingId === space.id;

                return (
                    <div
                        key={space.id}
                        className={`group relative bg-card border rounded-xl p-5 flex flex-col justify-between hover:shadow-md transition-shadow ${
                            isDeleting ? "opacity-50 pointer-events-none" : ""
                        }`}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <Folder className="w-8 h-8 text-primary/80 group-hover:text-primary transition-colors" />

                            <DropdownMenu>
                                <DropdownMenuTrigger className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <EllipsisVertical className="w-5 h-5 text-muted-foreground" />
                                    <span className="sr-only">Options</span>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent side="right" align="start">
                                    <DropdownMenuItem onClick={() => alert("Edit feature coming soon")}>
                                        <span>Edit Space</span>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem
                                        className="text-destructive focus:text-destructive"
                                        onClick={() => handleDelete(space.id)}
                                    >
                                        {isDeleting ? (
                                            <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                                        ) : null}
                                        <span>{isDeleting ? "Deleting..." : "Delete Space"}</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <Link href={`/spaces/${space.id}`} className="block mt-auto">
                            <h2 className="font-semibold text-lg group-hover:underline leading-tight">{space.title}</h2>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};

const CreateSpaceDialog = ({ children }: { children: ReactNode }) => {
    const [title, setTitle] = useState("my space");
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
                {children ? (
                    children
                ) : (
                    <Button variant="ghost" size="icon">
                        <Plus />
                        <span className="sr-only">Add Space</span>
                    </Button>
                )}
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
};
export default function SpacesPage() {
    const { isLoading, isError, data } = useQuery({
        queryKey: ["spaces"],
        queryFn: () => getSpaces(),
    });
    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold mb-2">Spaces</h1>
                <div>
                    <CreateSpaceDialog>
                        <Button variant="outline" size="sm">
                            <Plus />
                            <span className="sr-only sm:not-sr-only">Add Space</span>
                        </Button>
                    </CreateSpaceDialog>
                </div>
            </div>
            {isLoading && (
                <>
                    <p className="text-sm text-muted-foreground mb-6">Loading spaces...</p>
                    <SpaceSkeleton />
                </>
            )}
            {isError && (
                <>
                    <p className="text-sm text-destructive mb-6">Failed to load spaces.</p>
                </>
            )}
            {(!isLoading || !isError) && (
                <>
                    <p className="text-sm text-muted-foreground mb-6">Showing {(data || [])?.length} spaces</p>
                    <SpacesSection spaces={data || []} />
                </>
            )}
        </div>
    );
}
