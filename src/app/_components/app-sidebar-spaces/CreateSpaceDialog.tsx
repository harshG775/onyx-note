"use client";

import { Plus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// ---------- Create Space Dialog ----------
export function CreateSpaceDialog() {
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
