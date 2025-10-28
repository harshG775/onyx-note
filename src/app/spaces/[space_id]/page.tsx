import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";

const getNotesBySpaceId = async (spaceId: string) => {
    return {
        id: spaceId,
        title: "My Workspace",
        notes: [
            {
                id: "a8cs4sdf-b2c3-432a-a398-5759e7cd3526",
                title: "Meeting Notes",
            },
            {
                id: "469f18d0-a58c-4145-9faa-6e25904004d5",
                title: "Shopping List",
            },
            {
                id: "c4eaf6b1-59e0-4f2d-9d12-b06b5d7a4b19",
                title: "Ideas for Blog",
            },
            {
                id: "e9d3f19c-7bc2-49a2-9b77-60af3c2fda4e",
                title: "Books to Read",
            },
            {
                id: "f7b1e52c-91a2-45f9-8d9c-342e8e0de44c",
                title: "Travel Plan",
            },
        ],
    };
};

type SpacePageProps = {
    params: Promise<{ space_id: string }>;
};
export default async function SpacePage({ params }: SpacePageProps) {
    const { space_id } = await params;
    const space = await getNotesBySpaceId(space_id);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-2">Space: {space.title || space.id}</h1>
            <p className="text-sm text-muted-foreground mb-6">Showing {space.notes.length} notes</p>

            <ul className="space-y-2">
                {space.notes.map((note) => (
                    <li key={note.id} className="bg-card hover:shadow-sm relative pl-10">
                        <div className="absolute left-2 top-2">
                            <Button variant="ghost" size="icon-sm" className="rounded-sm w-6 cursor-pointer">
                                <EllipsisVertical className="w-5 h-5" />
                            </Button>
                        </div>
                        <Link
                            href={`/spaces/${space.id}/${note.id}`}
                            className="flex items-center justify-between h-12"
                        >
                            <h2 className="font-semibold text-lg leading-tight">{note.title}</h2>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
