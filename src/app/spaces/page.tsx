"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { getSpaces } from "@/lib/api";
import { Space } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EllipsisVertical, Folder, Loader2 } from "lucide-react";
import Link from "next/link";
import { CreateSpaceDialog } from "./_components/CreateDialog";
import { EditSpaceDialog } from "./_components/EditDialog";
import { useState } from "react";

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

const SpaceItem = ({
    space,
    handleDelete,
    isDeleting,
}: {
    space: Space;
    handleDelete: (id: string) => void;
    isDeleting: boolean;
}) => {
    const [isEditing, setIsEditing] = useState(false);

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
                    <DropdownMenuTrigger>
                        <EllipsisVertical className="w-5 h-5 text-muted-foreground" />
                        <span className="sr-only">Options</span>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent side="right" align="start">
                        <DropdownMenuItem
                            onSelect={(e) => {
                                e.preventDefault();
                                setIsEditing(true);
                            }}
                        >
                            <span>Edit</span>
                        </DropdownMenuItem>

                        <EditSpaceDialog open={isEditing} setOpen={setIsEditing} space={space} />
                        <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onSelect={(e) => {
                                e.preventDefault();
                                handleDelete(space.id);
                            }}
                        >
                            {isDeleting ? <Loader2 className="animate-spin text-destructive" /> : null}
                            <span>{isDeleting ? "Deleting..." : "Delete"}</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <Link href={`/spaces/${space.id}`} className="block mt-auto">
                <h2 className="font-semibold text-lg group-hover:underline leading-tight">{space.title}</h2>
            </Link>
        </div>
    );
};
const SpacesSection = ({ spaces }: { spaces: Space[] }) => {
    const queryClient = useQueryClient();

    const deleteSpace = useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch(`/api/spaces/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete space");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["spaces"] });
        },
        onSettled: () => {},
    });

    const handleDelete = (id: string) => {
        deleteSpace.mutate(id);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {spaces?.map((space) => (
                <SpaceItem
                    key={space.id}
                    space={space}
                    handleDelete={handleDelete}
                    isDeleting={deleteSpace.isPending}
                />
            ))}
        </div>
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
                    <CreateSpaceDialog />
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
