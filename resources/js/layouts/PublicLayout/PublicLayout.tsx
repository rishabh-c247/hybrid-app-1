import type { ReactNode } from 'react';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import PromoBar from './PromoBar';

export interface PublicLayoutProps {
    children: ReactNode;
    disablePromoBar?: boolean;
    disableHeader?: boolean;
    disableFooter?: boolean;
}

export default function PublicLayout({
    children,
    disablePromoBar = false,
    disableHeader = false,
    disableFooter = false,
}: PublicLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            {!disablePromoBar && <PromoBar />}
            {!disableHeader && <Header />}
            <main className="flex-1">{children}</main>
            {!disableFooter && <Footer />}
        </div>
    );
}
