import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";

type SpacePageProps = {
    params: { space_id: string };
};

const getNotesBySpaceId = async (spaceId: string) => {
    return {
        id: spaceId,
        title: "My Workspace",
        notes: [
            {
                id: "a8cs4sdf-b2c3-432a-a398-5759e7cd3526",
                title: "Meeting Notes",
                note: "Discussed project roadmap and feature priorities for next sprint.",
            },
            {
                id: "469f18d0-a58c-4145-9faa-6e25904004d5",
                title: "Shopping List",
                note: "Milk, eggs, bread, coffee beans, almond butter, and paper towels.",
            },
            {
                id: "c4eaf6b1-59e0-4f2d-9d12-b06b5d7a4b19",
                title: "Ideas for Blog",
                note: "Write about React performance optimization and Tailwind best practices.",
            },
            {
                id: "e9d3f19c-7bc2-49a2-9b77-60af3c2fda4e",
                title: "Books to Read",
                note: "Clean Code, Atomic Habits, The Pragmatic Programmer, Deep Work.",
            },
            {
                id: "f7b1e52c-91a2-45f9-8d9c-342e8e0de44c",
                title: "Travel Plan",
                note: "Visit Goa in December — book stay near Baga Beach and rent scooters.",
            },
        ],
    };
};

export default async function SpacePage({ params }: SpacePageProps) {
    const { space_id } = params;
    const space = await getNotesBySpaceId(space_id);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">Space: {space.title || space.id}</h1>
            <p className="text-sm text-muted-foreground mb-6">Showing {space.notes.length} notes</p>

            <ul className="space-y-3">
                {space.notes.map((note) => (
                    <li
                        key={note.id}
                        className="border border-border rounded-xl shadow-sm hover:shadow-md transition flex items-center justify-between"
                    >
                        <div className="flex-1 p-4">
                            <h2 className="font-semibold text-lg leading-tight">{note.title}</h2>
                            <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{note.note}</p>
                        </div>

                        <Button variant="ghost" size="icon" className="m-2">
                            <EllipsisVertical className="w-5 h-5" />
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
