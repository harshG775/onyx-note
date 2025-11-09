"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import { Space } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

export function EditSpaceDialog({
    open,
    setOpen,
    space,
}: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    space: Space;
}) {
    const [title, setTitle] = useState(space.title);

    const queryClient = useQueryClient();

    // Edit
    const editSpace = useMutation({
        mutationFn: async ({ id, payload }: { id: string; payload: { title: string } }) => {
            const res = await fetch(`/api/spaces/${id}`, { method: "PATCH", body: JSON.stringify(payload) });
            if (!res.ok) throw new Error("Failed to update space");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["spaces"] });
            setOpen(false);
        },
    });
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create new space</DialogTitle>
                </DialogHeader>
                <form
                    className="space-y-3 mt-2"
                    onSubmit={(e) => {
                        e.preventDefault();
                        editSpace.mutate({ id: space.id, payload: { title: title } });
                    }}
                >
                    <Input placeholder="Enter space title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <Button className="w-full" disabled={!title || editSpace.isPending}>
                        {editSpace.isPending ? (
                            <>
                                <Loader className="animate-spin" />
                                <span>Updating...</span>
                            </>
                        ) : (
                            "Update Space"
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
