import { db } from "@/db/drizzle";
import { space } from "@/db/drizzle/schemas";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// ---------- CREATE ----------
export async function POST(req: Request) {
    try {
        const session = await auth.api.getSession(req);
        const user = session?.user;

        if (!user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { title } = await req.json();
        if (!title) {
            return NextResponse.json({ success: false, message: "Missing title" }, { status: 400 });
        }

        const [newSpace] = await db
            .insert(space)
            .values({
                title,
                userId: user.id, // 👈 use user.id from BetterAuth session
            })
            .returning();

        return NextResponse.json({ success: true, data: newSpace }, { status: 201 });
    } catch (error) {
        console.error("Error creating space:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

// ---------- GET ALL ----------
export async function GET(req: Request) {
    try {
        const session = await auth.api.getSession(req);
        const user = session?.user;

        if (!user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const spaces = await db.select().from(space).where(eq(space.userId, user.id));

        return NextResponse.json({ success: true, data: spaces });
    } catch (error) {
        console.error("Error fetching spaces:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
