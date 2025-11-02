import { NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { space } from "@/db/drizzle/schemas";
import { db } from "@/db/drizzle";

// ---------- GET BY ID ----------
export async function GET(req: Request, context: { params: Promise<{ spaceId: string }> }) {
    try {
        const { spaceId } = await context.params;

        const session = await auth.api.getSession(req);
        const user = session?.user;
        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const [result] = await db
            .select()
            .from(space)
            .where(and(eq(space.id, spaceId), eq(space.userId, user.id)));

        if (!result) return NextResponse.json({ message: "Space not found" }, { status: 404 });

        return NextResponse.json({ success: true, data: result });
    } catch (error) {
        console.error("Error fetching space:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

// ---------- UPDATE BY ID ----------
export async function PATCH(req: Request, context: { params: Promise<{ spaceId: string }> }) {
    try {
        const { spaceId } = await context.params;

        const session = await auth.api.getSession(req);
        const user = session?.user;
        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const { title } = await req.json();
        if (!title) return NextResponse.json({ message: "Missing title" }, { status: 400 });

        const [updated] = await db
            .update(space)
            .set({ title })
            .where(and(eq(space.id, spaceId), eq(space.userId, user.id)))
            .returning();

        if (!updated) return NextResponse.json({ message: "Space not found" }, { status: 404 });

        return NextResponse.json({ success: true, data: updated });
    } catch (error) {
        console.error("Error updating space:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

// ---------- DELETE BY ID ----------
export async function DELETE(req: Request, context: { params: Promise<{ spaceId: string }> }) {
    try {
        const { spaceId } = await context.params;

        const session = await auth.api.getSession(req);
        const user = session?.user;
        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const [deleted] = await db
            .delete(space)
            .where(and(eq(space.id, spaceId), eq(space.userId, user.id)))
            .returning();

        if (!deleted) return NextResponse.json({ message: "Space not found" }, { status: 404 });

        return NextResponse.json({ success: true, message: "Space deleted" });
    } catch (error) {
        console.error("Error deleting space:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
