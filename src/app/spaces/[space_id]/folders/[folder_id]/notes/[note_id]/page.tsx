import { Button } from "@/components/ui/button";

const getNoteById = async (note_id: string) => {
    return {
        id: note_id,
        title: "Meeting Notes",
        content:
            "# Project Discussion\n\nDiscussed **project roadmap** and feature priorities for next sprint.\n\n## Action Items\n- [ ] Create project timeline\n- [ ] Review design specs\n- [ ] Schedule team meeting",
        content_type: "markdown",
        space_id: "space-1",
        created_at: new Date(),
        updated_at: new Date(),
        tags: ["meeting", "work", "urgent"],
        is_pinned: false,
        is_archived: false,
    };
};
type SpacePageProps = {
    params: Promise<{ note_id: string }>;
};
export default async function NotePage({ params }: SpacePageProps) {
    const { note_id } = await params;
    const note = await getNoteById(note_id);
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-2">Note: {note.title || note.id}</h1>
            <div className="text-sm text-muted-foreground mb-6">Space: {note.title}</div>
            <textarea
                className="border border-border rounded-xl shadow-sm hover:shadow-md p-4 min-h-96 w-full"
                defaultValue={note?.content}
            />
            <Button size={"lg"}>Save</Button>
        </div>
    );
}
