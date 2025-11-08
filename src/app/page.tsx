import { headers } from "next/headers";
import Link from "next/link";

import { auth } from "@/lib/auth";
import { signOutAction } from "./actions/auth-action";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default async function HomePage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (session) {
        redirect("/spaces");
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen ">
            <div className="bg-muted/40 p-3 rounded-sm flex flex-col items-center justify-center gap-4">
                <h1 className="text-4xl font-bold">Onyx AI</h1>
                <p className="text-lg text-muted-foreground text-center text-pretty max-w-lg">
                    Experience the future of AI-driven solutions. Create, chat, and collaborate with intelligent at your
                    fingertips.
                </p>
                <div className="flex gap-4 mt-10">
                    <Button asChild variant={"default"}>
                        <Link href="/signup">Sign Up</Link>
                    </Button>
                    <Button asChild variant={"outline"}>
                        <Link href="/signin">Sign In</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
