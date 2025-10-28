import { Button } from "@/components/ui/button";
import { EllipsisVertical, Folder } from "lucide-react";
import Link from "next/link";

const getSpaces = async () => {
    return [
        {
            title: "My Workspace",
            id: "469f18d0-a58c-4145-9faa-6e25904004d5",
        },
        {
            title: "Office Workspace",
            id: "469f18d0-a58c-4145-9faa-04004d56e259",
        },
        {
            title: "Personal Notes",
            id: "469f18d0-a58c-4145-9faa-123456789abc",
        },
    ];
};

export default async function SpacesPage() {
    const spaces = await getSpaces();

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-2">Spaces</h1>
            <p className="text-sm text-muted-foreground mb-6">Showing {spaces.length} spaces</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {spaces.map((space) => (
                    <div
                        key={space.id}
                        className="group relative bg-card border rounded-xl p-5 flex flex-col justify-between hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <Folder className="w-8 h-8 text-primary/80 group-hover:text-primary transition-colors" />
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-sm w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <EllipsisVertical className="w-5 h-5 text-muted-foreground" />
                            </Button>
                        </div>

                        <Link href={`/spaces/${space.id}`} className="block mt-auto">
                            <h2 className="font-semibold text-lg group-hover:underline leading-tight">{space.title}</h2>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
