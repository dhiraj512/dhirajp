'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
            document.title = 'An Error Occurred'
    }, [error]);

    return (
        <div className="container flex flex-col items-center justify-center min-h-[70vh] py-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
            <Button onClick={reset}>Try again</Button>
        </div>
    );
}