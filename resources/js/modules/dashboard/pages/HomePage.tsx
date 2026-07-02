import { Layers } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

export default function HomePage() {
    return (
        <div className="bg-background flex min-h-screen flex-col">
            {/* Top decorative bar */}
            <div className="bg-primary h-1 w-full" />

            {/* Main content */}
            <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
                {/* Logo */}
                <div className="bg-primary/10 mb-8 flex h-20 w-20 items-center justify-center rounded-2xl">
                    <Layers className="text-primary h-10 w-10" strokeWidth={1.5} />
                </div>

                {/* Heading */}
                <h1 className="text-foreground mb-3 text-4xl font-bold tracking-tight">
                    Hybrid App
                </h1>

                {/* Tagline */}
                <p className="text-muted-foreground mb-12 max-w-sm text-base leading-relaxed">
                    A modern, cross-platform application built for web, mobile, and everything in between.
                </p>

                {/* Actions */}
                <div className="flex w-full max-w-xs flex-col gap-3">
                    <Button size="lg" className="w-full">
                        Get Started
                    </Button>

                    <Button size="lg" variant="outline" className="w-full">
                        Sign In
                    </Button>
                </div>
            </div>

            {/* Footer */}
            <footer className="py-6 text-center">
                <p className="text-muted-foreground text-xs">
                    &copy; {new Date().getFullYear()} Hybrid App. All rights reserved.
                </p>
            </footer>
        </div>
    );
}
