"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader, Plus } from "lucide-react";
import { useState } from "react";

export function CreateSpaceDialog() {
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
                <Button variant="outline" size="sm">
                    <Plus />
                    <span className="sr-only sm:not-sr-only">Add Space</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create new space</DialogTitle>
                </DialogHeader>
                <form
                    className="space-y-3 mt-2"
                    onSubmit={(e) => {
                        e.preventDefault();
                        createSpace.mutate();
                    }}
                >
                    <Input placeholder="Enter space title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <Button className="w-full" disabled={!title || createSpace.isPending}>
                        {createSpace.isPending ? (
                            <>
                                <Loader className="animate-spin" />
                                <span>Creating...</span>
                            </>
                        ) : (
                            "Create Space"
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
