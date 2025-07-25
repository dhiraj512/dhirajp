import Link from "next/link";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Page Not Found',
}

export default function NotFound() {
    return (
        <div className="container flex flex-col items-center justify-center min-h-[70vh] py-12 text-center">
            <div className="mb-6 rounded-full bg-muted p-6">
                <Search className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="mb-4 text-4xl font-bold">
                Page Not Found
            </h1>
            <p className="text-center text-muted-foreground mb-8 max-w-md">
                We couldn&apos;t find the page you&apos;re looking for. It might have been moved, renamed, or doesn&apos;t exist.
            </p>
            <Button asChild>
                <Link href="/" className="text-white">
                    <Home className="h-4 w-4 mt-0.5" />
                    <span>Return Home</span>
                </Link>
            </Button>
        </div>
    );
}