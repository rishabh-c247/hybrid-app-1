import { Layers } from 'lucide-react';

export default function HomePage() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <div className="h-1 w-full bg-primary" />

            <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
                <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
                    <Layers className="h-10 w-10 text-primary" strokeWidth={1.5} />
                </div>

                <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground">
                    Hybrid App
                </h1>

                <p className="mb-12 max-w-sm text-base leading-relaxed text-muted-foreground">
                    A modern, cross-platform application built for web, mobile, and everything in
                    between.
                </p>

                <div className="flex w-full max-w-xs flex-col gap-3">
                    <button
                        type="button"
                        className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                        Get Started
                    </button>

                    <button
                        type="button"
                        className="inline-flex h-10 w-full items-center justify-center rounded-md border border-border bg-background px-6 text-sm font-medium text-foreground shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                        Sign In
                    </button>
                </div>
            </div>

            <footer className="py-6 text-center">
                <p className="text-xs text-muted-foreground">
                    &copy; {new Date().getFullYear()} Hybrid App. All rights reserved.
                </p>
            </footer>
        </div>
    );
}
