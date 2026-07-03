import { LogoMark } from '@/shared/components/Logo/Logo';
import { APP_DESCRIPTION, APP_NAME } from '@/shared/constants/app';
import MobileLayout from '@/layouts/MobileLayout/MobileLayout';

export default function MobileEntryPage() {
    return (
        <MobileLayout>
            <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
                <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
                    <LogoMark className="size-12" />
                </div>

                <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    {APP_NAME}
                </h1>

                <p className="mb-10 max-w-xs text-base leading-relaxed text-muted-foreground">
                    {APP_DESCRIPTION}
                </p>

                <p className="text-sm font-medium tracking-wide text-muted-foreground/80 uppercase">
                    Mobile Application
                </p>
            </div>
        </MobileLayout>
    );
}
