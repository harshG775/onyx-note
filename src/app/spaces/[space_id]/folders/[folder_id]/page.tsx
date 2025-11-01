import { Button } from "@/components/ui/button";
import { EllipsisVertical, FileText } from "lucide-react";
import Link from "next/link";

const getFolderById = async (spaceId: string) => {
    return {
        id: spaceId,
        title: "My Workspace",
        notes: [
            { id: "a8cs4sdf-b2c3-432a-a398-5759e7cd3526", title: "Meeting Notes" },
            { id: "469f18d0-a58c-4145-9faa-6e25904004d5", title: "Shopping List" },
            { id: "c4eaf6b1-59e0-4f2d-9d12-b06b5d7a4b19", title: "Ideas for Blog" },
            { id: "e9d3f19c-7bc2-49a2-9b77-60af3c2fda4e", title: "Books to Read" },
            { id: "f7b1e52c-91a2-45f9-8d9c-342e8e0de44c", title: "Travel Plan" },
        ],
    };
};

type SpacePageProps = {
    params: Promise<{ space_id: string; folder_id: string }>;
};

export default async function FolderPage({ params }: SpacePageProps) {
    const { space_id, folder_id } = await params;
    const folder = await getFolderById(folder_id);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-1">folder: {folder.title}</h1>
                <p className="text-sm text-muted-foreground">Showing {folder.notes.length} notes</p>
            </div>

            <ul className="space-y-2">
                {folder.notes.map((note) => (
                    <li
                        key={note.id}
                        className="bg-card border rounded-lg flex items-center justify-between p-3 hover:shadow-sm transition-shadow"
                    >
                        <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-muted-foreground" />
                            <Link
                                href={`/spaces/${space_id}/folders/${folder.id}/notes/${note.id}`}
                                className="font-medium text-lg hover:underline leading-tight"
                            >
                                {note.title}
                            </Link>
                        </div>

                        <Button variant="ghost" size="icon" className="rounded-sm w-8 h-8">
                            <EllipsisVertical className="w-5 h-5" />
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
