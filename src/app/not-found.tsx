import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
    return (
        <div className="flex min-h-96 flex-col items-center justify-center bg-background px-4">
            <Card className="w-full max-w-md border-none">
                <CardContent className="flex flex-col items-center gap-4 py-10">
                    <h1 className="text-5xl font-bold text-foreground">404</h1>
                    <p className="text-muted-foreground">Oops! The page you’re looking for doesn’t exist.</p>

                    <Button asChild variant="default" className="mt-4">
                        <Link href="/">Go Home</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
