import { Layers } from 'lucide-react';
import PublicLayout from '@/layouts/PublicLayout/PublicLayout';
import { Button } from '@/shared/components/ui/button';

export default function HomePage() {
    return (
        <PublicLayout>
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
                    <Button size="lg" className="h-10 w-full rounded-[10px]">
                        Get Started
                    </Button>

                    <Button variant="outline" size="lg" className="h-10 w-full rounded-[10px]">
                        Sign In
                    </Button>
                </div>
            </div>
        </PublicLayout>
    );
}
