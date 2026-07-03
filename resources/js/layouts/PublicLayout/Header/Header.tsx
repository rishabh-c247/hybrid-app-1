import { Link } from 'react-router-dom';
import LanguageSwitcher from '@/shared/components/LanguageSwitcher/LanguageSwitcher';
import Logo from '@/shared/components/Logo/Logo';
import { useScroll } from '@/shared/hooks/use-scroll';
import { cn } from '@/shared/utils/utils';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';
import ThemeSwitcher from './ThemeSwitcher';
import UserMenu from './UserMenu';

export default function Header() {
    const scrolled = useScroll();

    return (
        <header
            className={cn(
                'sticky top-0 z-40 w-full transition-all duration-300',
                scrolled
                    ? 'border-b border-border/60 bg-white shadow-sm dark:bg-card'
                    : 'border-b border-border/60 bg-white dark:bg-card',
            )}
        >
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-8">
                    <Link
                        to="/"
                        className="rounded-[10px] transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        aria-label="Home"
                    >
                        <Logo />
                    </Link>
                    <DesktopNavigation />
                </div>

                <div className="flex items-center gap-1 sm:gap-2">
                    <div className="hidden items-center gap-1 md:flex">
                        <LanguageSwitcher />
                        <ThemeSwitcher />
                    </div>
                    <div className="hidden sm:block">
                        <UserMenu />
                    </div>
                    <MobileNavigation />
                </div>
            </div>
        </header>
    );
}
