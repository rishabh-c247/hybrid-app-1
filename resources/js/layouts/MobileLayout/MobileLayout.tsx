import type { ReactNode } from 'react';

export interface MobileLayoutProps {
    children: ReactNode;
}

/**
 * Shell for native mobile screens (login, dashboard, settings, etc.).
 * Safe-area insets are applied on the document body for Capacitor platforms.
 */
export default function MobileLayout({ children }: MobileLayoutProps) {
    return (
        <div className="flex min-h-full flex-col bg-background">
            <main className="flex flex-1 flex-col">{children}</main>
        </div>
    );
}
