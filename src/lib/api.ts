import { Space } from "@/types";

export const createSpace = async ({ title }: { title: string }) => {
    const res = await fetch("/api/spaces", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
    });
    if (!res.ok) throw new Error("Failed to create space");
    return res.json();
};

export const getSpaces = async (): Promise<Space[]> => {
    const res = await fetch("/api/spaces");
    if (!res.ok) throw new Error("Failed to fetch spaces");
    const data = await res.json();
    return data?.data;
};
