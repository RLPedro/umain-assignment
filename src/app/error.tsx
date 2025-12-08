'use client';

import Image from 'next/image';

export default function Error({
    error,
}: {
    error: Error & { digest?: string };
}) {

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-[var(--color-background)]">
            <div className="w-[167.17px] h-6 relative mb-8">
                <Image
                    src="/munchies-logo.svg"
                    alt="munchies."
                    fill
                    className="object-contain"
                    priority
                />
            </div>

            <div className="text-center max-w-sm">
                <h2 className="text-2xl font-semibold mb-4 text-[var(--color-foreground)]">
                    Something went wrong!
                </h2>
                <p className="text-[var(--color-text-muted)] mb-8">
                    {error.message}
                </p>

                <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 rounded-[8px] bg-[var(--color-brand)] text-white font-medium hover:bg-[var(--color-brand-hover)] transition-colors"
                >
                    Try again
                </button>
                {error.digest && (
                    <p className="mt-8 text-xs text-gray-400 font-mono">
                        Error ID: {error.digest}
                    </p>
                )}
            </div>
        </div>
    );
}
