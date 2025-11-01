"use client";
import { signInAction } from "@/app/actions/auth-action";
import { APIError } from "better-auth";
import { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function SignInPage() {
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();
    async function handleSubmit(formData: FormData) {
        setError(null);
        startTransition(async () => {
            try {
                await signInAction(formData);
            } catch (err) {
                const error = err as APIError;
                setError(error?.message || "Unexpected error occurred");
            }
        });
    }

    return (
        <div className="flex items-center justify-center min-h-dvh px-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold text-muted-foreground">
                        Sign Into your account
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={handleSubmit} className="flex flex-col gap-4">
                        <Input type="email" name="email" placeholder="Email" required />
                        <Input type="password" name="password" placeholder="Password" required />
                        {error && <p className="text-sm text-red-500 text-center mt-1">{error}</p>}
                        <Button type="submit" disabled={isPending} className="w-full font-medium">
                            {isPending ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                    Signing In...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>{" "}
                    </form>
                    <p className="text-center text-sm text-gray-500 mt-4">
                        Don't have an account?{" "}
                        <Link href="/signup" className="text-blue-600 hover:underline">
                            Register
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
